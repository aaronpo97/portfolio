import { useState, useCallback, useRef, useEffect } from 'react';
import Card from '../types/Card';
import { cardContent, funFacts } from '../data';

interface IChoices {
  choiceOne: Card | null;
  choiceTwo: Card | null;
}
const useGameBoard = () => {
  const [cards, setCards] = useState<Card[]>();
  const [turns, setTurns] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [choices, setChoices] = useState<IChoices>({ choiceOne: null, choiceTwo: null });
  const [funFact, setFunFact] = useState('');

  const mismatchRef = useRef<HTMLDialogElement>(null);
  const instructionsRef = useRef<HTMLDialogElement>(null);
  const gameOverRef = useRef<HTMLDialogElement>(null);
  const leaderboardRef = useRef<HTMLDialogElement>(null);

  const shuffleCards = useCallback((): void => {
    const shuffledCards = [...cardContent, ...cardContent]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        ...card,
        id: index,
      }));

    setChoices({
      choiceOne: null,
      choiceTwo: null,
    });
    setCards(shuffledCards);
    setTurns(0);
    setGameOver(false);
  }, []);

  const selectChoice = useCallback(
    (card: Card) => {
      return choices.choiceOne
        ? setChoices({ ...choices, choiceTwo: card })
        : setChoices({ ...choices, choiceOne: card });
    },
    [choices],
  );

  const resetTurn = useCallback(async () => {
    setChoices({ choiceOne: null, choiceTwo: null });
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 250);
    });
  }, []);

  const handleNoMatch = useCallback(async () => {
    mismatchRef.current?.showModal();
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        mismatchRef.current?.close();
        resolve();
      }, 2000);
    });
    await resetTurn();
    setFunFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
  }, [resetTurn]);

  const handleCorrectMatch = useCallback(() => {
    setCards(
      (prevCards) =>
        prevCards?.map((card) =>
          card.emoji === choices.choiceOne?.emoji ? { ...card, matched: true } : card,
        ),
    );
    resetTurn();
  }, [setCards, choices.choiceOne?.emoji, resetTurn]);

  const handleChoices = useCallback(
    async (choiceOne: Card | null, choiceTwo: Card | null) => {
      const noMatch = choiceOne?.emoji !== choiceTwo?.emoji;
      const isInvalid = !choiceOne || !choiceTwo || choiceOne === choiceTwo;

      if (isInvalid) return;
      setDisabled(true);
      if (noMatch) {
        await handleNoMatch();
        return;
      }
      handleCorrectMatch();
    },
    [handleNoMatch, handleCorrectMatch],
  );

  useEffect(() => {
    handleChoices(choices.choiceOne, choices.choiceTwo);
  }, [choices, handleChoices]);

  useEffect(() => {
    shuffleCards();
    setFunFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
  }, [shuffleCards]);

  useEffect(() => {
    if (!cards) return;
    const unmatchedCards = cards.filter((card) => card.matched === false);
    if (unmatchedCards.length) return;
    setDisabled(true);
    setGameOver(true);
    gameOverRef.current!.showModal();
  }, [turns, cards, setGameOver, gameOverRef]);

  return {
    funFact,
    functions: { selectChoice, shuffleCards, setDisabled, resetTurn },
    gameState: { cards, choices, turns, gameOver, disabled },
    dialogRefs: { instructionsRef, gameOverRef, leaderboardRef, mismatchRef },
  };
};

export default useGameBoard;
