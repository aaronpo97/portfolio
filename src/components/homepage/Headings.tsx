import classNames from 'classnames';
import { useInView } from 'react-intersection-observer';

const Headings = () => {
  const [headingRef, inViewOne] = useInView();

  return (
    <div
      ref={headingRef}
      className="flex flex-col space-y-3 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]"
    >
      <h1
        className={classNames(
          'space-x-1 text-5xl font-extrabold md:text-8xl',
          { 'animate-fade animate-duration-150': inViewOne, 'opacity-0': !inViewOne },
          'motion-reduce:animate-none',
        )}
      >
        Hello, I&apos;m {process.env.NEXT_PUBLIC_SITE_NAME}.
      </h1>
      <h2
        className={classNames(
          'text-2xl font-bold md:text-5xl',
          { 'animate-fade animate-duration-150': inViewOne, 'opacity-0': !inViewOne },
          'motion-reduce:animate-none',
        )}
      >
        I build web applications.
      </h2>
    </div>
  );
};

export default Headings;
