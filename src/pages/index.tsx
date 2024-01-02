import type { NextPage } from 'next';
import Headings from '@/components/homepage/Headings';
import Socials from '@/components/homepage/Socials';

const Home: NextPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center py-2">
      <div className="w-9/12 space-y-12">
        <Headings />
        <Socials />
      </div>
    </div>
  );
};

export default Home;
