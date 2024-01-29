import classNames from 'classnames';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { FC } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const GamesHeader: FC<{
  inView: boolean;
}> = ({ inView }) => {
  return (
    <header className="w-full">
      <h1
        className={classNames('mb-4 animate-fade text-9xl font-bold', {
          'animate-fade-left': inView,
          'opacity-0': !inView,
        })}
      >
        Games
      </h1>
      <h2
        className={classNames('mb-4 animate-fade text-3xl font-bold', {
          'animate-fade-right': inView,
          'opacity-0': !inView,
        })}
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
    <main className="flex min-h-dvh flex-col items-center justify-center">
      <article ref={ref} className="w-9/12 space-y-10">
        <GamesHeader inView={inView} />

        <div
          className={classNames('grid grid-cols-2 gap-3', {
            'animate-fade': inView,
            'opacity-0': !inView,
          })}
        >
          {games.map((game) => {
            return (
              <Link
                key={game.id}
                className="card select-none bg-base-300 hover:bg-base-200"
                href={game.href}
              >
                <figure>
                  <Image
                    src={game.imageHref}
                    height={4015}
                    width={6035}
                    alt={game.imageAlt}
                    className="h-96 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-3xl font-bold">{game.name}</h2>
                  <p>{game.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </article>
    </main>
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
        'Fruit Memory Match is a memory game where you match pairs of cards with the same fruit on them. The game ends when all pairs are matched.',
    },
    {
      name: 'Asteroids',
      href: '/games/asteroids',
      imageHref: '/images/games/asteroids/preview.svg',
      imageAlt: 'Asteroids',
      description:
        'Asteroids is a game where you control a spaceship and shoot asteroids. Inspired by the classic arcade game by Atari.',
    },
  ].map((game) => ({ ...game, id: crypto.randomUUID() }));

  return {
    props: { games },
  };
};
