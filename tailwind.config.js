import containerQueriesPlugin from '@tailwindcss/container-queries';
import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  plugins: [formsPlugin, typographyPlugin, containerQueriesPlugin],
  theme: {
    fontFamily: {
      playfair_org: ['Playfair Display', 'serif'],
      playfair: ['playfair', 'serif'],
      'avenir-medium': ['avenir-medium', 'sans-serif'],
      aveternate: ['aveternate', 'sans-serif'],
      'avenir-light': ['avenir-light', 'sans-serif'],
      'avenir-heavy': ['avenir-heavy', 'sans-serif'],
      'optima-normal': ['optima-normal', 'sans-serif'],
      'optima-medium': ['optima-medium', 'sans-serif'],
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
