/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0e27',
        surface: '#1a1f3a',
        primary: '#4f46e5',
        accent: '#06b6d4',
        danger: '#ef4444',
        success: '#10b981',
      },
    },
  },
  plugins: [],
}
