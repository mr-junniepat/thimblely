/**
 * Thimblely Color Palette
 * Maintains consistent color coding across all platforms
 */

export const colors = {
  // Primary Brand Colors
  primary: '#7D2078',
  primaryDark: '#19051A',
  primaryLight: '#9D4098',

  // Logo Colors
  logoGold: '#FFD700',
  logoOrange: '#FFA500',

  // UI Colors
  white: '#FFFFFF',
  black: '#111113',

  // Sign Up Flow Colors
  complimentary: '#A30552',
  complimentaryDark: '#56062D',
  greyText: '#68666F',
  lightPink: '#FFF0F7',
  purple: '#6B2374',
  mutedGrey: '#7F7F7F',
  textGrey: '#5E5656',
  lightGrey: '#9F9DA0',

  // Functional Colors
  text: {
    primary: '#FFFFFF',
    secondary: '#111113',
    muted: '#68666F',
  },

  // Background Colors
  background: {
    primary: '#7D2078',
    dark: '#19051A',
    light: '#F9FAFB',
    white: '#FFFFFF',
  },

  // Button Colors
  button: {
    primary: '#FFFFFF',
    secondary: '#19051A',
    text: {
      primary: '#000000',
      secondary: '#FFFFFF',
    },
  },

  // Gradients (for mobile: LinearGradient colors array)
  gradients: {
    primary: ['#430055', '#A10653'], // 170deg gradient
    logo: ['#FFD700', '#FFA500', '#FFD700'],
    hero: ['#430055', '#A10653'],
    cta: ['#A30552', '#56062D', '#A30552'], // Sign up CTA button
  },
} as const;

export type Colors = typeof colors;
