import { Nunito_Sans } from 'next/font/google';
import localFont from 'next/font/local';

export const NunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '800', '900', '1000'],
});

export const Sixtyfour = localFont({
  src: '../public/fonts/Sixtyfour.ttf',
});
