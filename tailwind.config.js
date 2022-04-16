module.exports = {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Open Sans']
      },
      colors: {
        primary: '#0d9677',
        secondary: '#00d1b2',
        third: '#be465c',
        fourth: '#27a5cd',
        dark: 'black',
        light: '#ffffff',
        background: '#f6f6f6',
        danger: '#e63755',
        warning: '#ED8C1A',
        success: '#0d9677',
      },
    },
  },
  plugins: [],
}
