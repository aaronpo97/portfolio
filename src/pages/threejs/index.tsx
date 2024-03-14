import { NextPage } from 'next';

import Head from 'next/head';
import Link from 'next/link';

const ThreeJs: NextPage = () => {
  return (
    <>
      <Head>
        <title>{`Three.js Portfolio | ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
        <meta
          name="description"
          content="Here you can find some of the 3D scenes I've created using Three.js."
        />
      </Head>

      <div className="flex h-dvh justify-center">
        <main className="flex w-10/12 flex-col justify-center space-y-7 ">
          <div className="space-y-2">
            <h1 className="my-6 text-3xl font-bold lg:text-6xl">Three.js Portfolio</h1>
            <p className="text-sm font-semibold lg:text-xl">
              Here you can find some of the 3D scenes I&apos;ve created using Three.js.
            </p>
            <p className="text-sm font-semibold lg:text-xl">
              The scenes are interactive and you can rotate them using your mouse or touch
              screen.
            </p>

            <p className="text-sm font-semibold lg:text-xl">
              If you are sensitive to movement, please proceed with caution.
            </p>
          </div>

          <div>
            <Link className="btn btn-primary btn-sm" href="/threejs/view">
              View Art
            </Link>
          </div>
        </main>
      </div>
    </>
  );
};

export default ThreeJs;
