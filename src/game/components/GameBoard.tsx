import useGameBoard from '../hooks/useGameBoard';
import InstructionsDialog from './InstructionsDialog';
import MismatchDialog from './MismatchDialog';
import SingleCard from './SingleCard';
import GameOverDialog from './GameOverDialog';
import LeaderboardDialog from './LeaderboardDialog';
import useLeaderboard from '../hooks/useLeaderBoard';

const GameBoard = (): JSX.Element => {
  const {
    funFact,
    functions: { selectChoice, shuffleCards, setDisabled },
    gameState: {
      cards,
      choices: { choiceOne, choiceTwo },
      turns,
      gameOver,
      disabled,
    },
    dialogRefs: { instructionsRef, gameOverRef, leaderboardRef, mismatchRef },
  } = useGameBoard();

  const { error, leaderboard, mutate } = useLeaderboard();
  return (
    <>
      <MismatchDialog mismatchRef={mismatchRef} funFact={funFact} />
      <InstructionsDialog instructionsRef={instructionsRef} setDisabled={setDisabled} />
      <GameOverDialog
        gameOverRef={gameOverRef}
        turnCount={turns}
        shuffleCards={shuffleCards}
        setDisabled={setDisabled}
      />
      <LeaderboardDialog
        leaderboardRef={leaderboardRef}
        leaderboard={leaderboard}
        error={error}
        setDisabled={setDisabled}
      />
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
                  selectChoice={selectChoice}
                  flipped={card === choiceOne || card === choiceTwo || card.matched}
                  disabled={disabled}
                />
              ))}
            </div>
          )}
        </div>

        <div className="my-11 h-10 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              className="btn btn-primary btn-sm uppercase"
              disabled={disabled}
              onClick={() => {
                setDisabled(true);
                leaderboardRef.current?.showModal();
                mutate();
              }}
            >
              View Leaderboard
            </button>
            <button
              className="btn btn-primary btn-sm uppercase"
              onClick={() => {
                setDisabled(true);
                instructionsRef.current!.showModal();
              }}
              disabled={disabled}
            >
              Instructions
            </button>
          </div>

          <div className="grid grid-cols-1">
            {!gameOver && (
              <button
                disabled={disabled}
                onClick={() => {
                  shuffleCards();
                }}
                className="btn btn-primary btn-sm uppercase"
              >
                Restart
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default GameBoard;
