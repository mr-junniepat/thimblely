# Tailwind CSS & TWRNC Setup

## Overview

The Thimblely project now uses **Tailwind CSS** for web and **TWRNC** (Tailwind React Native Classnames) for mobile, providing a unified styling approach across both platforms.

## What Was Implemented

### 1. Web Application (Next.js)

**Installed Packages:**

```bash
npm install -D tailwindcss postcss autoprefixer
```

**Configuration Files Created:**

- `apps/landing/tailwind.config.js` - Tailwind configuration with custom colors
- `apps/landing/postcss.config.js` - PostCSS configuration
- `apps/landing/src/app/global.css` - Updated with Tailwind directives

**Components Migrated:**

- ✅ Hero.tsx - Converted from CSS modules to Tailwind
- ✅ Features.tsx - Converted from CSS modules to Tailwind
- ✅ CTA.tsx - Converted from CSS modules to Tailwind
- ✅ Footer.tsx - Converted from CSS modules to Tailwind

**Removed Files:**

- All `.module.css` files (no longer needed)

### 2. Mobile Application (React Native/Expo)

**Installed Packages:**

```bash
npm install twrnc
```

**Configuration Files Created:**

- `apps/mobile/tailwind.config.js` - Tailwind configuration (for TWRNC)
- `apps/mobile/src/lib/tw.ts` - Custom TWRNC instance

**Components Migrated:**

- ✅ LandingScreen.tsx - Converted from StyleSheet to TWRNC
- ✅ HomeScreen.tsx - Converted from StyleSheet to TWRNC
- ✅ DetailsScreen.tsx - Converted from StyleSheet to TWRNC
- ✅ FeatureCard.tsx - Converted from StyleSheet to TWRNC
- ✅ ThimbleLogo.tsx - Converted from StyleSheet to TWRNC

### 3. Shared Library

**Created:**

- `libs/shared/src/lib/constants/colors.ts` - Centralized color palette

**Exported:**

```typescript
export const colors = {
  primary: '#7D2078',
  primaryDark: '#19051A',
  logoGold: '#FFD700',
  logoOrange: '#FFA500',
  // ... additional colors
};
```

## Color Palette

### Custom Tailwind Colors

Both web and mobile configurations include:

```javascript
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

### Usage Examples

**Web:**

```tsx
<div className="bg-primary text-white">
  <h1 className="text-logo-gold">Thimblely</h1>
</div>
```

**Mobile:**

```tsx
import tw from 'twrnc';

<View style={tw`bg-[#7D2078]`}>
  <Text style={tw`text-white text-2xl`}>Thimblely</Text>
</View>;
```

## Key Features

### ✅ Unified Styling

- Same utility classes across web and mobile
- Consistent spacing, colors, and design tokens
- Easier to maintain and scale

### ✅ No Gradients

- Following project requirements
- All backgrounds use solid colors
- Maintains consistent color coding

### ✅ Shared Color Constants

- Centralized in `@thimblely/shared`
- Can be imported across all apps
- TypeScript support for autocomplete

### ✅ Responsive Design (Web)

- Mobile-first approach
- Responsive breakpoints: `sm`, `md`, `lg`, `xl`
- Utility-first responsive classes

### ✅ Performance

- JIT (Just-In-Time) compilation
- Smaller bundle sizes
- Faster development with hot reload

## Development Workflow

### Web Development

```bash
# Start the web dev server
npm run dev:landing

# Open http://localhost:4200
```

### Mobile Development

```bash
# Start the mobile dev server
npm run dev:mobile

# Press 'a' for Android
# The app is already running!
```

## File Structure

```
thimblely/
├── apps/
│   ├── landing/
│   │   ├── tailwind.config.js          ← Tailwind config
│   │   ├── postcss.config.js           ← PostCSS config
│   │   └── src/
│   │       ├── app/
│   │       │   └── global.css          ← Tailwind directives
│   │       └── components/             ← Components use className
│   │
│   └── mobile/
│       ├── tailwind.config.js          ← Tailwind config (for TWRNC)
│       └── src/
│           ├── lib/
│           │   └── tw.ts               ← Custom TWRNC instance
│           ├── components/             ← Components use tw`...`
│           └── screens/                ← Screens use tw`...`
│
├── libs/
│   └── shared/
│       └── src/
│           └── lib/
│               └── constants/
│                   └── colors.ts       ← Shared colors
│
└── docs/
    ├── STYLING.md                      ← Styling guide
    └── TAILWIND_SETUP.md              ← This file
```

## Migration Checklist

When migrating components to Tailwind/TWRNC:

- [ ] Remove CSS module imports
- [ ] Convert class names to Tailwind utilities
- [ ] Update colors to use shared constants
- [ ] Remove `StyleSheet.create()` (mobile)
- [ ] Test component appearance
- [ ] Delete old CSS/StyleSheet files
- [ ] Verify no linting errors

## Benefits

### For Developers

- **Faster development** with utility classes
- **Better autocomplete** in VS Code
- **Consistent naming** across platforms
- **Less context switching** between files

### For the Project

- **Smaller codebase** (no separate CSS files)
- **Better maintainability**
- **Easier onboarding** for new developers
- **Design system enforcement**

## Next Steps

1. **Build the landing page:**

   ```bash
   npm run build:landing
   ```

2. **Test the mobile app:**

   - The Expo server is already running
   - Press `a` to open on Android
   - Hot reload is enabled

3. **Explore the documentation:**
   - See `docs/STYLING.md` for detailed usage guide
   - Check component examples

## Troubleshooting

### Issue: Styles not applying (mobile)

**Solution:** Make sure you're importing the custom tw instance:

```tsx
import tw from 'twrnc';
```

### Issue: Colors not working

**Solution:** Use hex values or custom color classes:

```tsx
// Custom colors
<div className="bg-[#7D2078]">

// Predefined colors
<div className="bg-primary">
```

### Issue: Build errors (web)

**Solution:** Ensure content paths are correct in `tailwind.config.js`:

```javascript
content: [
  './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
],
```

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TWRNC GitHub](https://github.com/jaredh159/tailwind-react-native-classnames)
- [Styling Guide](./STYLING.md)

## Summary

✨ **Both web and mobile apps now use Tailwind-based styling!**

- Web: Tailwind CSS for Next.js
- Mobile: TWRNC for React Native
- Shared: Centralized color constants
- Clean: All CSS modules removed
- Tested: No linting errors
- Documented: Comprehensive guides created

The mobile app is already running with the new landing screen. Press `a` in your terminal to view it on Android! 🚀
