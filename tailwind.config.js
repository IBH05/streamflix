/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      colors: {
        brand: '#e50914',
        primary: '#e50914',
        'primary-hover': '#f40612',
        ink: '#0e0e0e',
        surface: '#0e0e0e',
        'surface-low': '#151515',
        'surface-card': '#1b1b1b',
        'surface-highlight': '#282828',
        accent: '#46d369',
      },
      boxShadow: {
        glow: '0 0 36px rgba(229, 9, 20, 0.22)',
      },
    },
  },
  plugins: [],
};
