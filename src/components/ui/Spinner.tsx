import { FC } from 'react';

interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const Spinner: FC<SpinnerProps> = ({ size = 'md' }) => {
  const spinnerWidths: Record<NonNullable<SpinnerProps['size']>, `w-[${number}px]`> = {
    xs: 'w-[45px]',
    sm: 'w-[90px]',
    md: 'w-[135px]',
    lg: 'w-[180px]',
    xl: 'w-[225px]',
  };

  return (
    <div role="alert" className="text-center">
      <span className={`loading loading-spinner loading-${spinnerWidths[size]}`} />
    </div>
  );
};

export default Spinner;
