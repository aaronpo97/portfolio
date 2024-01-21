import { FC } from 'react';
import { Content } from './types';

const AboutPageSkillsSection: FC<{ item: Content }> = ({ item }) => {
  return !item.skills ? null : (
    <div className="">
      <ul className="mt-3 list-inside list-disc space-y-1 text-sm md:text-xl">
        {item.skills.map((skill, i) => (
          <li key={i}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default AboutPageSkillsSection;
