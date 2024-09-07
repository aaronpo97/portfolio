import useGameBoard from '../hooks/useGameBoard';
import InstructionsDialog from './InstructionsDialog';
import MismatchDialog from './MismatchDialog';

import GameOverDialog from './GameOverDialog';
import LeaderboardDialog from './LeaderboardDialog';
import useLeaderboard from '../hooks/useLeaderBoard';
import CardsSection from './CardsSection';
import GameHeader from './GameHeader';
import GameActions from './GameActions';

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

  const {
    error,
    leaderboard,
    mutate: mutateLeaderboard,
    setSize,
    isLoading,
    size,
    isLoadingMore,
    isAtEnd,
  } = useLeaderboard();

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
        isLoading={isLoading}
        leaderboard={leaderboard}
        error={error}
        setDisabled={setDisabled}
        setSize={setSize}
        size={size}
        isLoadingMore={isLoadingMore}
        isAtEnd={isAtEnd}
      />
      <section className="flex flex-col items-center space-y-7">
        <GameHeader turns={turns} />
        <CardsSection
          cards={cards}
          selectChoice={selectChoice}
          choiceOne={choiceOne}
          choiceTwo={choiceTwo}
          disabled={disabled}
        />
        <GameActions
          setDisabled={setDisabled}
          shuffleCards={shuffleCards}
          disabled={disabled}
          mutateLeaderboard={mutateLeaderboard}
          gameOver={gameOver}
          leaderboardRef={leaderboardRef}
          instructionsRef={instructionsRef}
        />
      </section>
    </>
  );
};

export default GameBoard;
