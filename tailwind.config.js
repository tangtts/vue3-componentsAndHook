const colors = require("tailwindcss/colors");
module.exports = {
  darkMode: "class",
  // theme: {
  //   extend: {
  //     colors,
  //     lightBlue:{}
  //   },
  // },
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
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
