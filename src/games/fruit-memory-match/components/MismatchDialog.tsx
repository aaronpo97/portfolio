import { FC, RefObject, useEffect } from 'react';

const MismatchDialog: FC<{
  funFact: string;
  mismatchRef: RefObject<HTMLDialogElement>;
}> = ({ funFact, mismatchRef }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
      }
    };

    mismatchRef.current?.addEventListener('keydown', handleKeyDown);

    return () => {
      const { current } = mismatchRef;
      current?.removeEventListener('keydown', handleKeyDown);
    };
  }, [mismatchRef]);

  return (
    <dialog className="modal modal-bottom bg-transparent shadow-lg" ref={mismatchRef}>
      <div
        className="modal-box space-y-6 bg-primary text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-3">
          <h1 className="text-2xl font-extrabold">Mismatch!</h1>
          <h2 className="text-xl font-bold">Fun fact about me: {funFact}</h2>
        </div>
        <span className="loading loading-spinner loading-lg" />
      </div>
    </dialog>
  );
};

export default MismatchDialog;
