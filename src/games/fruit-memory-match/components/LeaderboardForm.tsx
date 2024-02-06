import CaptchaNotice from '@/components/CaptchaNotice';
import FormSegment from '@/components/ui/FormSegment';
import GameLeaderboardValidationSchema from '@/schema/GameLeaderboardValidationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, Dispatch, SetStateAction, RefObject, useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';

const LeaderboardForm: FC<{
  setShowForm: Dispatch<SetStateAction<boolean>>;
  turnCount: number;
  shuffleCards: () => void;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  gameOverRef: RefObject<HTMLDialogElement>;
}> = ({ setShowForm, turnCount, setDisabled, shuffleCards, gameOverRef }) => {
  const { register, handleSubmit, formState, reset, setValue } = useForm<{
    name: string;
    turns: number;
  }>({
    resolver: zodResolver(GameLeaderboardValidationSchema),
  });

  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    setValue('turns', turnCount);
  }, [turnCount, setValue]);
  return (
    <div>
      <form
        className="my-3"
        onSubmit={handleSubmit(async (data) => {
          if (!executeRecaptcha) {
            return;
          }

          const token = await executeRecaptcha();
          const response = await fetch('/api/games/fruit-memory-match/leaderboard', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
              'X-Captcha-Token': token,
            },
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
        <h2 className="my-3 text-xl font-bold">Save your score to the leaderboard!</h2>
        <FormSegment
          errorMessage={formState.errors.name?.message}
          formRegister={register('name')}
          id="name"
          label="Name"
          placeholder="Your name"
          disabled={formState.isSubmitting}
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
      <CaptchaNotice />
    </div>
  );
};

export default LeaderboardForm;
