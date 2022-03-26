module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      sm: "489px",
      md: "768px",
    },
    colors: {
      dark: "#2b2d42",
      light: "#edf2f4",
      blue: "#1982c4",
      red: "#ff595e",
      green: "#8ac926",
      blueo: "rgba(25, 130, 196, .25)",
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      fontSize: {
        title: "20px",
        subtitle: "18px",
        paragraph: "16px",
      },
    },
  },
  plugins: [],
};
