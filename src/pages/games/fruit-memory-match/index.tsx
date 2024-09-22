import GameBoard from '@/games/fruit-memory-match/components/GameBoard';
import Head from 'next/head';
// import Image from 'next/image';

const FruitMemoryMatch = () => {
  return (
    <>
      <Head>
        <title>{`Fruit Memory Match | ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
        <meta name="description" content="Play Fruit Memory Match" />
        <meta name="robots" content="nosnippet" />
      </Head>
      <div className="flex h-dvh w-full animate-fade touch-pan-x touch-pan-y flex-col items-center justify-center animate-duration-300 motion-reduce:animate-none">
        <GameBoard />
      </div>
    </>
  );
};

export default FruitMemoryMatch;
