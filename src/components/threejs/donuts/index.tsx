import { FC } from 'react';
import useDonuts from './hooks/useDonuts';

const Donuts: FC = () => {
  const { canvasRef } = useDonuts();
  return <canvas ref={canvasRef} className="h-full w-full" />;
};

export default Donuts;
