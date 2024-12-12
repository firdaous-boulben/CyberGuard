/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        archivo: ['"Archivo"', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        customGray: '#1E1E1E',
        customBlue: '#54F4FC',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #04121c, #0b2124)',
      },
    },
  },
  plugins: [],
}

