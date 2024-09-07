import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "3xl": " -85px 68px 0px 3px   rgb(65,75,67)",
        "4xl": "-30px 43px 0px 2px rgb(65, 75, 67) ",
      },
      // --tw-shadow: -30px 43px 0px 2px rgb(65, 75, 67);
      // --tw-shadow-colored: -97px 62px 4px -2px var(--tw-shadow-color);
      // box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    },
  },
  plugins: [],
};
export default config;
