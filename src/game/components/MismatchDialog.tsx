import { FC, RefObject } from 'react';

const MismatchDialog: FC<{
  funFact: string;
  mismatchRef: RefObject<HTMLDialogElement>;
}> = ({ funFact, mismatchRef }) => (
  <dialog
    className="modal modal-bottom bg-transparent shadow-lg"
    ref={mismatchRef}
    onClick={() => {
      mismatchRef.current?.close();
    }}
  >
    <div
      className="modal-box space-y-3 bg-primary text-center"
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="text-2xl font-bold">Mismatch!</h1>
      <h2 className="text-md">Fun fact about me: {funFact}</h2>
    </div>
  </dialog>
);

export default MismatchDialog;
