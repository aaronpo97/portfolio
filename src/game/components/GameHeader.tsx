import useGameBoard from '../hooks/useGameBoard';

const GameHeader = ({
  turns,
}: {
  turns: ReturnType<typeof useGameBoard>['gameState']['turns'];
}) => {
  return (
    <div className="flex flex-col items-center space-y-3 md:space-y-4 lg:space-y-5">
      <h1 className="text-3xl font-bold md:text-5xl lg:text-7xl">Fruit Memory Match</h1>
      <h2 className="text-xl font-bold md:text-3xl lg:text-4xl">Turns: {turns}</h2>
    </div>
  );
};

export default GameHeader;
