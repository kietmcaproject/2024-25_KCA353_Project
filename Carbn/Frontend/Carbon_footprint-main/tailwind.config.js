/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    
        boxShadow:   {  'custom-inner': 'inset 0 2px 4px rgba(0, 0, 0, 0.1)', // Ensure 'inner' is available
        }
    },
  },
  plugins: [],
}