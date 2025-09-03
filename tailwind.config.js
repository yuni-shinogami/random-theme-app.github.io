/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.html"
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px', // iPhone SE対応
      },
      spacing: {
        '18': '4.5rem', // タップしやすいボタンサイズ用
      }
    },
  },
  plugins: [],
}
