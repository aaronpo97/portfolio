import type { NextPage } from 'next';
import Headings from '@/components/homepage/Headings';
import Socials from '@/components/homepage/Socials';
import Image from 'next/image';
import Head from 'next/head';
import metadata from '@/metadata';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_SITE_NAME}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(', ')} />
        <meta name="author" content="Aaron Po" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={metadata.title} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/background.jpg`}
        />
        <meta property="og:image:alt" content={metadata.title} />
        <meta name="robots" content="nosnippet" />
      </Head>
      <div className="relative flex h-dvh w-full flex-col items-center justify-center">
        <Image
          alt=""
          src="/background.jpg"
          height={4015}
          width={6035}
          className="pointer-events-none absolute h-full w-full object-cover mix-blend-overlay"
        />
        <div className="text-white relative flex w-9/12 flex-col justify-center">
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
