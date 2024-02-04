import { Sixtyfour } from '@/fonts';
import AsteroidsGameContainer from '@/games/asteroids/AsteroidsGameContainer';
import useMediaQuery from '@/hooks/useMediaQuery';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Asteroids: NextPage = () => {
  const isMobile = useMediaQuery('(max-width: 640px)');

  return (
    <>
      <Head>
        <title>{`Asteroids | ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
        <meta name="description" content="Play Asteroids" />
      </Head>
      <div className={`flex min-h-dvh flex-col items-center justify-center`}>
        <header className={`${Sixtyfour.className} my-6 text-center`}>
          <h1 className="text-3xl font-bold uppercase md:text-6xl">Asteroids</h1>
        </header>

        {isMobile ? (
          <div className="flex flex-col items-center justify-center px-2 text-center">
            This game is not optimized for mobile devices. Please play on a larger screen.
            <Link href="/games" className="btn btn-primary my-3">
              Go Back
            </Link>
          </div>
        ) : (
          <>
            <AsteroidsGameContainer />
            <footer className="my-6 text-center text-xl italic">
              <p>Note: This game is still in development. It may not work as expected.</p>
              <p>
                Follow the development of this game on my{' '}
                <a
                  href="https://github.com/aaronpo97/asteroids"
                  className="link-hover link"
                >
                  Github
                </a>
                !
              </p>
            </footer>
          </>
        )}
      </div>
    </>
  );
};

export default Asteroids;
