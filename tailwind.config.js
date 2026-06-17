/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        tea: {
          50: '#fdf8f0',
          100: '#f5ebe0',
          200: '#ede0d4',
          300: '#d4a574',
          400: '#c09050',
          500: '#a67b3d',
          600: '#8B6914',
          700: '#6b5010',
          800: '#4a370b',
          900: '#2c2c2c',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'serif'],
        sans: ['"Noto Sans SC"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
