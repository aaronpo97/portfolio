type CalculatePositionsArgs = {
  elapsedTime: number;
  radius: number;
  rotationSpeed: number;
  reverse: boolean;
  angleIncrement: number;
  yFactor: number;
  index: number;
};

/**
 * Calculates positions along a circle in 3D space using the provided arguments.
 *
 * @example
 *   const { x, y, z } = calculatePositions({
 *     angleIncrement,
 *     elapsedTime,
 *     index,
 *     reverse,
 *     radius: PRIMARY_GROUP_RADIUS,
 *     rotationSpeed: PRIMARY_ROTATION_SPEED,
 *     yFactor: PRIMARY_Y_FACTOR,
 *   });
 *
 * @param args - The arguments to be used in the calculation.
 * @param args.elapsedTime - The time elapsed since the start of the animation.
 * @param args.rotationSpeed - The speed at which the object should rotate.
 * @param args.reverse - Whether or not the object should rotate in reverse.
 * @param args.angleIncrement - The angle increment to be used in the
 *   calculation.
 * @param args.radius - The radius of the circle.
 * @param args.yFactor - The y factor to be used in the calculation.
 * @param args.index - The index of the object.
 * @returns The calculated positions.
 */
const calculatePositions = ({
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

export default calculatePositions;
