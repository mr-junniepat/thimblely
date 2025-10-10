# Sign-Up Flow Documentation

## Overview

A beautiful, multi-step sign-up flow for the Thimblely mobile app based on the Figma design. The flow consists of 4 screens with smooth navigation and consistent design.

## Flow Structure

```
Landing Screen
    ↓ (Sign up button)
1. User Type Selection
    ↓
2. Country Selection
    ↓
3. Account Creation Form
    ↓
4. Email Verification
    ↓
Home Screen
```

## Screens

### 1. User Type Selection (`SignUpUserTypeScreen.tsx`)

**Purpose:** Let users choose between Customer or Business Owner account types.

**Features:**

- ✅ Progress indicator (Step 1/4)
- ✅ Back button navigation
- ✅ Two selection cards with icons
- ✅ Disabled state for Next button until selection
- ✅ Outfit font throughout
- ✅ Bottom padding for better UX

**User Types:**

- **Customer:** Shopping bag icon, pink background
  - For users who want to order custom outfits
- **Business Owner:** Building icon, pink background
  - For tailors and fashion brands

**Navigation:**

```tsx
// When user selects a type and clicks Next:
navigation.navigate('SignUpCountry', { userType: 'customer' | 'business' });
```

### 2. Country Selection (`SignUpCountryScreen.tsx`)

**Purpose:** Allow users to select their country.

**Features:**

- ✅ Progress indicator (Step 2/4)
- ✅ Search functionality for countries
- ✅ Country list with flag emojis
- ✅ Check mark for selected country
- ✅ Scrollable country list

**Countries Included:**

- United States 🇺🇸
- United Kingdom 🇬🇧
- Nigeria 🇳🇬
- Ghana 🇬🇭
- Kenya 🇰🇪
- South Africa 🇿🇦
- Canada 🇨🇦
- France 🇫🇷
- Germany 🇩🇪
- India 🇮🇳

**Navigation:**

```tsx
navigation.navigate('SignUpForm', {
  userType: route.params.userType,
  country: selectedCountry,
});
```

### 3. Account Creation Form (`SignUpFormScreen.tsx`)

**Purpose:** Collect user account details.

**Features:**

- ✅ Progress indicator (Step 3/4)
- ✅ Keyboard-aware scrolling
- ✅ Form validation
- ✅ Password visibility toggle
- ✅ Password match validation
- ✅ All fields required

**Form Fields:**

1. **Full Name** - Text input
2. **Email Address** - Email keyboard type
3. **Password** - Secure text entry with eye icon toggle
4. **Confirm Password** - Validation for password match

**Validation:**

- All fields must be filled
- Passwords must match
- Email must be valid format (handled by keyboard type)

**Navigation:**

```tsx
navigation.navigate('SignUpVerify', {
  userType: route.params.userType,
  country: route.params.country,
  email: formData.email,
});
```

### 4. Email Verification (`SignUpVerifyScreen.tsx`)

**Purpose:** Verify user's email with 6-digit code.

**Features:**

- ✅ Progress indicator (Step 4/4)
- ✅ Email icon with pink background
- ✅ 6-digit code input (auto-focus next)
- ✅ Backspace handling (auto-focus previous)
- ✅ Resend code functionality
- ✅ Helper text with pink background
- ✅ Disabled button until code is complete

**Verification Code:**

- 6 individual input boxes
- Auto-focus on next box when digit entered
- Auto-focus on previous box when backspace on empty
- Visual feedback (pink border) on filled boxes

**Navigation:**

```tsx
// After successful verification:
navigation.navigate('Home');
```

## Components Used

### ProgressIndicator Component

Reusable progress bar component used across all sign-up screens.

```tsx
<ProgressIndicator currentStep={1} totalSteps={4} />
```

**Props:**

- `currentStep`: Current step number (1-4)
- `totalSteps`: Total number of steps (always 4)

**Visual:**

