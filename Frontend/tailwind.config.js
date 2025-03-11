/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app.jsx",
    "./node_modules/@ionic/react/**/*.js"
  ],
  theme: {
    extend: {
      screens: {
        tablet: "40rem",  // 640px
        laptop: "64rem",  // 1024px
        desktop: "80rem", // 1280px
      },
      fontFamily: {
        'custom': ['Formiga-Medium', 'serif'], 
        'header': ['Tropical Organic Demo'], 
       },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        ":root": {
          "--breakpoint-initial": "initial",
          "--breakpoint-tablet": "40rem",
          "--breakpoint-laptop": "64rem",
          "--breakpoint-desktop": "80rem",
        },
      });
    },
  ],
};
