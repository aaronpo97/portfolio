import { Dispatch, FC, SetStateAction } from 'react';

import { useInView } from 'react-intersection-observer';
import Spinner from '@/components/ui/Spinner';
import useLeaderboard from '../hooks/useLeaderBoard';

const LeaderboardDialog: FC<{
  leaderboardRef: React.RefObject<HTMLDialogElement>;
  leaderboard: ReturnType<typeof useLeaderboard>['leaderboard'];
  error: ReturnType<typeof useLeaderboard>['error'];
  setDisabled: Dispatch<SetStateAction<boolean>>;
  setSize: ReturnType<typeof useLeaderboard>['setSize'];
  size: ReturnType<typeof useLeaderboard>['size'];
  isLoading: ReturnType<typeof useLeaderboard>['isLoading'];
  isLoadingMore: ReturnType<typeof useLeaderboard>['isLoadingMore'];
  isAtEnd: ReturnType<typeof useLeaderboard>['isAtEnd'];
}> = ({
  leaderboardRef,
  leaderboard,
  error,
  setDisabled,
  setSize,
  isLoading,
  isLoadingMore,
  isAtEnd,
}) => {
  const { ref } = useInView({
    onChange(visible) {
      if (!visible) {
        return;
      }
      setSize((size) => size + 1);
    },
  });

  return (
    <dialog
      ref={leaderboardRef}
      className="modal"
      onClose={() => {
        setDisabled(false);
      }}
      onClick={() => {
        leaderboardRef.current!.close();
        setDisabled(false);
      }}
    >
      <div className="modal-box bg-primary p-0" onClick={(e) => e.stopPropagation()}>
        {leaderboard && !error && !isLoading && (
          <>
            <h2 className="my-6 px-5 text-center text-5xl font-bold">Leaderboard</h2>

            <div className="my-3 max-h-[20rem] w-full space-y-2 overflow-y-scroll px-5 lg:max-h-[30rem]">
              {leaderboard.length === 0 && (
                <p className="text-center text-lg">
                  No entries yet. You could be the first!
                </p>
              )}
              {leaderboard.map((entry, i) => {
                const isLast = i === leaderboard.length - 1;
                return (
                  <div
                    key={entry.id}
                    className="flex flex-col items-start justify-start"
                    ref={isLast ? ref : undefined}
                  >
                    <p className="text-2xl font-bold">{entry.name}</p>
                    <p className="">Turns: {entry.turns}</p>
                    <p className="">Date: {entry.date.toLocaleDateString()}</p>
                  </div>
                );
              })}

              {isLoadingMore && !isAtEnd && <Spinner size="md" />}
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
