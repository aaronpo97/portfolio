import { Dispatch, FC, SetStateAction } from 'react';

import useLeaderboard from '../hooks/useLeaderBoard';

const LeaderboardDialog: FC<{
  leaderboardRef: React.RefObject<HTMLDialogElement>;
  leaderboard: ReturnType<typeof useLeaderboard>['leaderboard'];
  error: ReturnType<typeof useLeaderboard>['error'];
  setDisabled: Dispatch<SetStateAction<boolean>>;
}> = ({ leaderboardRef, leaderboard, error, setDisabled }) => {
  return (
    <dialog
      ref={leaderboardRef}
      className="modal"
      onClick={() => {
        leaderboardRef.current!.close();
        setDisabled(false);
      }}
    >
      <div className="modal-box bg-primary p-0" onClick={(e) => e.stopPropagation()}>
        {leaderboard && !error && (
          <>
            <h2 className="my-6 px-5 text-center text-5xl font-bold">Leaderboard</h2>

            <div className="my-3 max-h-[20rem] w-full space-y-2 overflow-y-scroll px-5 lg:max-h-[30rem]">
              {leaderboard.length === 0 && (
                <p className="text-center text-lg">
                  No entries yet. You could be the first!
                </p>
              )}
              {leaderboard.map((entry) => (
                <div key={entry.id} className="flex flex-col items-start justify-start">
                  <p className="text-2xl font-bold">{entry.name}</p>
                  <p className="">Turns: {entry.turns}</p>
                  <p className="">Date: {entry.date.toLocaleDateString()}</p>
                </div>
              ))}
            </div>

            <div className="modal-action m-5 justify-center">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  leaderboardRef.current!.close();
                  setDisabled(false);
                }}
              >
                Sounds good!
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
};

export default LeaderboardDialog;
