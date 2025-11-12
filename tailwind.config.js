/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Author', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#e8eef5',
          100: '#d1dde9',
          200: '#a3bbd4',
          300: '#7599be',
          400: '#4777a9',
          500: '#041e42', // Main navy blue
          600: '#031833',
          700: '#03132a', // Deep navy
          800: '#020d1e',
          900: '#010812', // Darkest navy
        },
        accent: {
          50: '#ffffff',
          100: '#f5f5f5',
          200: '#e8e8e8',
          300: '#d1d1d1',
          400: '#bababa',
          500: '#a3a3a3',
          600: '#8c8c8c',
          700: '#757575',
          800: '#5e5e5e',
          900: '#474747',
        },
        dark: {
          50: '#f5f5f5', // Light gray
          100: '#e8e8e8',
          200: '#d1d1d1',
          300: '#bababa',
          400: '#a3a3a3',
          500: '#8c8c8c',
          600: '#757575',
          700: '#5e5e5e',
          800: '#03132a', // Deep navy
          900: '#010812', // Darkest navy/black
        },
        orange: '#ff4e00',
        purple: '#3b0270',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #ff4e00 0%, #3b0270 100%)',
        'gradient-accent': 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
        'gradient-cool': 'linear-gradient(135deg, #7599be 0%, #041e42 100%)',
        'gradient-warm': 'linear-gradient(135deg, #e8eef5 0%, #a3bbd4 100%)',
        'gradient-dark': 'linear-gradient(135deg, #03132a 0%, #010812 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(117, 153, 190, 0.4)',
        'glow-accent': '0 0 20px rgba(255, 255, 255, 0.3)',
      },
    },
  },
  plugins: [],
}
