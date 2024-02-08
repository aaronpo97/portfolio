import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import {
  Clock,
  Group,
  LoadingManager,
  NearestFilter,
  Object3D,
  PerspectiveCamera,
  Scene,
  TextureLoader,
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

  const BASE_ROTATION_SPEED = 0.2;

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

    const loadingManager = new LoadingManager();
    const textureLoader = new TextureLoader(loadingManager);

    const diamondTexture = textureLoader.load('/textures/diamond.png');
    const emeraldTexture = textureLoader.load('/textures/emerald.png');
    const goldTexture = textureLoader.load('/textures/gold.png');
    const ironTexture = textureLoader.load('/textures/iron.png');
    const lapisTexture = textureLoader.load('/textures/lapis.png');
    const redstoneTexture = textureLoader.load('/textures/redstone.png');
    const coalTexture = textureLoader.load('/textures/coal.png');
    const copperTexture = textureLoader.load('/textures/copper.png');

    copperTexture.magFilter = NearestFilter;
    lapisTexture.magFilter = NearestFilter;
    redstoneTexture.magFilter = NearestFilter;
    coalTexture.magFilter = NearestFilter;
    diamondTexture.magFilter = NearestFilter;
    emeraldTexture.magFilter = NearestFilter;
    goldTexture.magFilter = NearestFilter;
    ironTexture.magFilter = NearestFilter;

    const copperMesh = createBlockMesh(copperTexture);
    const coalMesh = createBlockMesh(coalTexture);
    const ironMesh = createBlockMesh(ironTexture);
    const goldMesh = createBlockMesh(goldTexture);
    const emeraldMesh = createBlockMesh(emeraldTexture);
    const diamondMesh = createBlockMesh(diamondTexture);
    const lapisMesh = createBlockMesh(lapisTexture);
    const redstoneMesh = createBlockMesh(redstoneTexture);

    const primaryGroup = new Group()
      .add(diamondMesh)
      .add(emeraldMesh)
      .add(goldMesh)
      .add(ironMesh)
      .add(lapisMesh)
      .add(redstoneMesh)
      .add(coalMesh)
      .add(copperMesh);

    const secondaryGroup = createReplicatedGroup(primaryGroup, 10);
    const tertiaryGroup = createReplicatedGroup(secondaryGroup, 10);

    const PRIMARY_GROUP_RADIUS = 50;
    const SECONDARY_GROUP_RADIUS = 200;
    const TERTIARY_GROUP_RADIUS = 1000;

    const TERTIARY_Y_FACTOR = 100;
    const SECONDARY_Y_FACTOR = 200;
    const PRIMARY_Y_FACTOR = 100;

    const TERTIARY_GROUP_ANGLE_INCREMENT = (2 * Math.PI) / tertiaryGroup.children.length;
    const SECONDARY_GROUP_ANGLE_INCREMENT =
      (2 * Math.PI) / secondaryGroup.children.length;
    const PRIMARY_GROUP_ANGLE_INCREMENT = (2 * Math.PI) / primaryGroup.children.length;

    type UpdateGroupChildrenArgs = {
      child: Object3D;
      index: number;
      rotationSpeed: number;
      reverse?: boolean;
    };

    const updatePrimaryGroupChildren = ({
      child,
      index,
      rotationSpeed,
      reverse = false,
    }: UpdateGroupChildrenArgs) => {
      const elapsedTime = clock.getElapsedTime();
      const angleIncrement = index * PRIMARY_GROUP_ANGLE_INCREMENT;
      const PRIMARY_ROTATION_SPEED = rotationSpeed * 1.5;

      const { x, y, z } = calculatePositions({
        angleIncrement,
        elapsedTime,
        index,
        reverse,
        radius: PRIMARY_GROUP_RADIUS,
        rotationSpeed: PRIMARY_ROTATION_SPEED,
        yFactor: PRIMARY_Y_FACTOR,
      });

      child.position.set(x, y, z);
    };

    const updateSecondaryGroupChildren = ({
      child,
      index,
      rotationSpeed,
      reverse = false,
    }: UpdateGroupChildrenArgs) => {
      const elapsedTime = clock.getElapsedTime();

      const angleIncrement = index * SECONDARY_GROUP_ANGLE_INCREMENT;

      const SECONDARY_ROTATION_SPEED = rotationSpeed * 1.2;

      const { x, y, z } = calculatePositions({
        angleIncrement,
        elapsedTime,
        reverse,
        index,
        radius: SECONDARY_GROUP_RADIUS,
        rotationSpeed: SECONDARY_ROTATION_SPEED,
        yFactor: SECONDARY_Y_FACTOR,
      });

      child.position.set(x, y, z);

      child.children.forEach((c, i) =>
        updatePrimaryGroupChildren({
          child: c,
          index: i,
          reverse,
          rotationSpeed,
        }),
      );
    };

    const updateTertiaryGroupChildren = ({
      child,
      index,
      rotationSpeed,
      reverse = false,
    }: UpdateGroupChildrenArgs) => {
      const elapsedTime = clock.getElapsedTime();
      const angleIncrement = index * TERTIARY_GROUP_ANGLE_INCREMENT;

      const TERTIARY_ROTATION_SPEED = rotationSpeed;

      const { x, y, z } = calculatePositions({
        angleIncrement,
        elapsedTime,
        reverse,
        index,
        radius: TERTIARY_GROUP_RADIUS,
        rotationSpeed: TERTIARY_ROTATION_SPEED,
        yFactor: TERTIARY_Y_FACTOR,
      });

      child.position.set(x, y, z);
      child.children.forEach((c, i) =>
        updateSecondaryGroupChildren({
          child: c,
          index: i,
          reverse,
          rotationSpeed,
        }),
      );
    };

    const main = new Group().add(tertiaryGroup);

    const animate = () => {
      main.children.forEach((group, i) => {
        group.children.forEach((child, index) => {
          const reverse = i % 2 === 0;
          updateTertiaryGroupChildren({
            child,
            rotationSpeed: BASE_ROTATION_SPEED,
            reverse,
            index,
          });
        });
      });
      renderer.render(scene, camera);
      controls.update();

      window.requestAnimationFrame(animate);
    };

    scene.add(main);
    animate();

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [SIZES, CAMERA_SETTINGS, BASE_ROTATION_SPEED]);

  return <canvas ref={canvasRef}></canvas>;
};

export default Rotacube;
