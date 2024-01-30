import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

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

      <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY!}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GoogleReCaptchaProvider>
    </>
  );
}
export default MyApp;
