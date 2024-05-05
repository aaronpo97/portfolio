import { useEffect, useMemo, useRef } from 'react';
import {
  Clock,
  Color,
  Group,
  Material,
  Mesh,
  MeshMatcapMaterial,
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

    scene.background = new Color(0xffffff);
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

    const [color1, color2, color3, color4, color5, color6, color7] = [
      0xff0000, 0xffa500, 0xffff00, 0x008000, 0x0000ff, 0x4b0082, 0x9400d3,
    ] as const;

    const donutParams = {
      countPerGroup: 400,
      donutRadius: 0.5,
      tubeRadius: 0.25,
      groupCount: 7,
      colors: {
        color1,
        color2,
        color3,
        color4,
        color5,
        color6,
        color7,
      },
    };

    const clock = new Clock();
    const controls = new OrbitControls(camera, canvas);

    const donutGroups: {
      geometry: TorusGeometry;
      material: Material;
      group: Group;
    }[] = [];

    const createDonuts = () => {
      if (donutGroups.length) {
        donutGroups.forEach(({ geometry, material, group }) => {
          geometry.dispose();
          material.dispose();
          scene.remove(group);
        });
      }

      for (let i = 0; i < donutParams.groupCount; i += 1) {
        const geometry = new TorusGeometry(
          donutParams.donutRadius,
          donutParams.tubeRadius,
        );

        const colorEntries = Object.entries(donutParams.colors);

        const color = colorEntries[i][1];
        const material = new MeshMatcapMaterial({ color });
        const group = createReplicatedGroup(
          new Mesh(geometry, material),
          donutParams.countPerGroup,
        );
        scene.add(group);

        donutGroups.push({ geometry, material, group });
      }
    };

    createDonuts();

    controls.maxDistance = MAX_DISTANCE;

    /**
     * Stats
     *
     * Displays the frames per second (FPS) and the milliseconds it takes to render each
     * frame using Stats.js.
     */
    const stats = new Stats();
    stats.showPanel(0);
    stats.dom.style.cssText = `
      position: absolute;
      top: 0;
      right: 21.5em;
    `;
    document.body.appendChild(stats.dom);

    /**
     * Animation Loop
     *
     * Sets the position and rotation of each donut group.
     */
    let animationId: number;
    function animate() {
      stats.begin();
      if (donutGroups.length === 0) return;

      donutGroups.forEach(({ group }) => {
        group.children.forEach((child, index) => {
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
      });

      renderer.render(scene, camera);
      controls.update();

      animationId = requestAnimationFrame(animate);
      stats.end();
    }

    animate();

    /**
     * GUI Controls
     *
     * Controls for donuts count, donut radius, tube radius, camera position, and colors.
     */

    const donutsFolder = gui.addFolder('Donuts');
    donutsFolder.close();

    donutsFolder
      .add(donutParams, 'countPerGroup')
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

    const colorFolder = gui.addFolder('Colors');
    colorFolder.close();

    colorFolder
      .addColor(donutParams.colors, 'color1')
      .listen()
      .onFinishChange(createDonuts);

    colorFolder
      .addColor(donutParams.colors, 'color2')
      .listen()
      .onFinishChange(createDonuts);

    colorFolder
      .addColor(donutParams.colors, 'color3')
      .listen()
      .onFinishChange(createDonuts);

    colorFolder
      .addColor(donutParams.colors, 'color4')
      .listen()
      .onFinishChange(createDonuts);

    colorFolder
      .addColor(donutParams.colors, 'color5')
      .listen()
      .onFinishChange(createDonuts);

    colorFolder
      .addColor(donutParams.colors, 'color6')
      .listen()
      .onFinishChange(createDonuts);

    colorFolder
      .addColor(donutParams.colors, 'color7')
      .listen()
      .onFinishChange(createDonuts);

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
