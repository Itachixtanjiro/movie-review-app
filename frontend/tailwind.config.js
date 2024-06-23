/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#141E46",
        secondary:"#FFF5E0",
      }
    },
  },
  plugins: [],
    corePlugins:{
  
      preflight: false, 
    }
}
