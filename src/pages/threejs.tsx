import Donuts from '@/threejs/donuts/Donuts';
import Rotacube from '@/threejs/rotacube/Rotacube';
import { Tab } from '@headlessui/react';
import { NextPage } from 'next';
import Head from 'next/head';

const Info = () => {
  return (
    <div className="flex justify-center space-y-3 text-center">
      <div className="flex flex-col items-center justify-center space-y-3 text-center">
        <h1 className="text-4xl font-bold lg:text-6xl">Three.js Portfolio</h1>
        <p className="text-lg lg:text-2xl">
          Here you can find some of the 3D scenes I&apos;ve created using Three.js.
        </p>
        <p className="text-lg lg:text-2xl">Click on the tabs to view the art.</p>
      </div>
    </div>
  );
};

const ThreeJs: NextPage = () => {
  return (
    <>
      <Head>
        <title>Three.js Portfolio | {process.env.NEXT_PUBLIC_SITE_NAME}</title>
        <meta
          name="description"
          content="Here you can find some of the 3D scenes I've created using Three.js."
        />
      </Head>
      <div className="flex h-dvh items-center justify-center">
        <Tab.Group>
          <Tab.List className="tabs-boxed tabs absolute bottom-5 w-11/12 grid-cols-3 lg:w-7/12">
            <Tab className="tab text-xl font-semibold uppercase ui-selected:tab-active">
              Info
            </Tab>
            <Tab className="tab text-xl font-semibold uppercase ui-selected:tab-active">
              Donuts
            </Tab>
            <Tab className="tab text-xl font-semibold uppercase ui-selected:tab-active">
              Rotacube
            </Tab>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <Info />
            </Tab.Panel>
            <Tab.Panel>
              <Donuts />
            </Tab.Panel>
            <Tab.Panel>
              <Rotacube />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

export default ThreeJs;
