/** Design tokens live here: colours, fonts, radii. */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 950: "#08162B", 900: "#0B1F3A", 800: "#12305A", 700: "#1D4373" },
        teal: { DEFAULT: "#0F766E", bright: "#2DD4BF", soft: "#E3F5F2" },
        paper: "#FBF9F5",
        line: "#E4E0D6",
        muted: "#4B5568",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: { card: "14px" },
      maxWidth: { page: "1180px" },
    },
  },
  plugins: [],
};
