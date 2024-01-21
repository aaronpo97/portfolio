import aboutInfo from '@/content/pages/about.json';
import useIsMobile from '@/hooks/useIsMobile';
import classNames from 'classnames';
import { FC } from 'react';

const AboutPageHeader: FC<{
  currentSlide: number;
}> = ({ currentSlide }) => {
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
          {aboutInfo.preamble.split('\n').map((line, index) => (
            <p className="md:text-2xl" key={index}>
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* bottom right corner */}
      <div className="absolute bottom-0 right-0 p-5">
        {isMobile ? (
          <span className="text-xs italic">
            Swipe left to see more, or right to go back.
          </span>
        ) : (
          <span className="text-sm italic">
            Use the arrows to navigate, or swipe left/right.
          </span>
        )}
      </div>
    </header>
  );
};

export default AboutPageHeader;
