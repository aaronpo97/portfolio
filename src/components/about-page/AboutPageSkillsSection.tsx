import { FC } from 'react';
import classNames from 'classnames';

import { Content } from './types';

const AboutPageSkillsSection: FC<{ item: Content; doAnimation: boolean }> = ({
  item,
  doAnimation,
}) => {
  return !item.skills ? null : (
    <div>
      <ul
        className={classNames(
          'mt-3 list-inside list-disc space-y-1 text-sm md:text-xl',
          { 'animate-fade-down': doAnimation, 'opacity-0': !doAnimation },
          'motion-reduce:animate-none motion-reduce:opacity-100',
        )}
      >
        {item.skills.map((skill, i) => (
          <li key={i}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default AboutPageSkillsSection;
