/** @type {import('tailwindcss').Config} */

const { colors: defaultColors } = require('tailwindcss/defaultTheme')


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js", "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  darkMode: true,
  theme: {
    extend: {
      colors: {
        'primary':'#55CCC2',
        'secondary': '#46F3D6',
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}
