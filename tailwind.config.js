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
        'cyclone-pattern': 'var(--cyclone-pattern)',
        'cyclone-desktop-pattern': 'var(--cyclone-desktop-pattern)',
        'grayscale-ghost-white': 'var(--grayscale-ghost-white)',
        'grayscale-milk-white': 'var(--grayscale-milk-white)',
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      screens: {
        md: '744px',
        // => @media (min-width: 640px) { ... }

        lg: '1025px',
        // => @media (min-width: 1024px) { ... }

        desktop: '1400px',
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [],
}
