import Donuts from '@/components/threejs/donuts/Donuts';
import Rotacube from '@/components/threejs/rotacube/Rotacube';
import { Tab } from '@headlessui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const Info: FC<{
  setViewArt: Dispatch<SetStateAction<boolean>>;
}> = ({ setViewArt }) => {
  return (
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
          <button className="btn btn-primary btn-sm" onClick={() => setViewArt(true)}>
            View Art
          </button>
        </div>
      </main>
    </div>
  );
};

const ThreeJs: NextPage = () => {
  const [viewArt, setViewArt] = useState(false);
  return (
    <>
      <Head>
        <title>{`Three.js Portfolio | ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
        <meta
          name="description"
          content="Here you can find some of the 3D scenes I've created using Three.js."
        />
      </Head>
      {!viewArt ? (
        <Info setViewArt={setViewArt} />
      ) : (
        <div className="flex h-dvh select-none items-center justify-center">
          <div className="absolute left-3 top-16">
            <div data-tip="Go back" className="tooltip tooltip-right">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setViewArt(false)}
              >
                <FaArrowLeft />
              </button>
            </div>
          </div>
          <Tab.Group>
            <Tab.List className="tabs-boxed tabs absolute bottom-5 w-11/12 grid-cols-2 lg:w-7/12">
              <Tab className="tab text-xl font-semibold uppercase ui-selected:tab-active">
                Donuts
              </Tab>
              <Tab className="tab text-xl font-semibold uppercase ui-selected:tab-active">
                Rotacube
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <Donuts />
              </Tab.Panel>
              <Tab.Panel>
                <Rotacube />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      )}
    </>
  );
};

export default ThreeJs;
