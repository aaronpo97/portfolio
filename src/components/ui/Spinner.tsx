import { FC } from 'react';

const Spinner: FC = () => {
  return (
    <div role="alert" className="text-center">
      <span className={`loading loading-spinner loading-lg`} />
    </div>
  );
};

export default Spinner;
