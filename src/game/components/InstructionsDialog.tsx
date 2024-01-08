import { Dispatch, FC, RefObject, SetStateAction } from 'react';

const InstructionsDialog: FC<{
  instructionsRef: RefObject<HTMLDialogElement>;
  setDisabled: Dispatch<SetStateAction<boolean>>;
}> = ({ instructionsRef, setDisabled }) => (
  <dialog
    className="modal"
    ref={instructionsRef}
    onClick={() => {
      instructionsRef.current!.close();
      setDisabled(false);
    }}
  >
    <div
      className="modal-box justify-start bg-primary"
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="my-3 text-3xl font-bold">Instructions</h1>

      <ul className="list-none space-y-2 text-sm lg:text-base">
        <li>Click on a card to flip it over and find a match.</li>
        <li>If two cards match, they will stay flipped over.</li>
        <li>If they don&apos;t match, they will flip back over.</li>
        <li>Find all the matches in as few turns as possible!</li>
      </ul>

      <div className="modal-action justify-center">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            instructionsRef.current!.close();
            setDisabled(false);
          }}
        >
          Sounds good!
        </button>
      </div>
    </div>
  </dialog>
);

export default InstructionsDialog;
