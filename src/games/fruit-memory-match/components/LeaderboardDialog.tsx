import { Dispatch, FC, SetStateAction } from 'react';

import { useInView } from 'react-intersection-observer';
import Spinner from '@/components/ui/Spinner';
import { format } from 'date-fns';
import useLeaderboard from '../hooks/useLeaderBoard';

const LeaderboardSkeleton: FC = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr className="animate my-3 animate-fade" key={i}>
          <td className="animate-pulse">
            <div className="bg-primary-loading h-3 w-11/12 rounded" />
          </td>
          <td className="animate-pulse">
            <div className="bg-primary-loading h-3 w-6/12 rounded" />
          </td>
          <td className="animate-pulse">
            <div className="bg-primary-loading h-3 w-9/12 rounded" />
          </td>
        </tr>
      ))}
    </>
  );
};

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
        {leaderboard && !error && (
          <>
            <h2 className="my-4 px-5 text-center text-2xl font-bold lg:my-6 lg:text-5xl">
              Leaderboard
            </h2>

            <div className="my-3 max-h-[20rem] w-full space-y-2 overflow-y-scroll overscroll-none px-5 lg:max-h-[30rem]">
              {leaderboard.length === 0 && (
                <p className="animate-fade text-center text-lg">
                  No entries yet. You could be the first!
                </p>
              )}

              <div className="overflow-x-auto">
                <table className="table table-xs sm:table-sm lg:table-lg">
                  <thead>
                    <tr className="text-sm font-bold uppercase lg:text-2xl">
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
                          <td className="text-xs font-bold lg:text-2xl">{entry.name}</td>
                          <td className="text-xs font-bold lg:text-xl">{entry.turns}</td>
                          <td className="text-xs font-semibold lg:text-xl">
                            {format(new Date(entry.date), 'MM/dd/yyyy')}
                          </td>
                        </tr>
                      );
                    })}

                    {isLoadingMore && !isAtEnd && <LeaderboardSkeleton />}
                  </tbody>
                </table>
              </div>
              {isLoadingMore && !isAtEnd && <Spinner />}
              {isAtEnd && (
                <div className="flex items-center justify-center font-bold italic lg:text-xl">
                  <div className="animate-fade space-y-[0.5] text-center">
                    <p>You&apos;ve reached the end.</p>
                    <p>Thanks for playing!</p>
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
