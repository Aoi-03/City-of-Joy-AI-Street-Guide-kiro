/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yellow-taxi': '#fcdb03',
        'terracotta-red': '#c65d07',
        'vintage-off-white': '#faf7f0',
        // Kolkata theme colors
        kolkata: {
          'yellow': '#fcdb03',
          'red': '#c65d07', 
          'white': '#faf7f0',
        }
      },
      fontFamily: {
        'bengali': ['Noto Sans Bengali', 'sans-serif'],
      },
    },
  },
  plugins: [],
}