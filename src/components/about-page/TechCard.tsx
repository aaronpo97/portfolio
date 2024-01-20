import Image from 'next/image';
import { FC } from 'react';
import { useInView } from 'react-intersection-observer';
import classNames from 'classnames';
import { Stack } from './types';

const TechCard: FC<{
  stack: Stack;
  index: number;
  disableAnimation: boolean;
}> = ({ stack, disableAnimation }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={classNames('card card-compact bg-primary', {
        'animate-fade': inView && !disableAnimation,
      })}
    >
      <div className="card-body h-full items-center justify-center">
        <div className="pointer-events-none flex h-12 w-12 items-center justify-center rounded-lg md:h-24 md:w-24">
          <Image
            src={stack.icon}
            alt={stack.text}
            width={96}
            height={96}
            className="h-full w-full"
          />
        </div>
        <h4 className="font-semibold md:text-xl">{stack.text}</h4>
      </div>
    </div>
  );
};

export default TechCard;
