const flowbite = require('flowbite-react/tailwind');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['node_modules/flowbite-react/lib/esm/**/*.js', './src/**/*.{js,jsx,ts,tsx}', flowbite.content()],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',
        secondary: '#FF6633',

        background: '#F7F8FA'
      },

      fontFamily: {
        lexendeca: ['Lexend Deca', 'sans-serif'],
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      maxHeight: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      height: {
        imgBG: '624px',
      },
      minHeight: {
        0: '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        full: '100%',
      },
    },
  },

  plugins: [require('flowbite/plugin'),
  require('@tailwindcss/typography'),
  require('@tailwindcss/aspect-ratio'),
  ],
};