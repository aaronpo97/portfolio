import classNames from 'classnames';
import { FC } from 'react';

import useMediaQuery from '@/hooks/useMediaQuery';
import type { Content } from './types';
import AboutPageTechSection from './AboutPageTechSection';
import AboutPageSkillsSection from './AboutPageSkillsSection';
import AboutPageCoursesSection from './AboutPageCoursesSection';

const AboutPageSection: FC<{
  item: Content;
  index: number;
  currentSlide: number;
}> = ({ item, index, currentSlide }) => {
  const doAnimation = currentSlide === index;
  const isInLandscape = useMediaQuery('(orientation: landscape)');
  return (
    <section
      className={classNames(
        'mb-0 mt-0 flex min-h-dvh flex-col items-center justify-center',
        { 'my-32': isInLandscape },
        'motion-reduce:animate-none',
      )}
    >
      <div className="w-9/12 space-y-3">
        <header>
          <h2
            className={classNames(
              'text-2xl font-extrabold md:text-8xl',
              {
                'animate-fade animate-duration-1000': doAnimation,
                'opacity-0': !doAnimation,
              },
              'motion-reduce:animate-none',
            )}
          >
            {item.heading}
          </h2>
        </header>
        <div
          className={classNames(
            {
              'animate-fade animate-delay-75 animate-duration-1000': doAnimation,
              'opacity-0': !doAnimation,
            },
            'motion-reduce:animate-none',
          )}
        >
          <div className="space-y-4">
            {item.text.split('\n').map((line, i) => (
              <p key={i} className="text-sm sm:text-xl md:text-2xl">
                {line}
              </p>
            ))}
          </div>
          {doAnimation && (
            <>
              <AboutPageTechSection item={item} doAnimation={doAnimation} />
              <AboutPageCoursesSection item={item} doAnimation={doAnimation} />
              <AboutPageSkillsSection item={item} doAnimation={doAnimation} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutPageSection;
