 /** @type {import('tailwindcss').Config} */
 module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        'custom-bottom-left': '0 0 0 50%',
        'custom-card-left': '8% 8% 8% 50%',
        'custom-card-top-right-and-left': '8% 8% 0% 0%',
      },
      colors: {
        primary: "#06AB78",
        base:{
         100: "#30313D",
        },
        secondary: {
          100: "#1cac78",
          200: "#00a877",
        },
        content:"#FFFFFF",
        background: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
      
    },
  },
  plugins: [
  ],
};