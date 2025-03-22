/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Your theme extensions here
    },
    screens: {
      below: { max: '450px' }, // For screens smaller than 450px
      between: { min: '450px', max: '640px' }, // For screens between 450px and 640px
    },


  },
  plugins: [
    // Your plugins here
  ],
};