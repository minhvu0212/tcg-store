/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./Scripts/**/*.{js,ts,jsx,tsx}",
    "./Styles/**/*.css"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        tcg: {
          bg: '#090B12',
          surface: '#111522',
          card: '#171C2B',
          cardHover: '#1E2438',
          border: '#282E40',
          borderLight: '#39415A',
          gold: {
            DEFAULT: '#D9B45B',
            light: '#E5C77A',
            dark: '#B3913E',
            glow: 'rgba(217, 180, 91, 0.25)',
          },
          purple: {
            DEFAULT: '#8957E5',
            light: '#A277EF',
            dark: '#6937C4',
            glow: 'rgba(137, 87, 229, 0.25)',
          },
          blue: {
            DEFAULT: '#438DFF',
            light: '#6BA5FF',
            dark: '#246FDF',
            glow: 'rgba(67, 141, 255, 0.25)',
          },
          text: {
            primary: '#F5F5F7',
            secondary: '#9CA3B5',
            muted: '#656D82',
          },
          emerald: '#10B981',
          rose: '#F43F5E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Cinzel', 'Outfit', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(217, 180, 91, 0.25)',
        'purple-glow': '0 0 25px rgba(137, 87, 229, 0.3)',
        'blue-glow': '0 0 25px rgba(67, 141, 255, 0.3)',
        'card': '0 8px 30px rgba(0, 0, 0, 0.45)',
        'card-hover': '0 14px 40px rgba(0, 0, 0, 0.65)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(137, 87, 229, 0.18), transparent 70%)',
        'gold-gradient': 'linear-gradient(135deg, #D9B45B 0%, #F5DE93 50%, #B3913E 100%)',
        'purple-gradient': 'linear-gradient(135deg, #8957E5 0%, #438DFF 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(23, 28, 43, 0.9) 0%, rgba(17, 21, 34, 0.95) 100%)',
      }
    },
  },
  plugins: [],
}
