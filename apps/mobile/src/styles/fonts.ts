/**
 * Font Styles
 *
 * Centralized font configuration using Satoshi Variable font
 */

export const FONTS = {
  regular: {
    fontFamily: 'Satoshi',
    fontWeight: '400' as const,
  },
  medium: {
    fontFamily: 'Satoshi',
    fontWeight: '500' as const,
  },
  semibold: {
    fontFamily: 'Satoshi',
    fontWeight: '600' as const,
  },
  bold: {
    fontFamily: 'Satoshi',
    fontWeight: '700' as const,
  },
  black: {
    fontFamily: 'Satoshi',
    fontWeight: '900' as const,
  },
} as const;

// Helper function to get font style
export const getFontStyle = (weight: keyof typeof FONTS = 'regular') => {
  return FONTS[weight];
};
