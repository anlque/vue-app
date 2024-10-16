/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        grayscaleLicorice: 'var(--grayscale-licorice)',
        'purple-cold': 'var(--cold-purple)',
        grayscaleWaterloo: 'var(--grayscale-waterloo)',
        'grayscale-white': 'var(--grayscale-white)',
        'grayscale-waterloo': 'var(--grayscale-waterloo)',
        'cyclone-pattern': 'var(--cyclone-pattern)',
        'cyclone-desktop-pattern': 'var(--cyclone-desktop-pattern)',
        'grayscale-ghost-white': 'var(--grayscale-ghost-white)',
        'grayscale-milk-white': 'var(--grayscale-milk-white)',
        'grayscale-line': 'var(--grayscale-line)',
        'grayscale-line-2': 'var(--grayscale-line-2)',
        'error-default': 'var(--error-default)',
        'warning-hover': 'var(--warning-hover)',
      },
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        karla: ['var(--font-karla)'],
      },
      screens: {
        md: '744px',
        lg: '1025px',
        desktop: '1400px',
      },
    },
  },
  plugins: [],
};
