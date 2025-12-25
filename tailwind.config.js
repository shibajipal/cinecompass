import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "#faf4f3",
        background: "#190604",
        primary: "#aa2b1d",
        secondary: "#cc561e",
        accent: "#ef8d32",
      },
    },
  },
  plugins: [daisyui],
};
