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
      body: ['avenir', 'sans-serif'],
      body_light: ['avenir-light', 'sans-serif'],
      title: ['zapHuman', 'sans-serif'],
      optima: ['optima', 'sans-serif'],
    },
    extend: {
      transitionTimingFunction: {
        'css-ease': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'css-ease-in': 'cubic-bezier(0.42, 0, 1, 1)',
        'css-ease-out': 'cubic-bezier(0, 0, 0.58, 1)',
        'css-ease-in-out': 'cubic-bezier(0.42, 0, 0.58, 1)',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
};
