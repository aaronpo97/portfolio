import { Vector3, Euler, Object3D, Group } from 'three';

export const MAX_DISTANCE = 50;
const ROTATION_SPEED = 0.0005;
const MOVEMENT_SPEED = 0.0005;

interface CalculateChildPositionArgs {
  position: Vector3;
  index: number;
  elapsedTime: number;
}

interface CalculateChildCoordinateArgs {
  elapsedTime: number;
  index: number;
}

const calculateChildPosition = ({ elapsedTime, index }: CalculateChildCoordinateArgs) =>
  index % 2 === 0
    ? Math.cos(elapsedTime) * MOVEMENT_SPEED
    : Math.sin(elapsedTime) * MOVEMENT_SPEED;

export const calculateChildPositions = ({
  position,
  index,
  elapsedTime,
}: CalculateChildPositionArgs) => {
  return {
    x: position.x + calculateChildPosition({ index, elapsedTime }),
    y: position.y + calculateChildPosition({ index, elapsedTime }),
    z: position.z + calculateChildPosition({ index, elapsedTime }),
  };
};
export const calculateChildRotation = (rotation: Euler) => {
  return {
    x: rotation.x + ROTATION_SPEED,
    y: rotation.y + ROTATION_SPEED,
    z: rotation.z + ROTATION_SPEED,
  };
};

export const calculateRandomCoordinates = (factor: number) => {
  return {
    x: Math.random() * factor - factor / 2,
    y: Math.random() * factor - factor / 2,
    z: Math.random() * factor - factor / 2,
  };
};

export const setInitialChildPosition = (child: Object3D) => {
  const factor = MAX_DISTANCE * 1.5;
  const position = calculateRandomCoordinates(factor);
  const rotation = calculateRandomCoordinates(factor);

  child.position.set(position.x, position.y, position.z);
  child.rotation.set(rotation.x, rotation.y, rotation.z);
};

export const createReplicatedGroup = (object: Object3D, replications: number): Group => {
  const clonedGroup = new Group();
  for (let i = 0; i < replications; i += 1) {
    clonedGroup.add(object.clone());
  }

  clonedGroup.children.forEach(setInitialChildPosition);
  return clonedGroup;
};
