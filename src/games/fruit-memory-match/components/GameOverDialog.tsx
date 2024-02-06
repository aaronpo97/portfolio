import { Dispatch, FC, SetStateAction, useState } from 'react';
import LeaderboardForm from './LeaderboardForm';

const GameOverDialog: FC<{
  gameOverRef: React.RefObject<HTMLDialogElement>;
  turnCount: number;
  shuffleCards: () => void;
  setDisabled: Dispatch<SetStateAction<boolean>>;
}> = ({ gameOverRef, turnCount, shuffleCards, setDisabled }) => {
  const [showForm, setShowForm] = useState(false);
  return (
    <dialog
      ref={gameOverRef}
      className="modal"
      onClose={() => {
        setDisabled(false);
      }}
    >
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl">Game Over!</h2>

        <div className="modal-body">
          <p className="text-lg">You finished the game in {turnCount} turns!</p>
        </div>

        {!showForm ? (
          <div className="modal-action grid grid-cols-2 justify-center gap-1">
            <button
              className="btn btn-primary btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                setShowForm(true);
              }}
            >
              Log Score on Leaderboard
            </button>
            <button
              type="button"
              onClick={() => {
                gameOverRef.current!.close();
                setDisabled(false);
                shuffleCards();
              }}
              className="btn btn-primary btn-sm"
            >
              Close and Play Again
            </button>
          </div>
        ) : (
          <LeaderboardForm
            setShowForm={setShowForm}
            turnCount={turnCount}
            shuffleCards={shuffleCards}
            setDisabled={setDisabled}
            gameOverRef={gameOverRef}
          />
        )}
      </div>
    </dialog>
  );
};

export default GameOverDialog;
