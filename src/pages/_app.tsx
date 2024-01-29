import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import Layout from '@/components/ui/Layout';
import { NunitoSans } from '@/fonts';

function MyApp({ Component, pageProps }: AppProps) {
  const font = NunitoSans;
  return (
    <>
      <style jsx global>
        {`
          html {
            font-family: ${font.style.fontFamily};
          }
        `}
      </style>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
export default MyApp;
