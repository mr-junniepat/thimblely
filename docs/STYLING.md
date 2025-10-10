# Styling Guide

This document explains the styling approach used across the Thimblely project.

## Overview

We use **Tailwind CSS** for the web (Next.js) and **TWRNC** (Tailwind React Native Classnames) for mobile (React Native/Expo). This approach provides:

- **Consistent styling** across platforms
- **Unified color palette** and design tokens
- **Utility-first approach** for rapid development
- **No gradients** (as per project requirements)

## Web Styling (Next.js)

### Setup

The web application uses Tailwind CSS with PostCSS.

**Configuration Files:**

- `apps/landing/tailwind.config.js` - Tailwind configuration
- `apps/landing/postcss.config.js` - PostCSS configuration
- `apps/landing/src/app/global.css` - Global styles with Tailwind directives

### Usage

```tsx
// Example component using Tailwind CSS
export function Button() {
  return (
    <button className="px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors">
      Click me
    </button>
  );
}
```

### Custom Colors

```javascript
// tailwind.config.js
colors: {
  primary: {
    DEFAULT: '#7D2078',
    dark: '#19051A',
  },
  logo: {
    gold: '#FFD700',
    orange: '#FFA500',
  },
}
```

## Mobile Styling (React Native)

### Setup

The mobile application uses TWRNC (Tailwind React Native Classnames).

**Configuration Files:**

- `apps/mobile/tailwind.config.js` - Tailwind configuration (for TWRNC)
- `apps/mobile/src/lib/tw.ts` - Custom TWRNC instance

### Usage

```tsx
import tw from 'twrnc';

// Example component using TWRNC
export function Button() {
  return (
    <TouchableOpacity style={tw`px-8 py-4 bg-primary rounded-full`}>
      <Text style={tw`text-white text-base font-semibold`}>Click me</Text>
    </TouchableOpacity>
  );
}
```

### Using Custom Values

```tsx
// For custom values not in Tailwind config
<View style={tw.style(`bg-white rounded-xl`, {
  backgroundColor: customColor,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
})}>
```

## Color Palette

All colors are defined in `libs/shared/src/lib/constants/colors.ts` and can be used across both platforms.

### Primary Colors

| Color        | Hex       | Usage                         |
| ------------ | --------- | ----------------------------- |
| Primary      | `#7D2078` | Main brand color, backgrounds |
| Primary Dark | `#19051A` | Dark accents, buttons         |
| Logo Gold    | `#FFD700` | Logo, highlights              |
| Logo Orange  | `#FFA500` | Logo accents, dots            |

### Usage in Code

**Web (Next.js):**

```tsx
<div className="bg-primary text-white">
  <h1 className="text-logo-gold">Thimblely</h1>
</div>
```

**Mobile (React Native):**

```tsx
import { colors } from '@thimblely/shared';

<View style={tw`bg-[${colors.primary}]`}>
  <Text style={tw.style({ color: colors.logoGold })}>Thimblely</Text>
</View>;
```

## Best Practices

### 1. Use Utility Classes First

Prefer utility classes over custom styles:

```tsx
// ✅ Good
<div className="flex items-center gap-4 px-6 py-4 bg-white rounded-xl">

// ❌ Avoid
<div style={{ display: 'flex', alignItems: 'center', gap: '1rem', ... }}>
```

### 2. Consistent Spacing

Use Tailwind's spacing scale:

- `gap-{n}` for gaps between items
- `p-{n}` for padding
- `m-{n}` for margins
- Common values: `2, 4, 6, 8, 10, 12, 16, 20`

### 3. Responsive Design (Web)

Use responsive prefixes for web:

```tsx
<div className="text-base md:text-lg lg:text-xl">Responsive text</div>
```

### 4. No Gradients

As per project requirements, avoid using gradients:

```tsx
// ✅ Good - solid colors
<div className="bg-primary">

// ❌ Avoid - gradients
<div className="bg-gradient-to-r from-primary to-purple-500">
```

### 5. Color Coding

Maintain color consistency:

- **Primary Purple (#7D2078)** - Main brand, backgrounds
- **Dark Purple (#19051A)** - Dark mode, accents
- **Gold/Orange** - Logo and highlights only
- **Gray Scale** - Text and neutral elements

## Component Examples

### Button Component (Mobile)

```tsx
export function PrimaryButton({ onPress, children }) {
  return (
    <TouchableOpacity
      style={tw`bg-white py-3.5 px-4 rounded-full items-center`}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={tw`text-black text-base font-normal`}>{children}</Text>
    </TouchableOpacity>
  );
}
```

### Card Component (Web)

```tsx
export function Card({ children }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      {children}
    </div>
  );
}
```

## Troubleshooting

### Mobile: Styles not applying

Make sure you're importing from the custom tw instance:

```tsx
import tw from 'twrnc'; // ✅ Use this
```

### Web: Build errors

Ensure Tailwind is scanning the correct content paths in `tailwind.config.js`:

```javascript
content: [
  './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
],
```

### Hot reload not working

For mobile development, you may need to restart the Metro bundler:

```bash
npm run dev:mobile
```

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TWRNC Documentation](https://github.com/jaredh159/tailwind-react-native-classnames)
- [Lucide Icons](https://lucide.dev/) - Icon library used across both platforms

## Migration from CSS Modules

When migrating components from CSS Modules to Tailwind:

1. **Remove the CSS module import:**

   ```tsx
   // Remove this
   import styles from './Component.module.css';
   ```

2. **Convert class names to Tailwind utilities:**

   ```tsx
   // Before
   <div className={styles.container}>

   // After
   <div className="max-w-7xl mx-auto px-6">
   ```

3. **Delete the CSS module file**

4. **Test the component** to ensure styling is preserved
