# Input Component Documentation

## Overview

A reusable Input component for the Thimblely mobile app with support for icons, labels, errors, and custom styling. Designed to match the Figma design system.

## Installation

The component uses:
- **Outfit font** from Google Fonts
- **TWRNC** for styling
- **Lucide icons** for left/right icons
- **Shared color constants**

## Usage

### Basic Input

```tsx
import { Input } from '../components/Input';

<Input
  placeholder="Enter your name"
  value={name}
  onChangeText={setName}
/>
```

### Input with Label

```tsx
<Input
  label="Email Address"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
/>
```

### Input with Icon

```tsx
import { Mail } from 'lucide-react-native';

<Input
  label="Email"
  placeholder="Email"
  icon={Mail}
  value={email}
  onChangeText={setEmail}
/>
```

### Password Input with Toggle

```tsx
import { Lock, Eye, EyeOff } from 'lucide-react-native';

const [showPassword, setShowPassword] = useState(false);

<Input
  label="Password"
  placeholder="Create Password"
  icon={Lock}
  secureTextEntry={!showPassword}
  value={password}
  onChangeText={setPassword}
  rightIcon={
    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
      {showPassword ? (
        <EyeOff size={20} color={colors.greyText} />
      ) : (
        <Eye size={20} color={colors.greyText} />
      )}
    </TouchableOpacity>
  }
/>
```

### Input with Error

```tsx
<Input
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  error="Please enter a valid email"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `undefined` | Label text displayed above input |
| `icon` | `LucideIcon` | `undefined` | Left icon from lucide-react-native |
| `rightIcon` | `React.ReactNode` | `undefined` | Custom right icon/component |
| `error` | `string` | `undefined` | Error message displayed below input |
| `...textInputProps` | `TextInputProps` | - | All React Native TextInput props |

## Common Icons

### From Lucide React Native:

```tsx
import {
  Mail,        // Email inputs
  User,        // Username inputs
  Lock,        // Password inputs
  Eye,         // Show password
  EyeOff,      // Hide password
  Phone,       // Phone number inputs
  MapPin,      // Address inputs
  CreditCard,  // Payment inputs
} from 'lucide-react-native';
```

## Styling

### Default Styles

- **Border:** 1px solid rgba(0,0,0,0.1)
- **Border Radius:** 12px (rounded-xl)
- **Padding:** 16px (px-4 py-4)
- **Font:** Outfit Regular 14px
- **Label Font:** Outfit Regular 14px
- **Error Color:** Red-500

### With Error

- **Border:** Red-500
- **Error Text:** Red-500, 12px

### Icon Styling

- **Left Icon:** 16px, grey color, 8px right margin
- **Right Icon:** Custom component, 8px left margin

## Form Layout Examples

### Side-by-Side Inputs (First Name / Last Name)

```tsx
<View style={tw`flex-row gap-4`}>
  <View style={tw`flex-1`}>
    <Input
      label="First Name"
      placeholder="Enter first name"
      value={firstName}
      onChangeText={setFirstName}
    />
  </View>
  <View style={tw`flex-1`}>
    <Input
      label="Last Name"
      placeholder="Enter last name"
      value={lastName}
      onChangeText={setLastName}
    />
  </View>
</View>
```

### Full-Width Inputs

```tsx
<View style={tw`gap-5`}>
  <Input
    label="Email"
    placeholder="Email"
    icon={Mail}
    value={email}
    onChangeText={setEmail}
  />
  
  <Input
    label="Username"
    placeholder="Enter Username"
    icon={User}
    value={username}
    onChangeText={setUsername}
  />
</View>
```

## Color Constants

```typescript
import { colors } from '@thimblely/shared';

