module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    borderColors: theme => ({
      ...theme('colors'),
      DEFAULT: '#EFEFEF',
    }),
    divideColor: theme => ({
      ...theme('borderColors'),
      'dark': '#898989',
    }),
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0px 3px 6px 0 rgb(0 0 0 / 1%), 0 1px 2px 0 rgb(0 0 0 / 6%)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
    },
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
