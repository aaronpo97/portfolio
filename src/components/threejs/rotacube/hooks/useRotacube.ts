import { useEffect, useMemo, useRef } from 'react';

import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import {
  Clock,
  Group,
  MeshNormalMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

import GUI from 'lil-gui';
import Stats from 'stats.js';

import { createBlockMesh, createReplicatedGroup } from '../util/create';
import { updateTertiaryGroupChildren } from '../util/calculatePositions';

const useRotacube = () => {
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

  const BASE_ROTATION_SPEED = 0.1;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;

    const camera = new PerspectiveCamera(
      CAMERA_SETTINGS.fov,
      CAMERA_SETTINGS.aspect,
      CAMERA_SETTINGS.near,
      CAMERA_SETTINGS.far,
    );
    camera.position.set(0, 0, 10);

    const controls = new TrackballControls(camera, canvas);

    const renderer = new WebGLRenderer({ canvas });

    const scene = new Scene();
    renderer.setSize(SIZES.width, SIZES.height);

    const material = new MeshNormalMaterial();
    const primaryGroup = new Group()
      .add(createBlockMesh(material))
      .add(createBlockMesh(material))
      .add(createBlockMesh(material))
      .add(createBlockMesh(material))
      .add(createBlockMesh(material))
      .add(createBlockMesh(material));

    const secondaryGroup = createReplicatedGroup(primaryGroup, 12);
    const tertiaryGroup = createReplicatedGroup(secondaryGroup, 10);

    const params = {
      rotationSpeeds: {
        primary: BASE_ROTATION_SPEED * 1.5,
        secondary: BASE_ROTATION_SPEED * 1.2,
        tertiary: BASE_ROTATION_SPEED * 1,
      },
      groupRadii: {
        primary: 50,
        secondary: 250,
        tertiary: 1200,
      },
      yFactors: {
        primary: 300,
        secondary: 400,
        tertiary: 100,
      },
      angleIncrements: {
        primary: (2 * Math.PI) / primaryGroup.children.length,
        secondary: (2 * Math.PI) / secondaryGroup.children.length,
        tertiary: (2 * Math.PI) / tertiaryGroup.children.length,
      },
    };
    const clock = new Clock();

    const clonedAndRotatedGroups = [
      tertiaryGroup.clone().rotateX(Math.PI / 2),
      tertiaryGroup.clone().rotateY(Math.PI / 2),
      tertiaryGroup.clone().rotateZ(Math.PI / 2),
    ];

    const main = new Group();

    clonedAndRotatedGroups.forEach((group) => main.add(group));

    scene.add(main);

    const stats = new Stats();
    stats.showPanel(0);
    stats.dom.style.cssText = `
      position: absolute;
      top: 0;
      right: 21.5em;
    `;
    document.body.appendChild(stats.dom);

    let animationId: number;
    const animate = () => {
      stats.begin();
      main.children.forEach((group, i) => {
        group.children.forEach((child, index) => {
          const reverse = i % 2 === 0;
          updateTertiaryGroupChildren({ child, reverse, index, clock, params });
        });
      });
      renderer.render(scene, camera);
      controls.update();

      animationId = window.requestAnimationFrame(animate);

      stats.end();
    };
    animate();

    /**
     * GUI Controls
     *
     * GUI controls are used to allow the client to adjust various parameters of the
     * scene.
     */
    const gui = new GUI();
    gui.domElement.style.cssText = `width: 20rem;`;

    /** Group Radii */
    const groupRadiiFolder = gui.addFolder('Group Radii');
    groupRadiiFolder
      .add(params.groupRadii, 'primary')
      .name('Primary')
      .min(0)
      .max(1000)
      .step(10)
      .listen();

    groupRadiiFolder
      .add(params.groupRadii, 'secondary')
      .name('Secondary')
      .min(0)
      .max(1000)
      .step(10)
      .listen();

    groupRadiiFolder
      .add(params.groupRadii, 'tertiary')
      .name('Tertiary')
      .min(0)
      .max(1000)
      .step(10)
      .listen();

    groupRadiiFolder
      .add(
        {
          resetRadii() {
            params.groupRadii.primary = 50;
            params.groupRadii.secondary = 250;
            params.groupRadii.tertiary = 1200;
          },
        },
        'resetRadii',
      )
      .name('Reset Radii');

    /** Rotation Speeds */
    const rotationSpeedsFolder = gui.addFolder('Rotation Speeds');
    rotationSpeedsFolder
      .add(params.rotationSpeeds, 'primary')
      .name('Primary')
      .min(0)
      .max(1)
      .step(0.01)
      .listen();

    rotationSpeedsFolder
      .add(params.rotationSpeeds, 'secondary')
      .name('Secondary')
      .min(0)
      .max(1)
      .step(0.01)
      .listen();

    rotationSpeedsFolder
      .add(params.rotationSpeeds, 'tertiary')
      .name('Tertiary')
      .min(0)
      .max(1)
      .step(0.01)
      .listen();

    rotationSpeedsFolder
      .add(
        {
          resetSpeeds() {
            params.rotationSpeeds.primary = BASE_ROTATION_SPEED * 1.5;
            params.rotationSpeeds.secondary = BASE_ROTATION_SPEED * 1.2;
            params.rotationSpeeds.tertiary = BASE_ROTATION_SPEED * 1;
          },
        },
        'resetSpeeds',
      )
      .name('Reset Speeds')
      .listen();

    /** Y Factors */
    const YFactorFolder = gui.addFolder('Y Factors');

    YFactorFolder.add(params.yFactors, 'primary')
      .name('Primary')
      .min(0)
      .max(1000)
      .step(10)
      .listen();

    YFactorFolder.add(params.yFactors, 'secondary')
      .name('Secondary')
      .min(0)
      .max(1000)
      .step(10)
      .listen();

    YFactorFolder.add(params.yFactors, 'tertiary')
      .name('Tertiary')
      .min(0)
      .max(1000)
      .step(10)
      .listen();

    YFactorFolder.add(
      {
        resetYFactors() {
          params.yFactors.primary = 300;
          params.yFactors.secondary = 400;
          params.yFactors.tertiary = 100;
        },
      },
      'resetYFactors',
    ).name('Reset Y Factors');

    /** Camera */
    const cameraSection = gui.addFolder('Camera');

    cameraSection
      .add(camera.position, 'x')
      .name('Camera X')
      .min(-1000)
      .max(1000)
      .step(10)
      .listen();

    cameraSection
      .add(camera.position, 'y')
      .name('Camera Y')
      .min(-1000)
      .max(1000)
      .step(10)
      .listen();

    cameraSection
      .add(camera.position, 'z')
      .name('Camera Z')
      .min(-1000)
      .max(1000)
      .step(10)
      .listen();

    cameraSection
      .add(
        {
          resetCamera() {
            camera.position.set(0, 10, 0);
          },
        },
        'resetCamera',
      )
      .name('Reset Camera');

    // Event Listeners
    const onResize = (): void => {
      SIZES.width = window.innerWidth;
      SIZES.height = window.innerHeight;
      camera.aspect = SIZES.width / SIZES.height;
      camera.updateProjectionMatrix();
      renderer.setSize(SIZES.width, SIZES.height);
    };

    cameraSection.close();
    YFactorFolder.close();
    rotationSpeedsFolder.close();
    groupRadiiFolder.close();

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      stats.dom.remove();
      window.cancelAnimationFrame(animationId);
      gui.destroy();
    };
  }, [SIZES, CAMERA_SETTINGS]);

  return { canvasRef };
};

export default useRotacube;
