import { Dispatch, FC, SetStateAction } from 'react';

import { useInView } from 'react-intersection-observer';
import Spinner from '@/components/ui/Spinner';
import { format } from 'date-fns';
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
      <div
        className="modal-box max-w-3xl bg-primary p-0"
        onClick={(e) => e.stopPropagation()}
      >
        {leaderboard && !error && !isLoading && (
          <>
            <h2 className="my-6 px-5 text-center text-5xl font-bold">Leaderboard</h2>

            <div className="my-3 max-h-[20rem] w-full space-y-2 overflow-y-scroll overscroll-none px-5 lg:max-h-[30rem]">
              {leaderboard.length === 0 && (
                <p className="animate-fade text-center text-lg">
                  No entries yet. You could be the first!
                </p>
              )}

              <table className="table table-lg">
                <thead>
                  <tr className="text-2xl font-bold uppercase">
                    <th>Name</th>
                    <th>Turns</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody className="overflow-y-scroll">
                  {leaderboard.map((entry, i) => {
                    const isLast = i === leaderboard.length - 1;
                    return (
                      <tr
                        key={entry.id}
                        ref={isLast ? ref : undefined}
                        className="animate hover animate-fade"
                      >
                        <td className="text-2xl font-bold">{entry.name}</td>
                        <td className="text-xl font-bold">{entry.turns}</td>
                        <td className="text-xl font-semibold">
                          {format(entry.date, 'PP')}
                        </td>
                      </tr>
                    );
                  })}

                  {isLoadingMore && !isAtEnd && (
                    <>
                      {Array.from({ length: 3 }).map((_, i) => (
                        <tr className="animate my-3 animate-fade" key={i}>
                          {/* <div className="flex animate-pulse space-x-4">
                        <div className="flex-1 space-y-4 py-1">
                          <div className="h-3 w-3/12 rounded bg-base-100" />
                          <div className="space-y-2">
                            <div className="h-3 w-5/12 rounded bg-base-100" />
                            <div className="h-3 w-4/12 rounded bg-base-100" />
                          </div>
                        </div>
                      </div> */}

                          <td className="animate-pulse">
                            <div className="h-5 w-10/12 rounded bg-base-100" />
                          </td>
                          <td className="animate-pulse">
                            <div className="h-5 w-6/12 rounded bg-base-100" />
                          </td>
                          <td className="animate-pulse">
                            <div className="h-5 w-9/12 rounded bg-base-100" />
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
              {isLoadingMore && !isAtEnd && <Spinner />}
              {isAtEnd && (
                <div className="flex items-center justify-center text-xl font-bold italic">
                  <div className="animate-fade space-y-[0.5] text-center">
                    <p>You&apos;ve reached the end.</p>
                    <p>Thanks for playing, and feel free to submit your score!</p>
                  </div>
                </div>
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
