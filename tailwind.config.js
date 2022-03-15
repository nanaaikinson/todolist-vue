// eslint-disable-next-line no-undef
const plugin = require("tailwindcss/plugin");

/* eslint-disable no-undef */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#8595d5",
          DEFAULT: "#677ACB",
          dark: "#5262a2",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase(require("./plugins/typography"));
    }),
    require("kutty"),
    require("tailwind-bootstrap-grid")(),
  ],
  corePlugins: {
    container: false,
  },
};
