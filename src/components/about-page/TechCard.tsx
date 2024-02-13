import Image from 'next/image';
import { FC } from 'react';
import { Stack } from './types';

const TechCard: FC<{
  stack: Stack;
}> = ({ stack }) => {
  return (
    <a
      href={stack.link}
      className="card card-compact rounded-xl bg-primary hover:bg-[#292d3d]"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="card-body items-center justify-center">
        <div className="pointer-events-none flex h-9 w-9 items-center justify-center rounded-lg sm:h-10 sm:w-10 md:h-20 md:w-20 lg:h-24 lg:w-24">
          <Image
            src={stack.icon}
            alt={stack.text}
            height={96}
            width={96}
            fetchPriority="high"
            className="h-full w-full"
          />
        </div>
        <h4 className="text-xs font-semibold lg:text-lg">{stack.text}</h4>
      </div>
    </a>
  );
};

export default TechCard;
