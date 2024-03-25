import { FC } from 'react';
import useGalaxy from './hooks/useGalaxy';

const Galaxy: FC = () => {
  const { canvasRef } = useGalaxy();
  return <canvas ref={canvasRef} />;
};
export default Galaxy;
