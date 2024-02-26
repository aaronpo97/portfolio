import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import {
  Clock,
  Group,
  MeshNormalMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import { useEffect, useMemo, useRef } from 'react';

import { createBlockMesh, createReplicatedGroup } from './util/create';
import calculatePositions from './util/calculatePositions';

const Rotacube = () => {
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
    camera.position.set(0, 0, 1000);

    const renderer = new WebGLRenderer({ canvas });

    const onResize = (): void => {
      SIZES.width = window.innerWidth;
      SIZES.height = window.innerHeight;
      camera.aspect = SIZES.width / SIZES.height;
      camera.updateProjectionMatrix();
      renderer.setSize(SIZES.width, SIZES.height);
    };

    const controls = new TrackballControls(camera, canvas);
    const scene = new Scene();
    renderer.setSize(SIZES.width, SIZES.height);

    const clock = new Clock();

    const material = new MeshNormalMaterial();
    const primaryGroup = new Group()
      .add(createBlockMesh(material))
      .add(createBlockMesh(material))
      .add(createBlockMesh(material))
      .add(createBlockMesh(material))
      .add(createBlockMesh(material))
      .add(createBlockMesh(material))
      .add(createBlockMesh(material))
      .add(createBlockMesh(material));

    const secondaryGroup = createReplicatedGroup(primaryGroup, 12);
    const tertiaryGroup = createReplicatedGroup(secondaryGroup, 10);

    const GROUP_RADII = {
      primary: 50,
      secondary: 250,
      tertiary: 1200,
    };

    const ROTATION_SPEEDS = {
      primary: BASE_ROTATION_SPEED * 1.5,
      secondary: BASE_ROTATION_SPEED * 1.2,
      tertiary: BASE_ROTATION_SPEED * 1,
    };

    const Y_FACTORS = {
      primary: 300,
      secondary: 400,
      tertiary: 100,
    };

    const ANGLE_INCREMENTS = {
      primary: (2 * Math.PI) / primaryGroup.children.length,
      secondary: (2 * Math.PI) / secondaryGroup.children.length,
      tertiary: (2 * Math.PI) / tertiaryGroup.children.length,
    };

    type UpdateGroupChildrenArgs = {
      child: Object3D;
      index: number;
      reverse?: boolean;
    };

    const updatePrimaryGroupChildren = ({
      child,
      index,
      reverse = false,
    }: UpdateGroupChildrenArgs) => {
      const elapsedTime = clock.getElapsedTime();
      const angleIncrement = index * ANGLE_INCREMENTS.primary;

      const { radius, rotationSpeed, yFactor } = {
        radius: GROUP_RADII.primary,
        rotationSpeed: ROTATION_SPEEDS.primary,
        yFactor: Y_FACTORS.primary,
      };

      const { x, y, z } = calculatePositions({
        angleIncrement,
        elapsedTime,
        index,
        reverse,
        radius,
        rotationSpeed,
        yFactor,
      });

      child.position.set(x, y, z);
    };

    const updateSecondaryGroupChildren = ({
      child,
      index,
      reverse = false,
    }: UpdateGroupChildrenArgs) => {
      const elapsedTime = clock.getElapsedTime();

      const angleIncrement = index * ANGLE_INCREMENTS.secondary;

      const { radius, rotationSpeed, yFactor } = {
        radius: GROUP_RADII.secondary,
        rotationSpeed: ROTATION_SPEEDS.secondary,
        yFactor: Y_FACTORS.secondary,
      };

      const { x, y, z } = calculatePositions({
        angleIncrement,
        elapsedTime,
        reverse,
        index,
        radius,
        rotationSpeed,
        yFactor,
      });

      child.position.set(x, y, z);

      child.children.forEach((c, i) =>
        updatePrimaryGroupChildren({
          child: c,
          index: i,
          reverse,
        }),
      );
    };

    const updateTertiaryGroupChildren = ({
      child,
      index,
      reverse = false,
    }: UpdateGroupChildrenArgs) => {
      const elapsedTime = clock.getElapsedTime();
      const angleIncrement = index * ANGLE_INCREMENTS.tertiary;

      const { radius, rotationSpeed, yFactor } = {
        radius: GROUP_RADII.tertiary,
        rotationSpeed: ROTATION_SPEEDS.tertiary,
        yFactor: Y_FACTORS.tertiary,
      };

      const { x, y, z } = calculatePositions({
        angleIncrement,
        elapsedTime,
        reverse,
        index,
        radius,
        rotationSpeed,
        yFactor,
      });

      child.position.set(x, y, z);
      child.children.forEach((c, i) =>
        updateSecondaryGroupChildren({
          child: c,
          index: i,
          reverse,
        }),
      );
    };

    const clonedAndRotatedGroups = [
      tertiaryGroup.clone().rotateX(Math.PI / 2),
      tertiaryGroup.clone().rotateY(Math.PI / 2),
      tertiaryGroup.clone().rotateZ(Math.PI / 2),
      // tertiaryGroup.clone().rotateX(Math.PI / 4),
      // tertiaryGroup.clone().rotateX(-(Math.PI / 4)),
      // tertiaryGroup.clone().rotateY(Math.PI / 4),
      // tertiaryGroup.clone().rotateY(-(Math.PI / 4)),
      // tertiaryGroup.clone().rotateZ(Math.PI / 4),
      // tertiaryGroup.clone().rotateZ(-(Math.PI / 4)),
    ];

    const main = new Group();
    clonedAndRotatedGroups.forEach((group) => main.add(group));
    main.translateY(1000).translateZ(1000);

    scene.add(main);

    const animate = () => {
      main.children.forEach((group, i) => {
        group.children.forEach((child, index) => {
          const reverse = i % 2 === 0;
          updateTertiaryGroupChildren({ child, reverse, index });
        });
      });
      renderer.render(scene, camera);
      controls.update();
      window.requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [SIZES, CAMERA_SETTINGS]);

  return <canvas ref={canvasRef} />;
};

export default Rotacube;
