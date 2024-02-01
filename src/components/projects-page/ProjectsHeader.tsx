import classNames from 'classnames';
import { FC } from 'react';
import CarouselInstructions from '../ui/CarouselInstructions';

const ProjectsHeader: FC<{
  currentSlide: number;
  preamble: string;
}> = ({ currentSlide, preamble }) => {
  return (
    <header className="flex h-dvh flex-col items-center justify-center">
      <div className="w-9/12 space-y-4">
        <h1
          className={classNames(
            'w-full text-2xl font-extrabold md:text-8xl',
            {
              'animate-fade-left': currentSlide === 0,
              'opacity-0': currentSlide !== 0,
            },
            'motion-reduce:animate-none',
          )}
        >
          Projects
        </h1>
        <div
          className={classNames(
            'space-y-4',
            {
              'animate-fade-right': currentSlide === 0,
              'opacity-0': currentSlide !== 0,
            },
            'motion-reduce:animate-none',
          )}
        >
          {preamble.split('\n').map((line, index) => (
            <p className="md:text-2xl" key={index}>
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
