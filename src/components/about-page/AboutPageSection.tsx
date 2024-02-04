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
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isInLandscape = useMediaQuery('(orientation: landscape)');
  return (
    <section
      className={classNames(
        'relative mt-5 flex h-full w-full flex-col items-center justify-center text-white',

        {
          'mt-12': isMobile && isInLandscape,
          'animate-fade-up': doAnimation,
          'opacity-0': !doAnimation,
        },
      )}
    >
      <div className="w-9/12">
        <h2
          className={classNames(
            'my-3 text-2xl font-extrabold md:text-8xl',
            {
              'animate-fade-left animate-duration-1000': doAnimation,
              'opacity-0': !doAnimation,
            },
            'motion-reduce:animate-none',
          )}
        >
          {item.heading}
        </h2>
        <div
          className={classNames(
            {
              'animate-fade-right animate-delay-75 animate-duration-1000': doAnimation,
              'opacity-0': !doAnimation,
            },
            'motion-reduce:animate-none',
          )}
        >
          <div className="space-y-4">
            {item.text.split('\n').map((line, i) => (
              <p key={i} className="text-sm md:text-2xl">
                {line}
              </p>
            ))}
          </div>
          {doAnimation && (
            <>
              <AboutPageTechSection item={item} />
              <AboutPageCoursesSection item={item} />
              <AboutPageSkillsSection item={item} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutPageSection;
