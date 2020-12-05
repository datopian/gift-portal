module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        // Shown in the SocialBar component as font-open-sans
        'karla': '"Karla", sans-serif',
        'lato': '"Lato", sans-serif'
      },
    },
    backgroundColor: theme => ({
       ...theme('colors'),
       'primary': '#3490dc',
       'secondary': '#ffed4a',
       'danger': '#e3342f',
       'portal1': '#FF5100',
       'portal2': '#E81F76',
       'portal3': '#BADF93',
       'portal4': '#18988B',
       'portal5': '#7C6990',
       'portal6': '#FFFFFF',
      }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
