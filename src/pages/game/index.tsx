import GameBoard from '@/game/components/GameBoard';
import Image from 'next/image';

const Game = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-[radial-gradient(eclipse,_var(--tw-gradient-stops))] from-slate-900 via-slate-600 to-slate-500">
      <Image
        alt=""
        src="/background.jpg"
        height={4015}
        width={6035}
        className="pointer-events-none absolute h-full w-full object-cover mix-blend-overlay"
      />
      <div className="relative mt-24 flex h-full w-9/12 flex-col justify-center text-center text-white">
        <h1 className="text-3xl font-bold lg:text-6xl">Fruit Memory Match</h1>
        <GameBoard />
      </div>
    </div>
  );
};

export default Game;
