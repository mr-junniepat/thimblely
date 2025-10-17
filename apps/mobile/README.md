# Thimblely Mobile App

React Native mobile application for Thimblely, built with Expo.

## Tech Stack

- **React Native** with Expo
- **TypeScript**
- **React Navigation** (Native Stack & Bottom Tabs)
- **Apollo Client** for GraphQL
- **Lucide React Native** for icons
- **Tailwind (twrnc)** for styling
- **Expo Linear Gradient** for gradients

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac only) or Android Emulator

### Installation

1. Install dependencies:

```bash
cd apps/mobile
npm install
```

2. Start the development server:

```bash
npm start
```

3. Run on specific platform:

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Project Structure

```
apps/mobile/
├── src/
│   ├── App.tsx                 # Main app component with navigation
│   ├── components/             # Reusable components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── ProgressIndicator.tsx
│   ├── navigation/             # Navigation configuration
│   │   └── MainTabs.tsx        # Bottom tab navigator
│   └── screens/                # App screens
│       ├── LandingScreen.tsx
│       ├── LoginScreen.tsx
│       ├── SignUpUserTypeScreen.tsx
│       ├── SignUpCountryScreen.tsx
│       ├── SignUpFormScreen.tsx
│       └── tabs/               # Tab screens
│           ├── FeedScreen.tsx
│           ├── SearchScreen.tsx
│           ├── CreateScreen.tsx
│           ├── NotificationsScreen.tsx
│           └── ProfileScreen.tsx
├── assets/                     # Static assets
│   └── images/                 # Image assets
├── app.json                    # Expo configuration
├── package.json
├── tsconfig.json
├── metro.config.js             # Metro bundler configuration
└── babel.config.js             # Babel configuration
```

## Navigation Flow

### Auth Flow

1. **Landing** → Choose Login or Sign Up
2. **Login** → Enter credentials → Main App
3. **Sign Up Flow**:
   - SignUpUserType → Choose Customer or Business
   - SignUpCountry → Select country
   - SignUpForm → Enter account details
   - → Main App

### Main App (Tabs)

- **Feed** - Home feed with projects
- **Search** - Search for projects and people
- **Create** - Create new project posts
- **Notifications** - Activity notifications
- **Profile** - User profile and settings

## Styling

The app uses a combination of:

- **twrnc** (Tailwind for React Native) for utility classes
- **StyleSheet** for component-specific styles
- **@thimblely/shared** for consistent colors across platforms

### Color Palette

Colors are imported from `@thimblely/shared`:

- Primary: `#7D2078`
- Complimentary: `#A30552`
- Text: `#111113`
- Background: `#FFFFFF`

See `libs/shared/src/lib/constants/colors.ts` for complete palette.

## Components

### Button

Reusable button component with variants:

- `primary` - Primary brand color
- `secondary` - White background
- `outline` - Transparent with border

```tsx
<Button variant="primary" onPress={handlePress}>
  Button Text
</Button>
```

### Input

Text input with label, icons, and error states:

```tsx
<Input
  label="Email"
  placeholder="Enter email"
  icon={Mail}
  value={email}
  onChangeText={setEmail}
  error={emailError}
/>
```

### ProgressIndicator

Visual progress indicator for multi-step flows:

```tsx
<ProgressIndicator currentStep={2} totalSteps={4} />
```

## GraphQL Integration

The app uses Apollo Client configured in `@thimblely/shared`:

```tsx
import { client } from '@thimblely/shared';
import { ApolloProvider } from '@apollo/client';

<ApolloProvider client={client}>{/* Your app */}</ApolloProvider>;
```

## Assets

Place required assets in `assets/images/`:

- `icon.png` - App icon (1024x1024)
- `adaptive-icon.png` - Android adaptive icon
- `splash-icon.png` - Splash screen icon
- `favicon.png` - Web favicon

## Development

### Module Resolution

The app uses Babel module resolver for clean imports:

- `@mobile/*` → `src/*`
- `@thimblely/shared` → `../../libs/shared/src`

### Hot Reload

Expo supports hot reloading. Changes to code will automatically refresh the app.

### Debugging

- Shake device or press `Cmd + D` (iOS) / `Cmd + M` (Android) for dev menu
- Use React Native Debugger or Flipper for advanced debugging
- Console logs appear in the terminal running `npm start`

## Building for Production

### iOS

```bash
# Build for App Store
expo build:ios
```

### Android

```bash
# Build APK
expo build:android -t apk

# Build App Bundle (recommended for Play Store)
expo build:android -t app-bundle
```

## Environment Variables

Create a `.env` file for environment-specific configuration:

```env
API_URL=https://api.thimblely.com
```

## Troubleshooting

### Metro bundler cache issues

```bash
expo start --clear
```

### iOS Simulator not launching

```bash
npx expo run:ios
```

### Android emulator issues

```bash
npx expo run:android
```

## Contributing

See the main [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## License

Proprietary - Thimblely
