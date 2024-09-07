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

            <div className="my-3 max-h-[20rem] w-full space-y-2 overflow-y-scroll overscroll-none px-5 lg:max-h-[30rem]">
              {leaderboard.length === 0 && (
                <p className="animate-fade text-center text-lg">
                  No entries yet. You could be the first!
                </p>
              )}
              {leaderboard.map((entry, i) => {
                const isLast = i === leaderboard.length - 1;
                return (
                  <div
                    key={entry.id}
                    className="animate flex animate-fade flex-col items-start justify-start"
                    ref={isLast ? ref : undefined}
                  >
                    <p className="text-2xl font-bold">{entry.name}</p>
                    <p className="">Turns: {entry.turns}</p>
                    <p className="">Date: {entry.date.toLocaleDateString()}</p>
                  </div>
                );
              })}
              {isAtEnd && (
                <div className="flex items-center justify-center">
                  <div className="animate-fade space-y-[0.5] text-center">
                    <p>You&apos;ve reached the end.</p>
                    <p>Thanks for playing, and feel free to submit your score!</p>
                  </div>
                </div>
              )}

              {isLoadingMore && !isAtEnd && (
                <>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div className="animate my-3 animate-fade" key={i}>
                      <div className="flex animate-pulse space-x-4">
                        <div className="flex-1 space-y-4 py-1">
                          <div className="h-3 w-3/12 rounded bg-base-100" />
                          <div className="space-y-2">
                            <div className="h-3 w-5/12 rounded bg-base-100" />
                            <div className="h-3 w-4/12 rounded bg-base-100" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Spinner size="xs" />
                </>
              )}
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
