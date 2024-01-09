/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
import type { Config } from 'tailwindcss';

type Theme = {
  primary: string;
  secondary: string;
  error: string;
  accent: string;
  neutral: string;
  info: string;
  success: string;
  warning: string;
  'base-100': string;
  'base-200': string;
  'base-300': string;
};

const customThemes: Record<string, Theme> = {
  dark: {
    primary: 'hsl(227, 20%, 30%)',
    secondary: 'hsl(255, 9%, 69%)',
    error: 'hsl(9, 52%, 57%)',
    accent: 'hsl(316, 96%, 60%)',
    neutral: 'hsl(240, 11%, 8%)',
    info: 'hsl(187, 11%, 60%)',
    success: 'hsl(117, 25%, 80%)',
    warning: 'hsl(50, 98%, 50%)',
    'base-100': 'hsl(227, 15%, 13%)',
    'base-200': 'hsl(227, 15%, 10%)',
    'base-300': 'hsl(227, 15%, 8%)',
  },
};

const config: Config = {
  content: ['./src/**/*.jsx', './src/**/*.js', './src/**/*.ts', './src/**/*.tsx'],
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animated'),
  ],
  daisyui: { logs: false, themes: [customThemes] },
};

export default config;
