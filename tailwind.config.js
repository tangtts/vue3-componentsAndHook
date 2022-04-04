module.exports = {
  content: [],
  theme: {
    extend: {
      zIndex:{
        "3000":3000
      }
    },
  },
  variants: {
    extend: {},
  },
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [],
}
