import aboutInfo from '@/content/pages/about.json';
import useIsMobile from '@/hooks/useIsMobile';
import { FC } from 'react';

const AboutPageHeader: FC = () => {
  const isMobile = useIsMobile();
  return (
    <header className="flex h-dvh flex-col items-center justify-center">
      <div className="w-9/12">
        <h1 className="my-7 text-2xl font-extrabold md:my-10 md:text-8xl">About Me</h1>

        <div className="space-y-4">
          {aboutInfo.preamble.split('\n').map((line, index) => (
            <p className="md:text-2xl" key={index}>
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* bottom right corner */}
      <div className="absolute bottom-0 right-0 p-5">
        {isMobile ? (
          <span className="text-xs italic">
            Swipe left to see more, or right to go back.
          </span>
        ) : (
          <span className="text-sm italic">
            Use the arrows to navigate, or swipe left/right.
          </span>
        )}
      </div>
    </header>
  );
};

export default AboutPageHeader;
