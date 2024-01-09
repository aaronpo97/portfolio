import ICard from '../types/Card';

interface PropTypes {
  card: ICard;
  disabled: boolean;
  flipped: boolean;
  selectChoice(card: ICard): void;
}

const SingleCard = ({
  card,
  disabled,
  flipped,
  selectChoice,
}: PropTypes): JSX.Element => {
  return (
    <div
      className={`card card-bordered h-16 w-16 ${
        !flipped ? 'cursor-pointer md:hover:bg-base-300' : ''
      } ${!flipped && disabled ? 'bg-transparent' : 'bg-primary'}
      
      border-base-300 bg-primary shadow-2xl lg:h-28 lg:w-28`}
      onClick={!flipped ? () => (!disabled ? selectChoice(card) : undefined) : undefined}
    >
      <div className="card-body h-full items-center justify-center">
        {!flipped ? null : (
          <div className="fade-in select-none text-4xl lg:text-6xl">{card.emoji}</div>
        )}
      </div>
    </div>
  );
};

export default SingleCard;
