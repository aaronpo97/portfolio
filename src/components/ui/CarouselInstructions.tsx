import useIsMobile from '@/hooks/useIsMobile';
import classNames from 'classnames';
import { FC } from 'react';

const CarouselInstructions: FC<{
  doAnimation: boolean;
  slideCount: number;
}> = ({ doAnimation, slideCount }) => {
  const isMobile = useIsMobile();
  return (
    <div
      className={classNames('absolute bottom-0 p-5 text-center', {
        'animate-flip-up': doAnimation,
        'opacity-0': !doAnimation,
      })}
    >
      {isMobile ? (
        <span className="text-xs italic">
          Swipe left to see more, or right to go back.
        </span>
      ) : (
        <ul className="flex flex-col text-sm italic">
          <li>
            Navigate through the slides using the arrows, swiping, or by pressing the{' '}
            <kbd className="kbd">←</kbd> and <kbd className="kbd">→</kbd> keys on your
            keyboard.
          </li>

          <li>
            Alternatively, jump to a specific slide by using keys{' '}
            <kbd className="kbd">1</kbd> through <kbd className="kbd">{slideCount}</kbd>.
          </li>
        </ul>
      )}
    </div>
  );
};

export default CarouselInstructions;
