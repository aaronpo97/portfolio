import useRotacube from './hooks/useRotacube';

const Rotacube = () => {
  const { canvasRef } = useRotacube();

  return <canvas ref={canvasRef} />;
};

export default Rotacube;
