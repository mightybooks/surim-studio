/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "p": {
              marginTop: "1em",
              marginBottom: "1em"
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
