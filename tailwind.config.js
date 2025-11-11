module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0f14",
        fog: "#e8f1ff",
        primary: "#8bd0ff",
        accent: "#8b7bff",
        slate: "#9fb0c2"
      },
      backgroundImage: {
        grain: "url(/grain.png)",
        mist: "url(/mist.png)"
      },
      animation: {
        'pulse-fast': 'pulse 0.67s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-fast': 'ping 0.67s cubic-bezier(0, 0, 0.2, 1) infinite'
      }
    }
  },
  plugins: []
};
