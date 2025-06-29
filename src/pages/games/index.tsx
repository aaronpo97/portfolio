import classNames from 'classnames';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { FC } from 'react';
import { useInView } from 'react-intersection-observer';
// import Image from 'next/image';
import Head from 'next/head';

const GamesHeader: FC<{
  inView: boolean;
}> = ({ inView }) => {
  return (
    <header className="w-full">
      <h1
        className={classNames(
          'mb-3 text-3xl font-bold lg:text-8xl',
          { 'animate-fade animate-duration-300': inView, 'opacity-0': !inView },
          'motion-reduce:animate-none',
        )}
      >
        Games
      </h1>
      <h2
        className={classNames(
          'mb-4 text-xl font-bold lg:text-3xl',
          { 'animate-fade animate-duration-300': inView, 'opacity-0': !inView },
          'motion-reduce:animate-none',
        )}
      >
        Welcome to my *secret* games page!
      </h2>
    </header>
  );
};

interface GamesProps {
  games: {
    href: string;
    name: string;
    description: string;
    imageHref: string;
    imageAlt: string;
    id: string;
  }[];
}

const Games: NextPage<GamesProps> = ({ games }) => {
  const [ref, inView] = useInView();
  return (
    <>
      <Head>
        <title>{`Games | ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
        <meta name="robots" content="nosnippet" />
        <meta name="description" content="Play games made by Aaron Po!" />
      </Head>
      <main className="flex min-h-dvh flex-col items-center justify-center">
        <article ref={ref} className="w-9/12 space-y-10">
          <GamesHeader inView={inView} />

          <div
            className={classNames(
              'grid grid-cols-1 gap-3 md:grid-cols-2',
              {
                'animate-fade animate-duration-300': inView,
                'opacity-0': !inView,
              },
              'motion-reduce:animate-none',
            )}
          >
            {games.map((game) => {
              return (
                <Link
                  key={game.id}
                  className="card card-compact bg-base-300 hover:bg-base-200"
                  href={game.href}
                >
                  {/* <figure>
                    <Image
                      src={game.imageHref}
                      height={4015}
                      width={6035}
                      alt={game.imageAlt}
                      className="h-64 w-full object-cover"
                    />
                  </figure> */}
                  <div className="card-body">
                    <h2 className="card-title text-xl font-bold lg:text-4xl">
                      {game.name}
                    </h2>
                    {game.description.split('\n').map((line, index) => (
                      <p key={index} className="text-sm lg:text-lg">
                        {line}
                      </p>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </article>
      </main>
    </>
  );
};

export default Games;

export const getStaticProps: GetStaticProps<GamesProps> = async () => {
  const games = [
    {
      href: '/games/fruit-memory-match',
      name: 'Fruit Memory Match',
      imageHref: '/images/games/fruit-memory-match/preview.svg',
      imageAlt: 'Fruit Memory Match',
      description:
        'Fruit Memory Match is a memory game where you match pairs of cards with the same fruit on them.\nThe game ends when all pairs are matched.',
    },
    {
      href: 'https://ayerble.com',
      name: 'Project Yerb',
      imageHref: '/images/games/project-yerb/preview.svg',
      imageAlt: 'Project Yerb',
      description:
        'Project Yerb is my custom game engine I built using SDL2, C++ and Emscripten.\nCurrently a work in progress, aims to be a versatile game engine for 2D games.',
    },
    {
      name: 'Flappy Gary',
      href: 'https://ayerble.itch.io/flappy-gary',
      imageHref: '/images/games/flappy-gary/preview.svg',
      imageAlt: 'Flappy Gary',
      description:
        'Gary brought you a video game. Say thank you to Gary.\nTotally not a rip-off of Flappy Bird. Tap to navigate Gary the cat through obstacles and avoid hitting them.',
    },
  ].map((game) => ({ ...game, id: crypto.randomUUID() }));

  return {
    props: { games },
  };
};
