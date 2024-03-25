import { Tab } from '@headlessui/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const Donuts = dynamic(
  () => import('../../components/threejs/donuts').then((mod) => mod.default),
  {
    ssr: false,
  },
);

const Rotacube = dynamic(
  () => import('../../components/threejs/rotacube').then((mod) => mod.default),
  {
    ssr: false,
  },
);

const Galaxy = dynamic(
  () => import('../../components/threejs/galaxy').then((mod) => mod.default),
  {
    ssr: false,
  },
);

const useThreeJsNavigation = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const router = useRouter();
  const query = router.query as { name?: string };

  useEffect(() => {
    const scenes: Record<string, number> = {
      donuts: 0,
      rotacube: 1,
      galaxy: 2,
    };
    const queryStrings = Object.keys(query);
    if (queryStrings.length === 0 || !query.name) {
      return;
    }

    if (scenes[query.name] !== undefined) {
      setSelectedIndex(scenes[query.name]);
      return;
    }

    router.replace('/threejs/view');
  }, [query, router]);

  return [selectedIndex, setSelectedIndex, router] as const;
};

const View: FC = () => {
  const [selectedIndex, setSelectedIndex, router] = useThreeJsNavigation();
  return (
    <>
      <Head>
        <title>{`Three.js Portfolio | ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
        <meta
          name="description"
          content="Here you can find some of the 3D scenes I've created using Three.js."
        />
      </Head>
      <div className="flex h-dvh select-none items-center justify-center">
        <div className="absolute left-3 top-1">
          <div data-tip="Go back" className="tooltip tooltip-right">
            <Link className="btn btn-primary btn-sm" href="/threejs">
              <FaArrowLeft />
            </Link>
          </div>
        </div>
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="tabs-boxed tabs absolute bottom-5 w-11/12 grid-cols-3 sm:w-7/12">
            <Tab
              className="tab text-sm font-semibold uppercase ui-selected:tab-active lg:text-xl"
              onClick={() => {
                router.replace('/threejs/view?name=donuts');
              }}
            >
              Donuts
            </Tab>
            <Tab
              className="tab text-sm font-semibold uppercase ui-selected:tab-active lg:text-xl"
              onClick={() => {
                router.replace('/threejs/view?name=rotacube');
              }}
            >
              Rotacube
            </Tab>
            <Tab
              className="tab text-sm font-semibold uppercase ui-selected:tab-active lg:text-xl"
              onClick={() => {
                router.replace('/threejs/view?name=galaxy');
              }}
            >
              Galaxy
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <Donuts />
            </Tab.Panel>
            <Tab.Panel>
              <Rotacube />
            </Tab.Panel>
            <Tab.Panel>
              <Galaxy />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

export default View;
