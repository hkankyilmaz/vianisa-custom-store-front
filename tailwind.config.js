import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  plugins: [formsPlugin, typographyPlugin],
  theme: {
    fontFamily: {
      montserratMd: ['montserratmedium', 'sans-serif'],
      playfair: ['playfair', 'serif'],
      questrial: ['Questrial', 'sans-serif'],
      body: ['avenir', 'sans-serif'],
      title: ['zapHuman', 'sans-serif'],
    },
  },
};
