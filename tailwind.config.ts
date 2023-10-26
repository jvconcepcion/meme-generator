import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  purge: {
    safelist: ['toolbar-items', 'default-color-tile'],
  },
  theme: {
    container: {
      padding: {
        DEFAULT: '15px',
      },
    },
    screens: {
      xs: '390px',
      sm: '640px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px',
      fhd: '1800px',
    },
    fontFamily: {
      poppins: [`var(--font-poppins)`, 'sans-serif'],
      sora: [`var(--font-sora)`, 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#131424',
        secondary: '#393A47',
        accent: '#F13024',
        ash: '#212121',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite',
      },
      fontFamily: {
        poppins: [`var(--font-poppins)`, 'sans-serif'],
        sora: [`var(--font-sora)`, 'sans-serif'],
      },
    },
  },
  container: {
    padding: {
      DEFAULT: '15px',
    },
  },
  plugins: [
    require('postcss-nested'),
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('@tailwindcss/forms'),
  ],
}
export default config
