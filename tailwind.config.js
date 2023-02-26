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
        purple: {
          100: "#635FC7",
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
        red: {
          100: "#EA5555",
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
      width: {
        70: pxToRem(280),
        75: pxToRem(300),
      },
      maxWidth: {
        48: pxToRem(192),
        120: pxToRem(480),
      },
      margin: {
        4.5: pxToRem(18),
        8.5: pxToRem(34),
        13.5: pxToRem(54),
        75: pxToRem(300),
      },
      padding: {
        4.5: pxToRem(18),
        5.5: pxToRem(22),
      },
      transitionProperty: {
        spacing: "margin",
      },
      boxShadow: {
        md: "0px 4px 6px rgba(54, 78, 126, 0.101545)",
        lg: "0px 10px 20px rgba(54, 78, 126, 0.25)",
      },
      backgroundImage: {
        "add-column-gradient-dark":
          "linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.125) 100%)",
        "add-column-gradient-light":
          "linear-gradient(180deg, #E9EFFA 0%, rgba(233, 239, 250, 0.5) 100%)",
      },
      content: {
        checkmark: 'url("/images/icon-check.svg")',
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
