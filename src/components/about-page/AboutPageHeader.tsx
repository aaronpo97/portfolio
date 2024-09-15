import classNames from 'classnames';
import { FC } from 'react';
import CarouselInstructions from '../ui/CarouselInstructions';

const AboutPageHeader: FC<{
  currentSlide: number;
  preamble: string;
}> = ({ currentSlide, preamble }) => {
  const doAnimation = currentSlide === 0;

  return (
    <header className="flex h-dvh flex-col items-center justify-center">
      <div className="w-9/12">
        <h1
          className={classNames(
            'my-7 text-2xl font-extrabold md:my-10 md:text-8xl',
            {
              'animate-fade animate-duration-150': doAnimation,
              'opacity-0': !doAnimation,
            },
            'motion-reduce:animate-none',
          )}
        >
          About Me
        </h1>

        <div
          className={classNames(
            'space-y-4',
            {
              'animate-fade animate-duration-150': doAnimation,
              'opacity-0': !doAnimation,
            },
            'motion-reduce:animate-none',
          )}
        >
          {preamble.split('\n').map((line, index) => (
            <p className="text-sm md:text-2xl" key={index}>
              {line}
            </p>
          ))}
        </div>
      </div>

      <CarouselInstructions doAnimation={doAnimation} slideCount={6} />
    </header>
  );
};

export default AboutPageHeader;
