/** @type {import('tailwindcss').Config} */
const config = {
  // 1. Path ke semua file yang mengandung nama class Tailwind
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // 2. Tempat untuk mendefinisikan atau memperluas design system
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  // 3. Tempat untuk menambahkan plugin Tailwind
  plugins: [],
};
export default config;