const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'theme-blue': '#5515ef',
        'theme-blue-dark': '#3c01ca',
        'theme-pink': '#eb589e',
        'theme-yellow': '##e0f527',
        'light-blue': colors.sky,
        cyan: colors.cyan,
      },
      boxShadow: {
        'theme-1': '0 0 60px -15px rgba(0, 0, 0, 0.7)',
        'theme-2': '15px 0 35px -5px rgba(0, 0, 0, 0.5)',
      },
      fontSize: {
        '10xl': '10rem',
        '16xl': '16rem',
        '17xl': '17rem',
        '18xl': '18rem',
        '19xl': '19rem',
        '20xl': '20rem',
      },
      letterSpacing: {
        'more-wide': '1rem',
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      boxShadow: {
        'clay-card':
          'inset -10px -10px 20px hsl(302deg 25% 50% / 70%), inset 0 16px 32px hsl(302deg 25% 95%)',
        'clay-btn':
          '16px 16px 32px 0 hsl(277deg 50% 65% / 50%), inset -16px -16px 32px 0 hsl(277deg 50% 65%), inset 8px 8px 16px 0 hsl(227deg 65% 75% / 45%)',
      },
      dropShadow: {
        clay: '35px 35px 35px hsl(302deg 25% 50%)',
      },
      width: {
        120: '120%',
      },
      height: {
        120: '120%',
      },
      inset: {
        '-10': '-10%',
      },

      borderRadius: {
        100: '100%',
      },
      animation: {
        glow1: 'glow1 4s linear infinite',
        glow2: 'glow2 4s linear infinite',
        glow3: 'glow3 4s linear infinite',
        glow4: 'glow4 4s linear infinite',
      },
      keyframes: {
        glow1: {
          '0%': { transform: 'translate(10%, 10%) scale(1)' },
          '25%': { transform: 'translate(-10%, 10%) scale(1)' },
          '50%': { transform: 'translate(-10%, -10%) scale(1)' },
          '75%': { transform: 'translate(10%, -10%) scale(1)' },
          '100%': { transform: 'translate(10%, 10%) scale(1)' },
        },
        glow2: {
          '0%': { transform: 'translate(-10%, -10%) scale(1)' },
          '25%': { transform: 'translate(10%, -10%) scale(1)' },
          '50%': { transform: 'translate(10%, 10%) scale(1)' },
          '75%': { transform: 'translate(-10%, 10%) scale(1)' },
          '100%': { transform: 'translate(-10%, -10%) scale(1)' },
        },
        glow3: {
          '0%': { transform: 'translate(-10%, 10%) scale(1)' },
          '25%': { transform: 'translate(-10%, -10%) scale(1)' },
          '50%': { transform: 'translate(10%, -10%) scale(1)' },
          '75%': { transform: 'translate(10%, 10%) scale(1)' },
          '100%': { transform: 'translate(-10%, 10%) scale(1)' },
        },
        glow4: {
          '0%': { transform: 'translate(10%, -10%) scale(1)' },
          '25%': { transform: 'translate(10%, 10%) scale(1)' },
          '50%': { transform: 'translate(-10%, 10%) scale(1)' },
          '75%': { transform: 'translate(-10%, -10%) scale(1)' },
          '100%': { transform: 'translate(10%, -10%) scale(1)' },
        },
      },
      

      left: {
        flex: '2',
      },

      table: {
        width: '100%',
        textAlign: 'left',
        marginBottom: '50px',
      },

      row: {
        width: '80%',
        display: 'flex',
        justifyContent: 'space-between',
      },

      done: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },

      inProgress: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: 'inProgress 1s ease infinite alternate',
      },

     

      right: {
        flex: '1',
      },

      wrapper: {
        width: '90%',
        maxHeight: '300px',
        backgroundColor: '#333',
        color: 'white',
        padding: '10px 50px 50px 50px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      },

      totalTextTitle: {
        marginRight: '10px',
      },
      

      button: {
        backgroundColor: 'white',
        height: '30px',
        color: 'teal',
        fontBeight: 'bold',
        marginBop: '20px',
        cursor: 'not-allowed',
      },
    },
  },
  variants: {
    extend: {
      scale: ['active', 'group-hover'],
      rotate: ['group-hover'],
      inset: ['hover', 'group-hover'],
    },
  },
  plugins: [],
};
