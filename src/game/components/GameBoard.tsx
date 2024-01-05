import useGameBoard from '../hooks/useGameBoard';
import InstructionsDialog from './InstructionsDialog';
import MismatchDialog from './MismstchDialog';
import SingleCard from './SingleCard';

const GameBoard = (): JSX.Element => {
  const {
    cards,
    choices: { choiceOne, choiceTwo },
    disabled,
    funFact,
    handleChoice,
    mismatchRef,
    gameOver,
    shuffleCards,
    turns,
    instructionsRef,
  } = useGameBoard();

  return (
    <>
      <MismatchDialog mismatchRef={mismatchRef} funFact={funFact} />
      <InstructionsDialog instructionsRef={instructionsRef} />
      <section className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center">
          <div className="my-5">
            <h2 className="text-2xl">Turns: {turns}</h2>
          </div>
        </div>
        <div className="flex items-center justify-center">
          {cards && (
            <div className="card-grid mt-4 grid grid-cols-4 gap-3">
              {cards.map((card) => (
                <SingleCard
                  card={card}
                  key={card.id}
                  handleChoice={handleChoice}
                  flipped={card === choiceOne || card === choiceTwo || card.matched}
                  disabled={disabled}
                />
              ))}
            </div>
          )}
        </div>
        <div className="my-10 grid grid-cols-2 gap-2 ">
          <button
            disabled={disabled}
            onClick={shuffleCards}
            className="btn btn-primary btn-sm border-white"
          >
            {gameOver ? 'Play Again' : 'Restart'}
          </button>
          <button
            className="btn btn-primary btn-sm border-white"
            onClick={() => instructionsRef.current!.showModal()}
            disabled={disabled}
          >
            Instructions
          </button>
        </div>
      </section>
    </>
  );
};

export default GameBoard;
