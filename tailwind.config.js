
const colors = require("tailwindcss/colors")
module.exports = {
  darkMode:"class",
  content: [],
  theme: {
    colors,
    extend: {
      zIndex:{
        "3000":3000
      }
    },
  },
  variants: {
    extend: {
      backgroundColor:["dark"],
      textColor:["visited"]
    },
  },
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [
  ],
}
