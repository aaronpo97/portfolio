import useGameBoard from '../hooks/useGameBoard';
import useLeaderboard from '../hooks/useLeaderBoard';

const GameActions = ({
  setDisabled,
  shuffleCards,
  disabled,
  mutateLeaderboard,
  gameOver,
  leaderboardRef,
  instructionsRef,
}: {
  setDisabled: ReturnType<typeof useGameBoard>['functions']['setDisabled'];
  shuffleCards: ReturnType<typeof useGameBoard>['functions']['shuffleCards'];
  mutateLeaderboard: ReturnType<typeof useLeaderboard>['mutate'];
  disabled: ReturnType<typeof useGameBoard>['gameState']['disabled'];
  gameOver: ReturnType<typeof useGameBoard>['gameState']['gameOver'];
  leaderboardRef: ReturnType<typeof useGameBoard>['dialogRefs']['leaderboardRef'];
  instructionsRef: ReturnType<typeof useGameBoard>['dialogRefs']['instructionsRef'];
}) => {
  return (
    <div className="my-11 h-10 space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <button
          className="btn btn-primary btn-sm uppercase"
          disabled={disabled}
          onClick={() => {
            setDisabled(true);
            leaderboardRef.current?.showModal();
            mutateLeaderboard();
          }}
        >
          Leaderboard
        </button>
        <button
          className="btn btn-primary btn-sm uppercase"
          onClick={() => {
            setDisabled(true);
            instructionsRef.current!.showModal();
          }}
          disabled={disabled}
        >
          Instructions
        </button>
      </div>

      <div className="grid grid-cols-1">
        {!gameOver && (
          <button
            disabled={disabled}
            onClick={() => {
              shuffleCards();
            }}
            className="btn btn-primary btn-sm uppercase"
          >
            Restart
          </button>
        )}
      </div>
    </div>
  );
};

export default GameActions;
