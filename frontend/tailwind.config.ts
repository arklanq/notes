import type { Config } from 'tailwindcss';
import defaultColors from 'tailwindcss/colors';

const config = {
  plugins: [],
  content: {
    relative: true,
    files: [
      './src/app/**/*.{ts,tsx}',
      './src/components/**/*.{ts,tsx}',
    ]
  },
  darkMode: 'class',
  theme: {
    screens: {
      // xs: '0px' // smartphones
      sm: '480px', // small tablets
      md: '768px', // large tablets
      lg: '1280px', // laptops
      xl: '1920px' // desktop
    },
    container: {
      center: true
    },
    fontFamily: {
      // display: 'var(--display-font)',
      body: 'var(--body-font)'
    },
    colors: {
      // base
      inherit: defaultColors.inherit,
      current: defaultColors.current,
      transparent: defaultColors.transparent,
      black: defaultColors.black,
      white: defaultColors.white,
      // borders, outlines, dimmed areas
      slate: defaultColors.slate,
      // disabled elements, complementary typography
      neutral: defaultColors.neutral,
      // primary color (10%)
      primary: defaultColors.violet,
      // secondary color (30%)
      secondary: defaultColors.indigo,
      // supporting colors
      support: {
        // annoucements, form states
        success: defaultColors.green,
        // warnings
        warning: defaultColors.amber,
        // errors, destructive actions, form states
        error: defaultColors.rose,
        // alerts, updates
        info: defaultColors.sky
      }
    }
  }
} satisfies Config;

export default config;
