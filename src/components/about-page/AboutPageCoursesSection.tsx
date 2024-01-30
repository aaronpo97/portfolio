import { FC } from 'react';
import classNames from 'classnames';
import { useInView } from 'react-intersection-observer';
import { Content } from './types';

const AboutPageCoursesSection: FC<{ item: Content }> = ({ item }) => {
  const { courses } = item;

  const [ref, inView] = useInView();
  return (
    !!courses && (
      <ul
        ref={ref}
        className={classNames(
          'mr-10 mt-3 list-inside list-disc space-y-1 text-sm md:text-xl',
          {
            'animate-fade-down animate-delay-75': inView,
            'opacity-0': !inView,
          },
          'motion-reduce:animate-none',
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
