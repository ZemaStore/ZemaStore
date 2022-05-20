module.exports = {
  theme: {
    extend: {
      transitionDuration: {
        0: "0ms",
        2000: "2000ms",
        3000: "3000ms",
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        loader: "loader 0.6s infinite alternate",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        loader: {
          to: {
            opacity: 0.7,
            transform: "translate3d(0, -0.5rem, 0)",
          },
        },
      },
    },
  },
  plugins: [],
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./public/index.html",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./common/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
};
