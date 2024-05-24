const flowbite = require('flowbite-react/tailwind');
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['node_modules/flowbite-react/lib/esm/**/*.js', './src/**/*.{js,jsx,ts,tsx}', flowbite.content()],
    theme: {
        extend: {
            colors: {
                primary: '#8833FF',
                secondary: '#FF6633',
                background: '#FAFBFC',
                brown: {
                    800: '#37190B',
                    600: '#402013',
                    300: '#4F3125',
                },
            },
            fontFamily: {
                lexendeca: ['Lexend Deca', 'sans-serif'],
            },
            maxWidth: {
                '1/8': '12.5%',
                '1/3': '33,333333333%',
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
            },
            maxHeight: {
                '1/3': '33,333333333%',
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
            },
            height: {
                imgBG: '624px',
            },
            width: {
                '1/8': '12.5%',
            },
            minHeight: {
                0: '0',
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
                full: '100%',
            },
            minWidth: {
                '1/8': '12.5%',
            },
            fontSize: {
                es: '0.5rem',
            }
        },
    },

    plugins: [require('flowbite/plugin'), require('@tailwindcss/typography'), require('@tailwindcss/aspect-ratio')],
};
