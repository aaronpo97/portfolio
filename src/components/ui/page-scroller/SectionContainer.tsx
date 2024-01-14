import { FC, ReactNode } from 'react';

interface SectionContainerProps {
  children: ReactNode;
}

const SectionContainer: FC<SectionContainerProps> = ({ children }) => {
  return <div className={`h-full w-full`}>{children}</div>;
};

export default SectionContainer;
