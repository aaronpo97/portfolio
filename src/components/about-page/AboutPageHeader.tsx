import useIsMobile from '@/hooks/useIsMobile';
import classNames from 'classnames';
import { FC } from 'react';

const AboutPageHeader: FC<{
  currentSlide: number;
  preamble: string;
}> = ({ currentSlide, preamble }) => {
  const doAnimation = currentSlide === 0;
  const isMobile = useIsMobile();
  return (
    <header className="flex h-dvh flex-col items-center justify-center">
      <div className="w-9/12">
        <h1
          className={classNames('my-7 text-2xl font-extrabold md:my-10 md:text-8xl', {
            'animate-fade-left': doAnimation,
            'opacity-0': !doAnimation,
          })}
        >
          About Me
        </h1>

        <div
          className={classNames('space-y-4', {
            'animate-fade-right': doAnimation,
            'opacity-0': !doAnimation,
          })}
        >
          {preamble.split('\n').map((line, index) => (
            <p className="md:text-2xl" key={index}>
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* bottom right corner */}
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
              <kbd className="kbd">1</kbd> through <kbd className="kbd">6</kbd>.
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default AboutPageHeader;
