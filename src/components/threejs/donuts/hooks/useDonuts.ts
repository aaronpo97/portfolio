import { useEffect, useMemo, useRef } from 'react';
import {
  Clock,
  Group,
  Mesh,
  MeshNormalMaterial,
  PerspectiveCamera,
  Scene,
  TorusGeometry,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';

import Stats from 'stats.js';
import {
  createReplicatedGroup,
  calculateChildPositions,
  calculateChildRotation,
  MAX_DISTANCE,
} from '../util';

const useDonuts = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const SIZES = useMemo(() => {
    if (typeof window === 'undefined') {
      return { width: 0, height: 0 };
    }
    return { width: window.innerWidth, height: window.innerHeight };
  }, []);

  const CAMERA_SETTINGS = useMemo(() => {
    return {
      fov: 100,
      aspect: SIZES.width / SIZES.height,
      near: 0.01,
      far: 10500,
    };
  }, [SIZES]);

  useEffect(() => {
    const scene = new Scene();
    const canvas = canvasRef.current!;
    const renderer = new WebGLRenderer({ canvas });
    renderer.setSize(SIZES.width, SIZES.height);

    const camera = new PerspectiveCamera(
      CAMERA_SETTINGS.fov,
      CAMERA_SETTINGS.aspect,
      CAMERA_SETTINGS.near,
      CAMERA_SETTINGS.far,
    );

    camera.position.set(0, 0, 2);

    const gui = new GUI();
    gui.domElement.style.cssText = `width: 20rem;`;

    const donutParams = { count: 600, donutRadius: 1, tubeRadius: 0.5 };

    const clock = new Clock();
    const controls = new OrbitControls(camera, canvas);

    let torusGeometry: TorusGeometry | null = null;
    let torusMaterial: MeshNormalMaterial | null = null;
    let torusGroup: Group | null = null;

    const createDonuts = () => {
      if (torusGroup && torusGeometry && torusMaterial) {
        torusGeometry.dispose();
        torusMaterial.dispose();
        scene.remove(torusGroup);
      }

      torusGeometry = new TorusGeometry(donutParams.donutRadius, donutParams.tubeRadius);
      torusMaterial = new MeshNormalMaterial({});
      const torus = new Mesh(torusGeometry, torusMaterial);
      torusGroup = createReplicatedGroup(torus, donutParams.count);
      scene.add(torusGroup);
    };

    createDonuts();

    controls.maxDistance = MAX_DISTANCE;

    const stats = new Stats();
    stats.showPanel(0);
    stats.dom.style.cssText = `
      position: absolute;
      top: 0;
      right: 21.5em;
    `;
    document.body.appendChild(stats.dom);

    let animationId: number;
    function animate() {
      stats.begin();
      if (!torusGroup || !torusGeometry || !torusMaterial) {
        return;
      }

      torusGroup.children.forEach((child, index) => {
        const elapsedTime = clock.getElapsedTime();
        const position = calculateChildPositions({
          position: child.position,
          index,
          elapsedTime,
        });
        const rotation = calculateChildRotation(child.rotation);

        child.rotation.set(rotation.x, rotation.y, rotation.z);
        child.position.set(position.x, position.y, position.z);
      });

      renderer.render(scene, camera);
      controls.update();

      animationId = requestAnimationFrame(animate);
      stats.end();
    }

    animate();

    const donutsFolder = gui.addFolder('Donuts');
    donutsFolder.close();

    donutsFolder
      .add(donutParams, 'count')
      .min(50)
      .max(1000)
      .step(50)
      .name('Donuts Count')
      .onFinishChange(createDonuts);

    donutsFolder
      .add(donutParams, 'donutRadius')
      .min(0.01)
      .max(1)
      .step(0.01)
      .name('Donut Radius')
      .onFinishChange(createDonuts);

    donutsFolder
      .add(donutParams, 'tubeRadius')
      .min(0.1)
      .max(5)
      .step(0.1)
      .name('Tube Radius')
      .onFinishChange(createDonuts);

    const cameraFolder = gui.addFolder('Camera');
    cameraFolder.close();

    cameraFolder
      .add(camera.position, 'x')
      .min(Math.PI * -4)
      .max(Math.PI * 4)
      .step(0.01)
      .listen()
      .name('Set Camera X');

    cameraFolder
      .add(camera.position, 'y')
      .min(Math.PI * -4)
      .max(Math.PI * 4)
      .step(0.01)
      .listen()
      .name('Set Camera Y');

    cameraFolder
      .add(camera.position, 'z')
      .min(Math.PI * -4)
      .max(Math.PI * 4)
      .step(0.01)
      .listen()
      .name('Set Camera Z');

    cameraFolder
      .add(
        {
          resetCamera() {
            camera.position.x = 3;
            camera.position.y = 3;
            camera.position.z = 3;
            camera.lookAt(0, 0, 0);
          },
        },
        'resetCamera',
      )
      .name('Reset Camera');

    const onResize = (): void => {
      SIZES.width = window.innerWidth;
      SIZES.height = window.innerHeight;

      camera.aspect = SIZES.width / SIZES.height;
      camera.updateProjectionMatrix();

      renderer.setSize(SIZES.width, SIZES.height);
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.cancelAnimationFrame(animationId);
      gui.destroy();
      stats.dom.remove();
    };
  }, [CAMERA_SETTINGS, SIZES]);

  return { canvasRef };
};

export default useDonuts;
