import useGameBoard from '../hooks/useGameBoard';
import SingleCard from './SingleCard';

const CardsSection = ({
  cards,
  selectChoice,
  choiceOne,
  choiceTwo,
  disabled,
}: {
  cards: ReturnType<typeof useGameBoard>['gameState']['cards'];
  selectChoice: ReturnType<typeof useGameBoard>['functions']['selectChoice'];
  choiceOne: ReturnType<typeof useGameBoard>['gameState']['choices']['choiceOne'];
  choiceTwo: ReturnType<typeof useGameBoard>['gameState']['choices']['choiceTwo'];
  disabled: ReturnType<typeof useGameBoard>['gameState']['disabled'];
}) => {
  return (
    <div className="flex items-center justify-center">
      {cards && (
        <div className="card-grid mt-0 grid grid-cols-4 gap-3">
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
  );
};

export default CardsSection;
