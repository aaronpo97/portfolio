import type { NextPage } from 'next';
import Headings from '@/components/homepage/Headings';
import Socials from '@/components/homepage/Socials';
import Image from 'next/image';
import Head from 'next/head';

import { FaGamepad } from 'react-icons/fa';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_SITE_NAME}</title>
        <meta name="description" content="Aaron Po's personal website" />
      </Head>
      <div className="relative flex h-dvh w-full flex-col items-center justify-center bg-[radial-gradient(eclipse,_var(--tw-gradient-stops))] from-slate-900 via-slate-600 to-slate-500">
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
        <div className="absolute bottom-5 right-5 flex flex-col justify-end">
          <div
            className="tooltip tooltip-left"
            data-tip="Oh hey, what's up. I have some games here. Click me!"
          >
            <Link href="/games" className="btn btn-circle btn-ghost btn-xs text-xs">
              <FaGamepad />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
