/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    corePlugins: {
      container: false,
    },
    extend: {
      fontFamily: {
        inter: ["Inter", ...defaultTheme.fontFamily.sans],
        formula: ["PP Formula", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        displayL: ["57px", { lineHeight: "64px" }],
        displayM: ["45px", { lineHeight: "52px" }],
        displayS: ["36px", { lineHeight: "44px" }],
        heading1: ["32px", { lineHeight: "40px" }],
        heading2: ["24px", { lineHeight: "32px" }],
        heading3: ["20px", { lineHeight: "28px" }],
        heading4: ["18px", { lineHeight: "24px" }],
        heading5: ["16px", { lineHeight: "22px" }],
        heading6: ["14px", { lineHeight: "20px" }],
        bodyL: ["16px", { lineHeight: "24px" }],
        bodyM: ["14px", { lineHeight: "20px" }],
        bodyS: ["12px", { lineHeight: "18px" }],
        caption: ["12px", { lineHeight: "16px" }],
        overline: ["10px", { lineHeight: "12px" }],
      },
    },
    colors: {
      gray: {
        50: "#E8E8E8",
        100: "#D1D1D1",
        200: "#BABABA",
        300: "#A3A3A3",
        400: "#8C8C8C",
        500: "#757575",
        600: "#5E5E5E",
        700: "#474747",
        800: "#303030",
        850: "#282828",
        900: "#202020",
        950: "#181818",
        1000: "#101010",
        1050: "#080808",
        1100: "#030909",
      },
      white: "#FFFFFF",
      brand: "#19B17B",
      green: {
        50: "#A0E8CF",
        100: "#85D9B8",
        200: "#15C176",
        300: "#239758",
        400: "#355A3F",
        500: "#12341C",
      },
      error: "#F52449",
    },
    screens: {
      mobile: "375px",
      tablet: "767px",
      laptop: "1024px",
      desktop: "1920px",
    },
  },
  plugins: [],
};
