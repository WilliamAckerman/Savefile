import { createTheme } from '@mantine/core';

const defaultTheme = createTheme({
    colors: {
        darkViolet: [
            "#6d0985ff",
            "#6d0985ff",
            "#6d0985ff",
            "#6d0985ff",
            "#6d0985ff",
            "#6d0985ff",
            "#6d0985ff",
            "#6d0985ff",
            "#6d0985ff",
            "#6d0985ff",
        ]
    },

    shadows: {
        md: '1px 1px 3px rgba(0, 0, 0, .25)',
        xl: '5px 5px 3px rgba(0, 0, 0, .25)'
    },

    headings: {
        fontFamily: 'Roboto, sans-serif',
        sizes: {
            h1: { fontSize: '36px' }
        }
    }
});

export default defaultTheme;