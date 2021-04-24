module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height',
        'width': 'width',
        'maxHeight': 'max-height',
        'maxWidth': 'max-width',
        'spacing': 'margin, padding',
      },
      fontFamily: {
        noEmoji: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif'
        ]
      },
      width: {
        '1/7': '14.2857143%',
        '3/10': '30%',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
