import { FC } from 'react';
import classNames from 'classnames';
import { useInView } from 'react-intersection-observer';
import { Content } from './types';

const AboutPageSkillsSection: FC<{ item: Content }> = ({ item }) => {
  const [ref, inView] = useInView();

  return !item.skills ? null : (
    <div className="">
      <ul
        className={classNames(
          'mt-3 list-inside list-disc space-y-1 text-sm md:text-xl',
          { 'animate-fade-down': inView, 'opacity-0': !inView },
          'motion-reduce:animate-none motion-reduce:opacity-100',
        )}
        ref={ref}
      >
        {item.skills.map((skill, i) => (
          <li key={i}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default AboutPageSkillsSection;
