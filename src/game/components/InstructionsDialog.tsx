import { FC, RefObject } from 'react';

const InstructionsDialog: FC<{ instructionsRef: RefObject<HTMLDialogElement> }> = ({
  instructionsRef,
}) => (
  <dialog
    className="modal"
    ref={instructionsRef}
    onClick={() => instructionsRef.current!.close()}
  >
    <div className="modal-box justify-start bg-base-100">
      <h1 className="my-3 text-3xl font-bold">Instructions</h1>

      <ul className="list-none space-y-2 text-sm lg:text-base">
        <li>Click on a card to flip it over and find a match.</li>
        <li>If two cards match, they will stay flipped over.</li>
        <li>If they don&apos;t match, they will flip back over.</li>
        <li>Find all the matches in as few turns as possible!</li>
      </ul>

      <div className="modal-action justify-center">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => instructionsRef.current!.close()}
        >
          Sounds good!
        </button>
      </div>
    </div>
  </dialog>
);

export default InstructionsDialog;
