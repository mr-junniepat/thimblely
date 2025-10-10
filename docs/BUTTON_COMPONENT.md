# Button Component Documentation

## Overview

A reusable Button component for the Thimblely mobile app with support for multiple variants and the Outfit font family.

## Installation

The component uses:

- **Outfit font** from Google Fonts
- **TWRNC** for styling
- **LinearGradient** for gradient buttons

Dependencies are already installed:

```bash
npm install @expo-google-fonts/outfit expo-font
```

## Usage

```tsx
import { Button } from '../components/Button';

// Primary button (white background, black text)
<Button variant="primary" onPress={handleLogin}>
  Log in
</Button>

// Secondary button (dark background, white text)
<Button variant="secondary" onPress={handleSignUp}>
  Sign up
</Button>

// Gradient button (gold gradient, dark text)
<Button variant="gradient" onPress={handleAction}>
  Get Started
</Button>
```

## Props

| Prop        | Type                                     | Default      | Description                             |
| ----------- | ---------------------------------------- | ------------ | --------------------------------------- |
| `onPress`   | `() => void`                             | **Required** | Function to call when button is pressed |
| `variant`   | `'primary' \| 'secondary' \| 'gradient'` | `'primary'`  | Button style variant                    |
| `children`  | `string`                                 | **Required** | Button label text                       |
| `style`     | `ViewStyle`                              | `undefined`  | Custom style for button container       |
| `textStyle` | `TextStyle`                              | `undefined`  | Custom style for button text            |

## Variants

### Primary

- **Background:** White
- **Text Color:** Black
- **Font:** Outfit Regular
- **Use Case:** Primary action (Login)

### Secondary

- **Background:** Dark (#19051A)
- **Text Color:** White
- **Border:** 2px white with 20% opacity
- **Font:** Outfit Regular
- **Use Case:** Secondary action (Sign up)

### Gradient

- **Background:** Gold gradient (#FFD700 → #FFA500 → #FFD700)
- **Text Color:** Dark (#19051A)
- **Shadow:** Elevated
- **Font:** Outfit Regular
- **Use Case:** Call-to-action buttons

## Styling

All buttons include:

- **Border Radius:** 50px (fully rounded)
- **Padding:** 14px vertical, 16px horizontal
- **Font Size:** 16px
- **Font Family:** Outfit Regular (400)
- **Active Opacity:** 0.8 (on press)

## Font Integration

The Outfit font is loaded in `App.tsx`:

```tsx
import {
  useFonts,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
} from '@expo-google-fonts/outfit';

const [fontsLoaded] = useFonts({
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
});
```

## Examples

### Landing Screen Buttons

```tsx
export function LandingScreen({ navigation }: LandingScreenProps) {
  const handleLogin = () => {
    navigation.navigate('Home');
  };

  const handleSignUp = () => {
    navigation.navigate('Home');
  };

  return (
    <View>
      <Button variant="primary" onPress={handleLogin}>
        Log in
      </Button>

      <Button variant="secondary" onPress={handleSignUp}>
        Sign up
      </Button>
    </View>
  );
}
```

### Custom Styling

```tsx
<Button
  variant="primary"
  onPress={handleAction}
  style={{ marginTop: 20 }}
  textStyle={{ fontSize: 18 }}
>
  Custom Button
</Button>
```

## Component Structure

```
apps/mobile/src/components/
└── Button.tsx          # Button component
```

## Color Constants

The button uses colors from the shared library:

```typescript
import { colors } from '@thimblely/shared';

// Used colors:
colors.primaryDark; // #19051A
colors.gradients.logo; // ['#FFD700', '#FFA500', '#FFD700']
```

## Best Practices

1. **Consistent Usage:** Use `primary` for main actions, `secondary` for alternative actions
2. **Accessibility:** Ensure button labels are descriptive
3. **Font Loading:** Always check fonts are loaded before rendering
4. **Touch Feedback:** Built-in opacity change on press (0.8)
5. **Shadow:** Primary and gradient buttons include shadow for depth

## Related Files

- `apps/mobile/src/components/Button.tsx` - Component implementation
- `apps/mobile/src/app/App.tsx` - Font loading
- `apps/mobile/src/screens/LandingScreen.tsx` - Usage example
- `libs/shared/src/lib/constants/colors.ts` - Color definitions

## Future Enhancements

Potential improvements:

- [ ] Add loading state with spinner
- [ ] Add disabled state
- [ ] Add icon support (left/right icons)
- [ ] Add size variants (small, medium, large)
- [ ] Add full-width option
- [ ] Add outline variant
