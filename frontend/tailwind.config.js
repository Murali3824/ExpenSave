/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/@shadcn/ui/**/*.{js,jsx,ts,tsx}" // Ensure Shadcn UI is included
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}