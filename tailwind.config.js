import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';
import containerQueriesPlugin from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  plugins: [formsPlugin, typographyPlugin, containerQueriesPlugin],
  theme: {
    fontFamily: {
      montserratMd: ['montserratmedium', 'sans-serif'],
      playfair: ['playfair', 'serif'],
      questrial: ['Questrial', 'sans-serif'],
    },
  },
};
