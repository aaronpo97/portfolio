import ICard from '../types/Card';

type PropTypes = {
  card: ICard;
  disabled: boolean;
  flipped: boolean;
  handleChoice: (card: ICard) => void;
};

const SingleCard = ({
  card,
  disabled,
  flipped,
  handleChoice,
}: PropTypes): JSX.Element => {
  const handleClick = (): void => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div
      className="card card-bordered h-16 w-16 cursor-pointer border-white bg-primary shadow-2xl lg:h-24 lg:w-24"
      onClick={handleClick}
    >
      <div className="card-body h-full items-center justify-center">
        {!flipped ? null : (
          <div className="select-none text-4xl fade-in lg:text-6xl">{card.emoji}</div>
        )}
      </div>
    </div>
  );
};

export default SingleCard;
