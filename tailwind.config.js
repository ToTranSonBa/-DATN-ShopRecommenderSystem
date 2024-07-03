const flowbite = require('flowbite-react/tailwind');
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        'node_modules/flowbite-react/lib/esm/**/*.js',
        './src/**/*.{js,jsx,ts,tsx}',
        flowbite.content(),
        './layouts/**/*.html',
        './content/**/*.md',
        './content/**/*.html',
        './src/*.js',
        './node_modules/flowbite/**/*.js',
    ],
    safelist: [
        'w-64',
        'w-1/2',
        'rounded-l-lg',
        'rounded-r-lg',
        'bg-gray-200',
        'grid-cols-4',
        'grid-cols-7',
        'h-6',
        'leading-6',
        'h-9',
        'leading-9',
        'shadow-lg',
        'bg-opacity-50',
        'dark:bg-opacity-80',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            zIndex: {
                100: '100',
            },
            keyframes: {
                'anim-in': {
                    '0%': { width: '0px', height: '0px', borderRadius: '100%', opacity: '20%' },
                    '100%': { opacity: '0%', borderRadius: '0', width: '600px', height: '600px' },
                },
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-0.5deg)' },
                    '50%': { transform: 'rotate(0.5deg)' },
                },
            },
            animation: {
                'anim-in': 'anim-in 0.7s forwards ease-out',
                wiggle: 'wiggle 1s ease-in-out infinite',
            },
            rotate: {
                'y-180': '180deg',
            },
            colors: {
                primary: '#1D4ED8',
                secondary: '#FF6633',
                background: '#f7f8fa',
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
            },
            borderWidth: {
                1: '1px',
            },
            transitionProperty: {
                width: 'width',
            },
            textDecoration: ['active'],
            minWidth: {
                kanban: '28rem',
            },
            gridAutoRows: {
                '2fr': 'minmax(0, 2fr)',
            },
        },
    },

    plugins: [
        require('flowbite/plugin')({
            charts: true,
        }),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
    ],
};
