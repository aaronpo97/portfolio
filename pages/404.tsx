import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/ui/Layout';

const Page404: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>404 Not Found</title>
        <meta name="description" content="That page doesn't exist." />
      </Head>
      <div className="flex items-center flex-col justify-center h-full bg-primary">
        <h1 className="font-bold text-4xl text-primary-content">404 Not Found</h1>
        <p className="text-primary-content">That page doesn&apos;t exist.</p>
      </div>
    </Layout>
  );
};

export default Page404;
