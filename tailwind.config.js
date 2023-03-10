const colors = require("tailwindcss/colors");
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    container: {
      padding: "2rem",
    },
  },
  plugins: [
    // 会出现覆盖的问题
    function ({ addBase }) {
      addBase({
        ".el-button": {
          "background-color": "var(--el-button-bg-color,val(--el-color-white))",
        },
      });
    },
  ],
};
