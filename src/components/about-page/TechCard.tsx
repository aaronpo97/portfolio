import Image from 'next/image';
import { FC } from 'react';
import { Stack } from './types';

const TechCard: FC<{
  stack: Stack;
}> = ({ stack }) => {
  return (
    <a
      href={stack.link}
      className="card card-compact bg-primary hover:bg-[#292d3d]"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="card-body items-center justify-center">
        <div className="pointer-events-none flex h-12 w-12 items-center justify-center rounded-lg md:h-24 md:w-24">
          <Image
            src={stack.icon}
            alt={stack.text}
            width={96}
            fetchPriority="high"
            height={96}
            className="h-full w-full"
          />
        </div>
        <h4 className="font-semibold md:text-xl">{stack.text}</h4>
      </div>
    </a>
  );
};

export default TechCard;
