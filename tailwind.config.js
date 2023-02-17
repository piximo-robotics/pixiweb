/** @type {import('tailwindcss').Config} */

const { colors: defaultColors } = require('tailwindcss/defaultTheme')


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: true,
  theme: {
    extend: {
      colors: {
        'primary':'#2D328C',
        'secondary': '#46F3D6',
      }
    },
  },
  plugins: [],
}
