/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: '#FFE4E1',
        champagne: '#F5E6D3',
        lavender: '#E6E0F0',
        rosegold: '#B76E79',
        charcoal: '#2D2A26',
        glass: 'rgba(255, 255, 255, 0.18)',
        glassborder: 'rgba(255, 255, 255, 0.35)',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        glass: '20px',
      },
    },
  },
  plugins: [],
}
