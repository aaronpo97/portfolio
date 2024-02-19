import type { NextPage } from 'next';
import Headings from '@/components/homepage/Headings';
import Socials from '@/components/homepage/Socials';
import Image from 'next/image';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_SITE_NAME}</title>
        <meta name="description" content="Aaron Po's personal website" />
      </Head>
      <div className="relative flex h-dvh w-full flex-col items-center justify-center">
        <Image
          alt=""
          src="/background.jpg"
          height={4015}
          width={6035}
          className="pointer-events-none absolute h-full w-full object-cover mix-blend-overlay"
        />
        <div className="relative flex w-9/12 flex-col justify-center text-white">
          <div className="flex flex-col space-y-10">
            <Headings />
            <Socials />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
