import GameBoard from '@/game/components/GameBoard';
import Image from 'next/image';

const Game = () => {
  return (
    <div className="relative flex h-dvh w-full touch-pan-y flex-col items-center justify-center bg-[radial-gradient(eclipse,_var(--tw-gradient-stops))] from-slate-900 via-slate-600 to-slate-500">
      <Image
        alt=""
        src="/background.jpg"
        height={4015}
        width={6035}
        className="pointer-events-none absolute h-full w-full object-cover mix-blend-overlay"
      />
      <div className="relative mb-24 mt-12 flex h-full w-10/12 select-none flex-col justify-center text-center text-white md:mt-24">
        <GameBoard />
      </div>
    </div>
  );
};

export default Game;
