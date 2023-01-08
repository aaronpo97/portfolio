/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],

  // eslint-disable-next-line import/no-extraneous-dependencies
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
  daisyui: {
    logs: false,
    themes: ['dark'],
  },
};
