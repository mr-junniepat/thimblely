/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7D2078',
          dark: '#19051A',
          light: '#9D4098',
        },
        logo: {
          gold: '#FFD700',
          orange: '#FFA500',
        },
      },
      backgroundImage: {
        'landing-pattern': "url('/landing.png')",
        'gradient-primary':
          'linear-gradient(135deg, #7D2078 0%, #9D4098 50%, #BD60B8 100%)',
        'gradient-hero': 'linear-gradient(to bottom right, #7D2078, #5D1058)',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
