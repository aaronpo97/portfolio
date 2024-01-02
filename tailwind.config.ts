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
    primary: 'hsl(227, 25%, 25%)',
    secondary: 'hsl(255, 9%, 69%)',
    error: 'hsl(9, 52%, 57%)',
    accent: 'hsl(316, 96%, 60%)',
    neutral: 'hsl(240, 11%, 8%)',
    info: 'hsl(187, 11%, 60%)',
    success: 'hsl(117, 25%, 80%)',
    warning: 'hsl(50, 98%, 50%)',
    'base-100': 'hsl(227, 20%, 20%)',
    'base-200': 'hsl(227, 20%, 13%)',
    'base-300': 'hsl(227, 20%, 10%)',
  },
  light: {
    primary: 'hsl(180, 20%, 70%)',
    secondary: 'hsl(120, 10%, 70%)',
    error: 'hsl(4, 87%, 74%)',
    accent: 'hsl(93, 27%, 73%)',
    neutral: 'hsl(38, 31%, 91%)',
    info: 'hsl(163, 40%, 79%)',
    success: 'hsl(93, 27%, 73%)',
    warning: 'hsl(40, 76%, 73%)',
    'base-300': 'hsl(180, 10%, 88%)',
    'base-200': 'hsl(180, 10%, 92%)',
    'base-100': 'hsl(180, 10%, 95%)',
  },
};

const config: Config = {
  content: ['./src/**/*.jsx', './src/**/*.js', './src/**/*.ts', './src/**/*.tsx'],
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
  daisyui: { logs: false, themes: [customThemes] },
};

export default config;
