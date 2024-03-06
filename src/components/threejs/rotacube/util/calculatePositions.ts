import { Clock, Object3D } from 'three';

type CalculatePositionsArgs = {
  elapsedTime: number;
  radius: number;
  rotationSpeed: number;
  reverse: boolean;
  angleIncrement: number;
  yFactor: number;
  index: number;
};

export const calculatePositionsOnCircle = ({
  elapsedTime,
  radius,
  rotationSpeed,
  reverse,
  angleIncrement,
  yFactor,
  index,
}: CalculatePositionsArgs) => {
  const x = reverse
    ? radius * Math.cos(angleIncrement + elapsedTime * rotationSpeed)
    : radius * Math.sin(angleIncrement + elapsedTime * rotationSpeed);

  const y =
    index % 2
      ? Math.sin(elapsedTime * rotationSpeed) * yFactor
      : Math.cos(elapsedTime * rotationSpeed) * yFactor;

  const z = reverse
    ? radius * Math.sin(angleIncrement + elapsedTime * rotationSpeed)
    : radius * Math.cos(angleIncrement + elapsedTime * rotationSpeed);

  return { x, y: !reverse ? y : y * -1, z };
};

type UpdateGroupChildrenArgs = {
  child: Object3D;
  index: number;
  reverse?: boolean;
  params: any;
  clock: Clock;
};

export const updatePrimaryGroupChildren = ({
  child,
  index,
  reverse = false,
  params,
  clock,
}: UpdateGroupChildrenArgs) => {
  const elapsedTime = clock.getElapsedTime();
  const angleIncrement = index * params.angleIncrements.primary;

  const { radius, rotationSpeed, yFactor } = {
    radius: params.groupRadii.primary,
    rotationSpeed: params.rotationSpeeds.primary,
    yFactor: params.yFactors.primary,
  };

  const { x, y, z } = calculatePositionsOnCircle({
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

export const updateSecondaryGroupChildren = ({
  child,
  index,
  reverse = false,
  params,
  clock,
}: UpdateGroupChildrenArgs) => {
  const elapsedTime = clock.getElapsedTime();

  const angleIncrement = index * params.angleIncrements.secondary;

  const { radius, rotationSpeed, yFactor } = {
    radius: params.groupRadii.secondary,
    rotationSpeed: params.rotationSpeeds.secondary,
    yFactor: params.yFactors.secondary,
  };

  const { x, y, z } = calculatePositionsOnCircle({
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
      params,
      clock,
    }),
  );
};

export const updateTertiaryGroupChildren = ({
  child,
  index,
  reverse = false,
  params,
  clock,
}: UpdateGroupChildrenArgs) => {
  const elapsedTime = clock.getElapsedTime();
  const angleIncrement = index * params.angleIncrements.tertiary;

  const { radius, rotationSpeed, yFactor } = {
    radius: params.groupRadii.tertiary,
    rotationSpeed: params.rotationSpeeds.tertiary,
    yFactor: params.yFactors.tertiary,
  };

  const { x, y, z } = calculatePositionsOnCircle({
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
      params,
      clock,
    }),
  );
};
