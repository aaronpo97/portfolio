import FormSegment from '@/components/ui/FormSegment';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const GameOverDialog: FC<{
  gameOverRef: React.RefObject<HTMLDialogElement>;
  turnCount: number;
  shuffleCards: () => void;
}> = ({ gameOverRef, turnCount, shuffleCards }) => {
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, formState, reset, setValue } = useForm<{
    name: string;
    turns: number;
  }>();

  useEffect(() => {
    setValue('turns', turnCount);
  }, [turnCount, setValue]);
  return (
    <dialog ref={gameOverRef} className="modal">
      <div className="modal-box">
        <h2 className="text-2xl">Game Over!</h2>

        <div className="modal-body">
          <p className="text-lg">You finished the game in {turnCount} turns!</p>
        </div>
        {!showForm && (
          <div className="modal-action grid grid-cols-2 justify-center gap-1">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                setShowForm(true);
              }}
            >
              Log Score on Leaderboard
            </button>
            <button
              type="button"
              onClick={() => {
                gameOverRef.current!.close();
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
              console.log(data);
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
              reset();
            })}
          >
            <h2 className="my-3 text-xl font-bold">
              Save your score to the leaderboard!
            </h2>
            <FormSegment
              errorMessage={formState.errors.name?.message}
              formRegister={register('name', { required: 'Please provide your name.' })}
              id="name"
              label="Name"
              small
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
