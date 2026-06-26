/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFFBF4',
        peach: '#FCEEE1',
        peachdark: '#FBE5D2',
        orange: {
          DEFAULT: '#F26A21',
          dark: '#E05C16',
        },
        forest: {
          DEFAULT: '#1E4034',
          light: '#2E5E47',
          dark: '#16332A',
        },
        leaf: '#3E8E5A',
        pastel: {
          green: '#DCEFD7',
          yellow: '#FBE7B3',
          blue: '#D7E7F6',
          pink: '#F8DADA',
          lilac: '#E6DEF5',
          mint: '#D8EFE6',
        },
        ink: '#1B2521',
        muted: '#6B7A72',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        card: '0 12px 40px -18px rgba(30,64,52,0.18)',
        soft: '0 8px 30px -12px rgba(0,0,0,0.10)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
      },
      animation: {
        'marquee-left': 'marquee 32s linear infinite',
        'marquee-right': 'marquee 32s linear infinite reverse',
      },
    },
  },
  plugins: [],
}
