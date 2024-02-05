import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

const Page404: NextPage = () => {
  return (
    <>
      <Head>
        <title>500: Internal Server Error</title>
        <meta name="description" content="That page doesn't exist." />
      </Head>
      <div className="flex h-dvh flex-col items-center justify-center">
        <main className="w-10/12 space-y-7">
          <h1 className="text-center text-4xl font-bold text-base-content md:text-7xl">
            500: Internal Server Error
          </h1>
          <div className="my-3 space-y-3 text-center text-xl lg:text-2xl">
            <p>Something went wrong. I have been notified of the error.</p>
            <p>
              Please try again later. If the problem persists, please{' '}
              <a href="mailto:email@example.com" className="link-hover link">
                contact me
              </a>{' '}
              explaining what happened.
            </p>
          </div>
        </main>
      </div>
    </>
  );
};

export default Page404;
