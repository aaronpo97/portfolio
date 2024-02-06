import { FC } from 'react';
import classNames from 'classnames';

import { Content } from './types';

const AboutPageCoursesSection: FC<{ item: Content; doAnimation: boolean }> = ({
  item,
  doAnimation,
}) => {
  const { courses } = item;

  return (
    !!courses && (
      <ul
        className={classNames(
          'mr-10 mt-3 list-inside list-disc space-y-1 text-sm md:text-xl',
          { 'animate-fade-down': doAnimation, 'opacity-0': !doAnimation },
          'motion-reduce:animate-none motion-reduce:opacity-100',
        )}
      >
        {courses.map((course) => (
          <li key={course.link}>
            <a
              className="link-hover text-base-content"
              href={course.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              &quot;{course.title}&quot;
            </a>
            <span className="text-base-content"> by </span>
            <span className="text-base-content">{course.instructor}</span>
          </li>
        ))}
      </ul>
    )
  );
};

export default AboutPageCoursesSection;
