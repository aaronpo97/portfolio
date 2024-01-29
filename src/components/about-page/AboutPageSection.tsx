// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from 'next/image';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import classNames from 'classnames';
import { FC } from 'react';

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
  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center text-white">
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
              <p key={i} className="md:text-2xl">
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
