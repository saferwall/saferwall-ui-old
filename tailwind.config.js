module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Open Sans']
      },
      colors: {
        primary: '#00d1b2',
        secondary: '#0d9677',
        third: '#be465c',
        fourth: '#27a5cd',
        light: '#ffffff',
        gray: '#898989',
        background: '#f6f6f6',
        danger: '#be465c',
      },
      borderColors: theme => ({
        ...theme('colors'),
        DEFAULT: '#EFEFEF',
      }),
      minHeight: {
        '0': '0',
        '1/4': '25vh',
        '1/2': '50vh',
        '3/5': '60vh',
        '7/10': '70vh',
        '4/5': '80vh',
        '3/4': '75vh',
        'full': '100vh'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
