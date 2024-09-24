/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    '.node_modules/preline/dist/*.js',
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          "0%": { opacity: 0, transform: "translateX(100%)" },
          "100%": { opacity: 1, transform: "translateX(0)" }
        }
      },
      animation: {
        slideIn: "slideIn .25s ease-in-out forwards var(--delay, 0)"
      }
    },
  },
  plugins: [
    require('preline/plugin'),
    require('flowbite/plugin'),
  ],
  googlefonts : [
    "Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900,900italic",
    "Roboto+Mono:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic"
],
}

