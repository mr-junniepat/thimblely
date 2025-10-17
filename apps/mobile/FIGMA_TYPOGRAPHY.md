# Figma Typography Reference

Complete typography specifications extracted from Figma designs.

## SignUpUserType Screen

### Title Section

**Main Title:**

- Font Family: `Outfit Medium`
- Font Weight: `500` (Medium)
- Font Size: `40px`
- Color: `#111113` (black)
- Letter Spacing: `-1.6px`
- Max Width: `320px`
- Line Height: `normal`

**Subtitle:**

- Font Family: `Outfit Regular`
- Font Weight: `400` (Regular)
- Font Size: `16px`
- Color: `#68666F` (grey text)
- Letter Spacing: `-0.64px`
- Line Height: `normal`

**Spacing:**

- Gap between title and subtitle: `16px`
- Top margin: `24px`
- Bottom margin: `40px`

### Card Typography

**Card Title (Customer/Business Owner):**

- Font Family: `Satoshi Variable Bold` (fallback to system with weight 700)
- Font Weight: `700` (Bold)
- Font Size: `14px`
- Color: `#111113` (black)
- Line Height: `normal`

**Card Description:**

- Font Family: `Satoshi Variable Regular` (fallback to system with weight 400)
- Font Weight: `400` (Regular)
- Font Size: `12px`
- Color: `#68666F` (grey text)
- Line Height: `12px` (100%)

## Login Screen

### Title Section

**"Welcome" / "Back!":**

- Font Family: `Outfit Medium`
- Font Weight: `500` (Medium)
- Font Size: `40px`
- Color: `#A30552` (Welcome) / `#111113` (Back!)
- Letter Spacing: `-1.6px`

**Subtitle:**

- Font Family: `Outfit Regular`
- Font Weight: `400` (Regular)
- Font Size: `16px`
- Color: `#68666F` (grey text)
- Letter Spacing: `-0.64px`

### Form Elements

**Input Labels:**

- Font Family: `Outfit Regular`
- Font Weight: `400` (Regular)
- Font Size: `14px`
- Color: `#000000` (black)

**Input Placeholder:**

- Font Family: `Satoshi Variable Regular`
- Font Weight: `400` (Regular)
- Font Size: `14px`
- Color: `#000000` (black)

**"Remember me" / "Forgot Password?":**

- Font Family: `Satoshi Variable Regular`
- Font Weight: `400` (Regular)
- Font Size: `12px`
- Color: `#111113` (Remember me) / `#6B2374` (Forgot Password)

### Buttons

**Login Button:**

- Font Family: `Outfit Regular`
- Font Weight: `400` (Regular)
- Font Size: `14px`
- Color: `#FFFFFF` (white)

**Google Button:**

- Font Family: `Outfit Regular`
- Font Weight: `400` (Regular)
- Font Size: `14px`
- Color: `#111113` (black)

**"Or" Divider:**

- Font Family: `Outfit Regular`
- Font Weight: `400` (Regular)
- Font Size: `14px`
- Color: `#111113` (black)

**Sign up Link:**

- Font Family: `Outfit Regular`
- Font Weight: `400` (Regular)
- Font Size: `12px`
- Color: `#7F7F7F` (Don't have account) / `#6A2374` (Sign up)

## Landing Screen

**"Thimblely" Title:**

- Font Family: `Outfit Regular`
- Font Weight: `400` (Regular)
- Font Size: `48px`
- Color: `#FFFFFF` (white)

**Button Text:**

- Font Family: `Outfit Regular`
- Font Weight: `400` (Regular)
- Font Size: `16px`
- Color: `#000000` (Log in) / `#FFFFFF` (Sign up)

**Terms Text:**

- Font Family: `Outfit Regular`
- Font Weight: `400` (Regular)
- Font Size: `14px`
- Color: `#FFFFFF` (white)

## Font Weight Reference

| Weight Name | Numeric Value | Usage                            |
| ----------- | ------------- | -------------------------------- |
| Regular     | 400           | Body text, descriptions, buttons |
| Medium      | 500           | Headings, titles                 |
| Bold        | 700           | Card titles, emphasis            |

## Line Height Reference

| Element Type      | Line Height | Notes                     |
| ----------------- | ----------- | ------------------------- |
| Headings          | normal      | Default line height       |
| Body Text         | normal      | Default line height       |
| Card Descriptions | 12px        | 100% of font size (tight) |
| Input Labels      | normal      | Default line height       |

## Letter Spacing Reference

| Element Type   | Letter Spacing | Notes                        |
| -------------- | -------------- | ---------------------------- |
| 40px Headings  | -1.6px         | Tight spacing for large text |
| 16px Subtitles | -0.64px        | Slight tightening            |
| Other Text     | 0px            | Default spacing              |

## Font Loading

Currently loaded fonts:

- ✅ `Outfit-Regular` (weight 400)
- ✅ `Outfit-Medium` (weight 500)

Fonts used but not loaded (using system fallback):

- ⚠️ `Satoshi Variable Regular` (weight 400) - using system font
- ⚠️ `Satoshi Variable Bold` (weight 700) - using system font

To load Satoshi Variable fonts, add to `App.tsx`:

```typescript
const [fontsLoaded] = useFonts({
  'Outfit-Regular': require('../assets/fonts/Outfit-Regular.ttf'),
  'Outfit-Medium': require('../assets/fonts/Outfit-Medium.ttf'),
  'Satoshi-Regular': require('../assets/fonts/Satoshi-Regular.ttf'),
  'Satoshi-Bold': require('../assets/fonts/Satoshi-Bold.ttf'),
});
```
