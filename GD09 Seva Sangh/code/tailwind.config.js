// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//     },
//   },
//   plugins: [],
// };


// tailwind.config.js
// module.exports = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };


// module.exports = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//     "./app/**/*.{js,ts,jsx,tsx}",  // Add this if you're using the `app` directory in Next.js 13+
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       colors: {
//         primary: '#004d40',   // Dark Teal for branding
//         accent: '#00796b',    // Brighter teal accent color
//         background: '#f4f4f9', // Light grayish background
//       },
//       fontFamily: {
//         sans: ['Roboto', 'sans-serif'],
//         display: ['"Poppins"', 'sans-serif'],
//       },
//     },
//   },
//   plugins: [],
// };


// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',    // Scan all files in the pages folder
    './components/**/*.{js,ts,jsx,tsx}', // Scan all files in the components folder
  ],
  theme: {
    extend: {
      colors: {
        primary: '#004d40',   // Dark Teal for branding
        accent: '#00796b',    // Brighter teal accent color
        background: '#f4f4f9', // Light grayish background
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        display: ['"Poppins"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
