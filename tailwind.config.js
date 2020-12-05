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
       'portal7': '#4D5858'
      }),
    textColor: theme => ({
      ...theme('colors'),
      'portal1': '#E81F76',
     }),
    width :{
      '379.25px': '379.25px',
      '291.26px': '291.26px'
    },
    height : {
      '607.81px' : '607.81px',
      '97.09px': '97.09px',
      '200px': '200px'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
