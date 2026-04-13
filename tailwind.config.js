/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lotr: {
          black: "#000000",
          "green-dark": "#2b2f22",
          "green-mid": "#3c422f",
          "green-soft": "#4a4d35",
          "stone": "#5e614d",
          gold: {
            DEFAULT: "#D4AF37", 
            light: "#F9E076",
            dark: "#AA8239"
          }
        }
      },
       backgroundImage: {
      'lotr-map': "url('/middle-earth-map.jpeg')",
    }
    },
  },
  plugins: [],
}