- Active steps: Pink (#A30552)
- Inactive steps: Gray (#D9D9D9)
- Rounded bars

## Design System

### Colors

All screens use the shared color constants:

```typescript
colors.black; // #111113 - Text
colors.greyText; // #68666F - Muted text
colors.complimentary; // #A30552 - Brand accent
colors.lightPink; // #FFF0F7 - Icon backgrounds
```

### Typography

**Font Family:** Outfit (Google Fonts)

- **Outfit_400Regular** - Body text, buttons
- **Outfit_500Medium** - Headings, labels
- **Outfit_600SemiBold** - Card titles, verification code
- **Outfit_700Bold** - Reserved for emphasis

**Font Sizes:**

- Headings: `text-4xl` (40px)
- Body: `text-base` (16px)
- Labels: `text-sm` (14px)
- Small: `text-xs` (12px)

### Buttons

**Next/Verify Buttons:**

- Gradient: `#A30552 → #56062D → #A30552`
- Border radius: 50px (fully rounded)
- Padding: 16px vertical
- Font: Outfit Regular 14px
- Disabled state: 50% opacity

### Spacing

- **Screen padding:** 24px horizontal (px-6)
- **Bottom padding:** 40px (pb-10) - Added for better UX
- **Card gaps:** 8px between cards
- **Form gaps:** 16px between fields

## Navigation Parameters

### Type Definitions

```typescript
export type RootStackParamList = {
  Landing: undefined;
  SignUpUserType: undefined;
  SignUpCountry: { userType: string };
  SignUpForm: { userType: string; country: string };
  SignUpVerify: { userType: string; country: string; email: string };
  Home: undefined;
  Details: { id: string };
};
```

### Parameter Flow

1. **Landing → SignUpUserType:** No params
2. **SignUpUserType → SignUpCountry:** `{ userType }`
3. **SignUpCountry → SignUpForm:** `{ userType, country }`
4. **SignUpForm → SignUpVerify:** `{ userType, country, email }`
5. **SignUpVerify → Home:** No params

## Implementation Notes

### Keyboard Handling

Form screen uses `KeyboardAvoidingView` for iOS:

```tsx
<KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : undefined}
>
```

### Auto-Focus

Verification code inputs automatically focus:

```tsx
// Auto-focus next input
if (text && index < 5) {
  inputRefs.current[index + 1]?.focus();
}
```

### State Management

Each screen maintains its own local state:

- User type screen: `selectedType`
- Country screen: `selectedCountry`, `searchQuery`
- Form screen: `formData`, `showPassword`, `showConfirmPassword`
- Verify screen: `code` array

## User Experience Features

### Progressive Disclosure

- Shows only relevant information at each step
- Clear progress indication
- Easy navigation back to previous steps

### Validation

- Real-time form validation
- Visual feedback for errors
- Disabled buttons until requirements met

### Accessibility

- Large touch targets (minimum 44px)
- High contrast colors
- Clear labels and placeholders
- Descriptive error messages

## Future Enhancements

- [ ] Add API integration for user registration
- [ ] Implement actual email verification
- [ ] Add password strength indicator
- [ ] Add terms & conditions checkbox
- [ ] Add social login options
- [ ] Add profile photo upload
- [ ] Add phone number verification option
- [ ] Add onboarding tutorial after sign-up

## Testing the Flow

1. Start at Landing screen
2. Click "Sign up" button
3. Select user type (Customer or Business Owner)
4. Search and select country
5. Fill in account details
6. Enter verification code (mock: any 6 digits)
7. Arrive at Home screen

## Files

```
apps/mobile/src/
├── screens/
│   ├── LandingScreen.tsx              # Entry point
│   ├── SignUpUserTypeScreen.tsx      # Step 1: User type
│   ├── SignUpCountryScreen.tsx       # Step 2: Country
│   ├── SignUpFormScreen.tsx          # Step 3: Account form
│   └── SignUpVerifyScreen.tsx        # Step 4: Email verification
├── components/
│   ├── Button.tsx                     # Reusable button
│   └── ProgressIndicator.tsx         # Progress bar
└── navigation/
    └── index.tsx                      # Navigation config
```

## Color Palette

Updated `libs/shared/src/lib/constants/colors.ts` with sign-up flow colors:

```typescript
complimentary: '#A30552',      // Pink accent
complimentaryDark: '#56062D',  // Dark pink
greyText: '#68666F',           // Muted text
lightPink: '#FFF0F7',          // Icon backgrounds
black: '#111113',              // Main text
```

## Design Adherence

✅ Matches Figma design exactly  
✅ Outfit font family throughout  
✅ Consistent spacing and sizing  
✅ Progress indicators on all screens  
✅ Pink color scheme (#A30552)  
✅ Bottom padding for better UX  
✅ Smooth transitions between screens

## Summary

The sign-up flow provides a beautiful, intuitive onboarding experience for new Thimblely users. Each screen is designed for clarity and ease of use, with consistent branding and smooth navigation throughout the 4-step process.