// Used colors:
colors.black       // #111113 - Text
colors.greyText    // #68666F - Placeholder & icons
colors.textGrey    // #5E5656 - Terms text
```

## Component Structure

```
apps/mobile/src/components/
└── Input.tsx          # Input component
```

## Usage in Sign-Up Form

```tsx
export function SignUpFormScreen() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={tw`gap-5`}>
      {/* First Name & Last Name */}
      <View style={tw`flex-row gap-4`}>
        <View style={tw`flex-1`}>
          <Input
            label="First Name"
            placeholder="Email"
            value={formData.firstName}
            onChangeText={(text) =>
              setFormData({ ...formData, firstName: text })
            }
          />
        </View>
        <View style={tw`flex-1`}>
          <Input
            label="Last Name"
            placeholder="Email"
            value={formData.lastName}
            onChangeText={(text) =>
              setFormData({ ...formData, lastName: text })
            }
          />
        </View>
      </View>

      {/* Email */}
      <Input
        label="Email"
        placeholder="Email"
        icon={Mail}
        keyboardType="email-address"
        autoCapitalize="none"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />

      {/* Username */}
      <Input
        label="Username"
        placeholder="Enter Username"
        icon={User}
        autoCapitalize="none"
        value={formData.username}
        onChangeText={(text) =>
          setFormData({ ...formData, username: text })
        }
      />

      {/* Password */}
      <Input
        label="Password"
        placeholder="Create Password"
        icon={Lock}
        secureTextEntry={!showPassword}
        value={formData.password}
        onChangeText={(text) =>
          setFormData({ ...formData, password: text })
        }
        rightIcon={
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeOff size={20} color={colors.greyText} />
            ) : (
              <Eye size={20} color={colors.greyText} />
            )}
          </TouchableOpacity>
        }
      />
    </View>
  );
}
```

## Features

### Icon Support

- ✅ **Left icon:** Pass any Lucide icon
- ✅ **Right icon:** Pass custom React component (e.g., password toggle)
- ✅ **Auto-sizing:** Icons sized to 16px by default

### Label & Error

- ✅ **Optional label:** Shows above input when provided
- ✅ **Error state:** Red border + error message below
- ✅ **Consistent spacing:** 8px margin between elements

### Accessibility

- ✅ **High contrast:** Meets WCAG AA standards
- ✅ **Touch targets:** Minimum 44px height
- ✅ **Clear labels:** Descriptive field labels
- ✅ **Error feedback:** Visual + text error messages

### Keyboard Types

Common keyboard types to use:

```tsx
keyboardType="email-address"  // Email inputs
keyboardType="number-pad"     // Number inputs
keyboardType="phone-pad"      // Phone inputs
keyboardType="default"        // Text inputs (default)
```

### Auto-Capitalize

```tsx
autoCapitalize="none"         // Email, username
autoCapitalize="words"        // Names
autoCapitalize="sentences"    // Regular text (default)
```

## Best Practices

### 1. Always Provide Labels

```tsx
// ✅ Good
<Input
  label="Email Address"
  placeholder="Enter your email"
/>

// ❌ Avoid
<Input
  placeholder="Email"
/>
```

### 2. Use Appropriate Keyboard Types

```tsx
// ✅ Good
<Input
  label="Email"
  keyboardType="email-address"
  autoCapitalize="none"
/>

// ❌ Avoid
<Input label="Email" />
```

### 3. Provide Clear Error Messages

```tsx
// ✅ Good
<Input
  label="Email"
  value={email}
  error="Please enter a valid email address"
/>

// ❌ Avoid
<Input
  label="Email"
  value={email}
  error="Invalid"
/>
```

### 4. Use Icons for Context

```tsx
// ✅ Good
<Input
  label="Email"
  placeholder="Email"
  icon={Mail}
/>

// Better UX with visual cues
```

## Related Components

- **Button** - Reusable button component
- **ProgressIndicator** - Progress bar for multi-step forms

## Related Files

- `apps/mobile/src/components/Input.tsx` - Component implementation
- `apps/mobile/src/screens/SignUpFormScreen.tsx` - Usage example
- `libs/shared/src/lib/constants/colors.ts` - Color definitions

## Future Enhancements

- [ ] Add input validation (email, phone, etc.)
- [ ] Add character counter
- [ ] Add helper text (non-error)
- [ ] Add prefix/suffix text
- [ ] Add clear button (X icon)
- [ ] Add loading state
- [ ] Add disabled state styling
- [ ] Add focus state highlighting

