
module.exports = {
  
  theme: {
    extend: {
      animation: {
        'gradient-text': 'gradient-text 5s ease infinite',
        'gentle-float': 'gentle-float 12s ease-in-out infinite',
        'particle-float': 'particle-float 10s linear infinite',
      },
      keyframes: {
        'gradient-text': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'gentle-float': {
            '0%, 100%': {
                transform: 'translateY(0) scale(1)',
            },
            '50%': {
                transform: 'translateY(-25px) scale(1.05)',
            },
        },
        'particle-float': {
          '0%': {
            transform: 'translateY(0)',
            opacity: '1'
          },
          '100%': {
            transform: 'translateY(-150px)',
            opacity: '0'
          }
        }
      },
    },
  },
  plugins: [],
};