import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Nunito_Sans } from 'next/font/google';
import Layout from '@/components/ui/Layout';

const font = Nunito_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '800', '900', '1000'],
});
function MyApp({ Component, pageProps }: AppProps) {
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
