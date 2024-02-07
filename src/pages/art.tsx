import Donuts from '@/art/donuts/Donuts';
import { Tab } from '@headlessui/react';
import { NextPage } from 'next';

const Art: NextPage = () => {
  return (
    <div className="flex h-dvh items-center justify-center">
      <Tab.Group>
        <Tab.List className="tabs-boxed tabs absolute bottom-5 grid-cols-3 border-4">
          <Tab className="tab text-2xl font-semibold uppercase ui-selected:tab-active">
            Donuts
          </Tab>
          <Tab className="tab text-2xl font-semibold uppercase ui-selected:tab-active">
            Tab 2
          </Tab>
          <Tab className="tab text-2xl font-semibold uppercase ui-selected:tab-active">
            Tab 3
          </Tab>
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            <Donuts />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Art;
