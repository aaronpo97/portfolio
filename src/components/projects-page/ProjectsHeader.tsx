import classNames from 'classnames';
import { FC } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';
import CarouselInstructions from '../ui/CarouselInstructions';

const ProjectsHeader: FC<{
  currentSlide: number;
  preamble: string;
}> = ({ currentSlide, preamble }) => {
  const isInLandscape = useMediaQuery('(orientation: landscape)');
  return (
    <header
      className={classNames('flex h-full flex-col items-center justify-center', {})}
    >
      <div
        className={classNames('flex w-9/12 flex-col space-y-3', {
          'my-32': isInLandscape,
        })}
      >
        <header>
          <h1
            className={classNames(
              'w-full text-2xl font-extrabold md:text-8xl',
              {
                'animate-fade animate-duration-300': currentSlide === 0,
                'opacity-0': currentSlide !== 0,
              },
              'motion-reduce:animate-none',
            )}
          >
            Projects
          </h1>
        </header>
        <div
          className={classNames(
            'space-y-4',
            {
              'animate-fade animate-duration-300': currentSlide === 0,
              'opacity-0': currentSlide !== 0,
            },
            'motion-reduce:animate-none',
          )}
        >
          {preamble.split('\n').map((line, index) => (
            <p className="text-sm sm:text-xl md:text-xl" key={index}>
              {line}
            </p>
          ))}
        </div>
      </div>
      <CarouselInstructions doAnimation={currentSlide === 0} slideCount={4} />
    </header>
  );
};

export default ProjectsHeader;
