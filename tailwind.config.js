import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Karla', 'sans-serif'],
      },
      colors: {
        green: "#2EB063",
        pink: "#CB599B",
        blue: "#4773C9",
        yellow: "#FDC300",
        orange: "#FE7445",
      },
      animation: {
        slideDown: 'slideDown 0.3s ease-out',
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#4773C9",
              foreground: "#ffffff",
            },
            secondary: {
              DEFAULT: "#2EB063",
              foreground: "#ffffff",
            },
            success: {
              DEFAULT: "#2EB063",
              foreground: "#ffffff",
            },
            warning: {
              DEFAULT: "#FDC300",
              foreground: "#000000",
            },
            danger: {
              DEFAULT: "#FE7445",
              foreground: "#ffffff",
            },
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#4773C9",
              foreground: "#ffffff",
            },
            secondary: {
              DEFAULT: "#2EB063",
              foreground: "#ffffff",
            },
            success: {
              DEFAULT: "#2EB063",
              foreground: "#ffffff",
            },
            warning: {
              DEFAULT: "#FDC300",
              foreground: "#000000",
            },
            danger: {
              DEFAULT: "#FE7445",
              foreground: "#ffffff",
            },
          },
        },
      },
    }),
  ],
}
