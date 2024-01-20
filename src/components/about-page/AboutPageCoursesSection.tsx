import { FC } from 'react';
import { Content } from './types';

const AboutPageCoursesSection: FC<{ item: Content }> = ({ item }) => {
  const { courses } = item;

  return (
    !!courses && (
      <ul className="mr-10 mt-3 list-inside list-disc space-y-1 text-sm md:text-xl">
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
