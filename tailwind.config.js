/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular'],
      },
      colors: {
        ink: '#111827',
        copper: '#b45309',
        amberlite: '#fef3c7',
        ion: '#14b8a6',
        volt: '#2563eb',
        plasma: '#f97316',
        graphite: '#1f2937',
      },
      boxShadow: {
        soft: '0 24px 70px rgba(17, 24, 39, 0.11)',
        glow: '0 0 60px rgba(20, 184, 166, 0.25)',
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        trace: 'trace 5s linear infinite',
        pulseSoft: 'pulseSoft 2.8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        trace: {
          '0%': { strokeDashoffset: '220' },
          '100%': { strokeDashoffset: '0' },
        },
        pulseSoft: {
          '0%,100%': { opacity: '.58' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
