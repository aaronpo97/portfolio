import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Page404: NextPage = () => {
  return (
    <>
      <Head>
        <title>404 Not Found</title>
        <meta name="description" content="That page doesn't exist." />
      </Head>
      <div className="flex h-dvh flex-col items-center justify-center">
        <main className="w-10/12 space-y-7 text-center">
          <h1 className="text-4xl font-bold text-base-content md:text-7xl">
            404: Page Not Found
          </h1>
          <p className="text-bold my-3 text-xl lg:text-2xl">
            I think you&apos;re lost. Try going back{' '}
            <Link href="/" className="link-hover link">
              home.
            </Link>
          </p>
        </main>
      </div>
    </>
  );
};

export default Page404;
