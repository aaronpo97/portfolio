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
        <div className="pointer-events-none flex h-12 w-12 items-center justify-center rounded-lg md:h-20 md:w-20 lg:h-24 lg:w-24">
          <Image
            src={stack.icon}
            alt={stack.text}
            height={96}
            width={96}
            fetchPriority="high"
            className="h-full w-full"
          />
        </div>
        <h4 className="font-semibold lg:text-lg">{stack.text}</h4>
      </div>
    </a>
  );
};

export default TechCard;
