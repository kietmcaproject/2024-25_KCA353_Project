/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        dark: '#141F2E',
        medium:'#FF9900'
      }
    },
  },
  plugins: [],
}