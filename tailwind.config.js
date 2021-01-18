module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    maxHeight: {
      '90p': '90vh',
      '150px': '150px',
    },
    minHeight: {
      '500': '500px',
    },
    extend: {
      fontFamily: {
        // Shown in the SocialBar component as font-open-sans
        'karla': '"Karla", sans-serif',
        'lato': '"Lato", sans-serif'
      },
      lineHeight: {
        'extra-loose': '2.5',
        '12': '3.5rem',
      }
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
      'portal7': '#4D5858',
      'portal8': '#F13347',
      'portal9': '#C8C376',
      'portal10': '#468A6F',
      'portal11': '#966473',
      'portal12': '#FF5100',
      'tertiary': '#C2A6E1',
      'tertiaryHover': '#C2A6E1CC',
    }),
    textColor: theme => ({
      ...theme('colors'),
      'portal1': '#E81F76',
      'portal2': '#FF6B00',
      'portal3': '#C2A6E1',
      'portal4': '#18988B',
      'portal5': '#FFFFFFDE',
    }),
    width :{
      '379.25px': '379.25px',
      '291.26px': '291.26px',
      '545px': '545px',
      '1/2' : '50%',
      '1/3' : '33.333333%',
      '1/4' : '25%',
      'full': '100%',
      '1/5' : '20%',
      '1/6' : '16.666667%',
      '1/9' : '11.111111%',
      '1/12' : '8.333333%'

    },
    height : {
      '607.81px' : '607.81px',
      '97.09px': '97.09px',
      '200px': '200px',
      '72px': '72px',
      '1/2' : '50%',
      '1/3' : '33.333333%',
      '1/4' : '25%',
      'full': '100%',
      '24' : '24px',
      '1/5' : '20%',
      '37' : '37px'
    },
    borderColor: theme => ({
      ...theme('colors'),
      DEFAULT: theme('colors.gray.300', 'currentColor'),
      'primary': '#3490dc',
      'secondary': '#ffed4a',
      'danger': '#e3342f',
      'portal1': '#FF5100'
    })
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
