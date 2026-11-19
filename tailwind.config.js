/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        workspace: {
          bg: '#0C0F0E',
          surface: '#141918',
          panel: '#181D1B',
          card: '#1B221F',
          border: '#292F2D',
          borderLight: '#38423F',
          text: '#E7ECE9',
          muted: '#929D97',
          dim: '#5E6964',
          accent: '#3DD68C', // muted terminal lime/green
          accentHover: '#4ADE80',
          accentDim: '#215A3E',
          accentGlow: 'rgba(61, 214, 140, 0.15)',
          blueGrey: '#64748B',
          blueGreyLight: '#94A3B8',
          tabActive: '#181D1B',
          tabInactive: '#111514',
          gutter: '#111514',
          gutterText: '#4D5853',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 0.9, transform: 'scale(1)' },
          '50%': { opacity: 0.6, transform: 'scale(0.98)' },
        }
      }
    },
  },
  plugins: [],
}

