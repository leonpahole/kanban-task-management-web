const { fontFamily } = require("tailwindcss/defaultTheme");

const pxToRem = (px) => {
  return `${px / 16}rem`;
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        purple: "#635FC7",
        purple: {
          hover: "#A8A4FF",
        },
        black: "#000112",
        white: "#FFFFFF",
        gray: {
          "very-dark": "#20212C",
          dark: "#2B2C37",
          medium: "#828FA3",
          light: "#F4F7FD",
        },
        lines: {
          dark: "#3E3F4E",
          light: "#E4EBFA",
        },
        red: "#EA5555",
        red: {
          hover: "#FF9898",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)", ...fontFamily.sans],
      },
      fontSize: {
        hxl: [
          pxToRem(24),
          {
            lineHeight: pxToRem(39),
            fontWeight: "700",
          },
        ],
        hl: [
          pxToRem(18),
          {
            lineHeight: pxToRem(23),
            fontWeight: "700",
          },
        ],
        hm: [
          pxToRem(15),
          {
            lineHeight: pxToRem(19),
            fontWeight: "700",
          },
        ],
        hs: [
          pxToRem(12),
          {
            lineHeight: pxToRem(15),
            letterSpacing: "2.4px",
            fontWeight: "700",
          },
        ],
        bl: [
          pxToRem(13),
          {
            lineHeight: pxToRem(23),
            fontWeight: "500",
          },
        ],
        bm: [
          pxToRem(12),
          {
            lineHeight: pxToRem(15),
            fontWeight: "500",
          },
        ],
      },
    },
  },
  plugins: [],
};
