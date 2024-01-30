import { Sixtyfour } from '@/fonts';
import AsteroidsGameContainer from '@/games/asteroids/AsteroidsGameContainer';
import useMediaQuery from '@/hooks/useMediaQuery';
import { NextPage } from 'next';
import Head from 'next/head';

const Asteroids: NextPage = () => {
  const isMobile = useMediaQuery('(max-width: 640px)');

  return (
    <>
      <Head>
        <title>{`Asteroids | ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
        <meta name="description" content="Play Asteroids" />
      </Head>
      <div className={`flex min-h-dvh flex-col items-center justify-center`}>
        <header className={`${Sixtyfour.className} my-3 text-center`}>
          <h1 className="text-6xl font-bold uppercase">Asteroids</h1>
        </header>

        {isMobile ? (
          <div className="flex h-96 items-center justify-center text-center">
            This game is not optimized for mobile devices. Please play on a larger screen.
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
