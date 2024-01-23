/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      ssm: '305px',
      st: '370px',
      sm: '558px',
      mi: '700px',
      md: '891px',
      lg: '976px',
      lx: '1175px',
      xl: '1440px',
    },
    extend: { 
      colors:{
        purpleSubColor: '#201E78',
        greyMainBackground: '#F4F7FC',
        greyText : '#ABABAB',
        blackText: '#252525',       
      },
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
}

