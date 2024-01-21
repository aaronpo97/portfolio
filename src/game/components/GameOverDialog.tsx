import FormSegment from '@/components/ui/FormSegment';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import GameLeaderboardValidationSchema from '@/schema/GameLeaderboardValidationSchema';

const GameOverDialog: FC<{
  gameOverRef: React.RefObject<HTMLDialogElement>;
  turnCount: number;
  shuffleCards: () => void;
  setDisabled: Dispatch<SetStateAction<boolean>>;
}> = ({ gameOverRef, turnCount, shuffleCards, setDisabled }) => {
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, formState, reset, setValue } = useForm<{
    name: string;
    turns: number;
  }>({
    resolver: zodResolver(GameLeaderboardValidationSchema),
  });

  useEffect(() => {
    setValue('turns', turnCount);
  }, [turnCount, setValue]);
  return (
    <dialog
      ref={gameOverRef}
      className="modal"
      onClose={() => {
        setDisabled(false);
      }}
      onClick={() => {
        gameOverRef.current!.close();
        setShowForm(false);
        setDisabled(false);
        shuffleCards();
      }}
    >
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl">Game Over!</h2>

        <div className="modal-body">
          <p className="text-lg">You finished the game in {turnCount} turns!</p>
        </div>
        {!showForm && (
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
        )}

        {showForm && (
          <form
            className="my-3"
            onSubmit={handleSubmit(async (data) => {
              const response = await fetch('/api/game/leaderboard', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
              });

              if (!response.ok) {
                throw new Error(response.statusText);
              }

              gameOverRef.current!.close();
              shuffleCards();
              setDisabled(false);
              setShowForm(false);
              reset();
            })}
          >
            <h2 className="my-3 text-xl font-bold">
              Save your score to the leaderboard!
            </h2>
            <FormSegment
              errorMessage={formState.errors.name?.message}
              formRegister={register('name')}
              id="name"
              label="Name"
              placeholder="Your name"
            />

            <div className="modal-action grid grid-cols-2 gap-1">
              <button formAction="submit" className="btn btn-primary btn-sm">
                Save Score
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                }}
                type="button"
                className="btn btn-primary btn-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
};

export default GameOverDialog;
