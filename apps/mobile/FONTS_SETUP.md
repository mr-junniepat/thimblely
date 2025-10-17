# Satoshi Font Setup

The app is configured to use the **Satoshi Variable** font family.

## 📥 Download Font

1. Go to [Fontshare - Satoshi](https://www.fontshare.com/fonts/satoshi)
2. Click "Download font" (free for personal and commercial use)
3. Extract the downloaded ZIP file

## 📂 Install Font

Copy the font file to the mobile app:

```bash
# From the extracted font folder, copy:
cp Satoshi-Variable.ttf apps/mobile/assets/fonts/
```

Or manually:

1. Locate `Satoshi-Variable.ttf` in the downloaded files
2. Copy it to `apps/mobile/assets/fonts/Satoshi-Variable.ttf`

## ✅ Verify Installation

The font file should be at:

```
apps/mobile/assets/fonts/Satoshi-Variable.ttf
```

## 🎨 Usage in Code

The font is automatically loaded in `App.tsx` and available throughout the app.

### Using the Font Helper

```typescript
import { FONTS } from '../styles/fonts';

// In StyleSheet
const styles = StyleSheet.create({
  title: {
    ...FONTS.bold,
    fontSize: 24,
  },
  body: {
    ...FONTS.regular,
    fontSize: 16,
  },
});

// Or inline
<Text style={{ ...FONTS.semibold, fontSize: 18 }}>Hello Thimblely</Text>;
```

### Available Font Weights

- `FONTS.regular` - 400 weight
- `FONTS.medium` - 500 weight
- `FONTS.semibold` - 600 weight
- `FONTS.bold` - 700 weight
- `FONTS.black` - 900 weight

## 🔄 Alternative: Individual Font Files

If you prefer individual font files instead of variable font:

1. Copy these files to `assets/fonts/`:

   - Satoshi-Light.ttf
   - Satoshi-Regular.ttf
   - Satoshi-Medium.ttf
   - Satoshi-Bold.ttf
   - Satoshi-Black.ttf

2. Update `App.tsx`:

```typescript
const [fontsLoaded] = useFonts({
  'Satoshi-Light': require('../assets/fonts/Satoshi-Light.ttf'),
  'Satoshi-Regular': require('../assets/fonts/Satoshi-Regular.ttf'),
  'Satoshi-Medium': require('../assets/fonts/Satoshi-Medium.ttf'),
  'Satoshi-Bold': require('../assets/fonts/Satoshi-Bold.ttf'),
  'Satoshi-Black': require('../assets/fonts/Satoshi-Black.ttf'),
});
```

3. Update `styles/fonts.ts`:

```typescript
export const FONTS = {
  regular: { fontFamily: 'Satoshi-Regular' },
  medium: { fontFamily: 'Satoshi-Medium' },
  // ... etc
};
```

## 🚫 Fallback

If the font file is not found, the app will use the system default font and continue to work normally.

## 📱 After Adding Font

1. Install the new dependency:

```bash
npm install
```

2. Restart the app:

```bash
npx expo start --clear
```

The font will be loaded automatically!
