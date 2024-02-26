import { FC, useEffect, useMemo, useRef } from 'react';
import {
  Clock,
  Mesh,
  MeshNormalMaterial,
  PerspectiveCamera,
  Scene,
  TorusGeometry,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
  createReplicatedGroup,
  calculateChildPositions,
  calculateChildRotation,
  MAX_DISTANCE,
} from './util';

const Donuts: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const SIZES = useMemo(() => {
    if (typeof window === 'undefined') {
      return { width: 0, height: 0 };
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
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
    const camera = new PerspectiveCamera(
      CAMERA_SETTINGS.fov,
      CAMERA_SETTINGS.aspect,
      CAMERA_SETTINGS.near,
      CAMERA_SETTINGS.far,
    );
    camera.position.set(0, 0, 2);

    const scene = new Scene();

    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const renderer = new WebGLRenderer({ canvas });

    renderer.setSize(SIZES.width, SIZES.height);

    const onResize = (): void => {
      SIZES.width = window.innerWidth;
      SIZES.height = window.innerHeight;

      camera.aspect = SIZES.width / SIZES.height;
      camera.updateProjectionMatrix();

      renderer.setSize(SIZES.width, SIZES.height);
    };

    window.addEventListener('resize', onResize);

    const clock = new Clock();
    const controls = new OrbitControls(camera, canvas);
    const torusGeometry = new TorusGeometry(1, 0.7, 40);
    const torusMaterial = new MeshNormalMaterial({});
    const torus = new Mesh(torusGeometry, torusMaterial);
    const torusGroup = createReplicatedGroup(torus, 600);

    scene.add(torusGroup);
    controls.maxDistance = MAX_DISTANCE;

    function animate() {
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

      requestAnimationFrame(animate);
    }
    animate();

    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [CAMERA_SETTINGS, SIZES]);

  return (
    <canvas ref={canvasRef} className="h-full w-full">
      Your browser does not support the canvas element.
    </canvas>
  );
};

export default Donuts;
