import Image from 'next/image';
import { FC } from 'react';
import { useInView } from 'react-intersection-observer';
import classNames from 'classnames';
import useMediaQuery from '@/hooks/useMediaQuery';
import { Stack } from './types';

const TechCard: FC<{
  stack: Stack;
}> = ({ stack }) => {
  const [ref, inView] = useInView();
  const isMobile = useMediaQuery('(max-width: 640px)');

  return (
    <a
      ref={ref}
      href={stack.link}
      className={classNames(
        'card card-compact bg-primary hover:bg-[#292d3d]',
        { 'animate-fade-up': inView && !isMobile, 'opacity-0': !inView && !isMobile },
        'motion-reduce:animate-none',
      )}
      // open in new tab
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
