import { useState, useEffect, useCallback } from 'react';

const useGameContainer = () => {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  const handleGameSize = useCallback(() => {
    setDimensions({
      height: window.innerHeight * 0.6,
      width: window.innerWidth * 0.6,
    });
  }, []);

  useEffect(() => {
    handleGameSize();
    window.addEventListener('resize', handleGameSize);
    return () => window.removeEventListener('resize', handleGameSize);
  }, [handleGameSize]);

  return { dimensions };
};

const AsteroidsGameContainer = () => {
  const { dimensions } = useGameContainer();
  return (
    <div className="card card-compact bg-base-300">
      <div className="card-body">
        <iframe
          src="https://asteroids-alpha.vercel.app"
          width={dimensions.width}
          height={dimensions.height}
        />
      </div>
    </div>
  );
};

export default AsteroidsGameContainer;
