# Thimblely Mobile - Project Structure

Visual guide to the mobile app architecture and file organization.

## 📂 Directory Tree

```
apps/mobile/
│
├── 📱 Core Config Files
│   ├── package.json              # Dependencies & scripts
│   ├── app.json                  # Expo configuration
│   ├── tsconfig.json             # TypeScript config
│   ├── metro.config.js           # Metro bundler (monorepo)
│   ├── babel.config.js           # Module resolution
│   ├── index.js                  # Entry point
│   ├── expo-env.d.ts             # Type definitions
│   └── .gitignore                # Git ignore rules
│
├── 📖 Documentation
│   ├── README.md                 # Complete documentation
│   ├── SETUP.md                  # Setup guide
│   ├── QUICKSTART.md             # Quick start
│   ├── CHANGELOG.md              # Version history
│   └── STRUCTURE.md              # This file
│
├── 🛠️ Scripts
│   └── scripts/
│       ├── setup.sh              # Automated setup
│       └── clean.sh              # Clean build files
│
├── 🎨 Assets
│   └── assets/
│       ├── images/               # Image assets
│       └── README.md             # Assets guide
│
├── ⚙️ VS Code
│   └── .vscode/
│       ├── settings.json         # Workspace settings
│       └── extensions.json       # Recommended extensions
│
└── 💻 Source Code
    └── src/
        ├── App.tsx               # 🔴 Main app entry
        │
        ├── 🧩 components/        # Reusable components
        │   ├── Button.tsx
        │   ├── Input.tsx
        │   ├── ProgressIndicator.tsx
        │   └── index.ts
        │
        ├── 🧭 navigation/        # Navigation config
        │   └── MainTabs.tsx
        │
        └── 📱 screens/           # All app screens
            │
            ├── 🔐 Auth Screens
            │   ├── LandingScreen.tsx
            │   ├── LoginScreen.tsx
            │   ├── SignUpUserTypeScreen.tsx
            │   ├── SignUpCountryScreen.tsx
            │   └── SignUpFormScreen.tsx
            │
            └── 📑 tabs/          # Main app tabs
                ├── FeedScreen.tsx
                ├── SearchScreen.tsx
                ├── CreateScreen.tsx
                ├── NotificationsScreen.tsx
                └── ProfileScreen.tsx
```

## 🗺️ Navigation Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     NAVIGATION FLOW                          │
└─────────────────────────────────────────────────────────────┘

                    App.tsx (Root)
                         │
                         ├─ NavigationContainer
                         │
                         └─ Stack Navigator
                              │
                              ├─ Landing Screen
                              │      │
                              │      ├─ [Login] ──────────┐
                              │      │                     │
                              │      └─ [Sign Up] ────┐   │
                              │                        │   │
                              ├─ Login Screen ◄───────┘   │
                              │      │                     │
                              │      └─ [Login Success] ───┼─► MainTabs
                              │                             │
                              ├─ SignUpUserType Screen ◄───┘
                              │      │
                              │      └─ [Select Type]
                              │           │
                              ├─ SignUpCountry Screen
                              │      │
                              │      └─ [Select Country]
                              │           │
                              ├─ SignUpForm Screen
                              │      │
                              │      └─ [Create Account]
                              │           │
                              └─ MainTabs ◄───────────────┘
                                   │
                                   └─ Bottom Tab Navigator
                                        │
                                        ├─ Feed Tab 🏠
                                        ├─ Search Tab 🔍
                                        ├─ Create Tab ➕
                                        ├─ Notifications Tab ❤️
                                        └─ Profile Tab 👤
```

## 🔄 Screen Flow Details

### Authentication Flow

```
1. Landing Screen
   │
   ├─ Press "Log in"
   │  └─► Login Screen
   │      └─► MainTabs (on success)
   │
   └─ Press "Sign up"
      └─► SignUpUserType (Step 1/4)
          │
          ├─ Select "Customer" or "Business"
          │
          └─► SignUpCountry (Step 2/4)
              │
              ├─ Select Country
              │
              └─► SignUpForm (Step 3/4)
                  │
                  ├─ Fill form + Accept terms
                  │
                  └─► MainTabs (on success)
```

### Main App Flow

```
MainTabs (Bottom Navigation)
│
├─ Feed Tab (Home)
│  └─ View project feed
│
├─ Search Tab
│  └─ Search projects/people
│
├─ Create Tab
│  └─ Create new post
│
├─ Notifications Tab
│  └─ View activity
│
└─ Profile Tab
   └─ View/edit profile
```

## 🧩 Component Architecture

### Reusable Components

#### Button Component

```typescript
<Button
  variant="primary" | "secondary" | "outline"
  onPress={() => {}}
  disabled={false}
>
  Button Text
</Button>
```

**Variants:**

- `primary` → Purple background (#7D2078)
- `secondary` → White background
- `outline` → Transparent with border

#### Input Component

```typescript
<Input
  label="Email"
  placeholder="Enter email"
  icon={Mail} // Lucide icon
  rightIcon={<Icon />} // Custom right icon
  value={text}
  onChangeText={setText}
  error="Error message" // Optional error state
/>
```

**Features:**

- Left icon support
- Right icon support (e.g., password toggle)
- Error state styling
- Label above input
- Placeholder text

#### ProgressIndicator Component

```typescript
<ProgressIndicator currentStep={2} totalSteps={4} />
```

**Visual:** ● ● ○ ○ (2 of 4 complete)

## 📦 Dependencies Structure

```
Mobile App Dependencies
│
├─ Core React Native
│  ├─ react (18.3.1)
│  ├─ react-native (0.76.5)
│  └─ expo (~52.0.23)
│
├─ Navigation
│  ├─ @react-navigation/native
│  ├─ @react-navigation/native-stack
│  └─ @react-navigation/bottom-tabs
│
├─ Data & API
│  ├─ @apollo/client
│  ├─ graphql
│  └─ @thimblely/shared (local)
│
├─ UI & Styling
│  ├─ twrnc (Tailwind)
│  ├─ lucide-react-native (Icons)
│  ├─ expo-linear-gradient
│  └─ react-native-svg
│
└─ Development
   ├─ typescript
   ├─ @types/react
   └─ babel-plugin-module-resolver
```

## 🎨 Styling Architecture

### Color System

```typescript
import { COLORS } from '@thimblely/shared';

// Primary colors
COLORS.primary; // #7D2078
COLORS.complimentary; // #A30552

// Text colors
COLORS.text; // #111113
COLORS.textSecondary; // #68666F

// Status colors
COLORS.success; // #10B981
COLORS.error; // #EF4444
COLORS.warning; // #F59E0B

// Gradients
COLORS.gradients.primary; // ['#430055', '#A10653']
COLORS.gradients.cta; // ['#A30552', '#56062D', '#A30552']
```

### Styling Methods

1. **twrnc** (Tailwind utilities)

   ```typescript
   tw`flex-1 items-center justify-center`;
   ```

2. **StyleSheet** (React Native)

   ```typescript
   StyleSheet.create({ container: { flex: 1 } });
   ```

3. **Inline Styles**
   ```typescript
   style={{ color: COLORS.primary }}
   ```

## 🔧 Configuration Files Explained

### package.json

- Lists all dependencies
- Defines npm scripts (start, ios, android)
- Sets app name and version

### app.json

- Expo configuration
- App name, icon, splash screen
- iOS and Android specific settings

### tsconfig.json

- TypeScript compiler options
- Extends base config from monorepo
- JSX set to "react-native"

### metro.config.js

- Metro bundler configuration
- Monorepo support (watchFolders)
- Node module resolution paths

### babel.config.js

- Module resolution aliases
- `@mobile/*` → `src/*`
- `@thimblely/shared` → shared library

## 📱 Screen Breakdown

### Landing Screen (405 lines)

- Gradient background
- 24 animated fashion icons
- Logo and app name
- Login/Sign up buttons
- Terms footer

### Login Screen (257 lines)

- Email/password form
- Remember me checkbox
- Password visibility toggle
- Google sign-in
- Forgot password link

### SignUpUserType Screen (201 lines)

- User type cards (Customer/Business)
- Progress indicator (Step 1/4)
- Next button
- Background image

### SignUpCountry Screen (197 lines)

- Country list with flags
- Search functionality
- Progress indicator (Step 2/4)
- Next button

### SignUpForm Screen (310 lines)

- Name, email, username, password fields
- Terms checkbox
- Google sign-up
- Progress indicator (Step 3/4)
- Create account button

### Tab Screens (100-200 lines each)

- FeedScreen: Post feed layout
- SearchScreen: Search UI
- CreateScreen: Post creation form
- NotificationsScreen: Activity list
- ProfileScreen: User profile UI

## 🚀 Development Commands

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start

# Run on specific platform
npm run ios              # iOS simulator
npm run android          # Android emulator
npm run web              # Web browser

# Clear cache
expo start --clear

# Run setup script
./scripts/setup.sh

# Clean build artifacts
./scripts/clean.sh
```

## 📊 Project Stats

- **Total Screens**: 10 (5 auth + 5 tabs)
- **Components**: 3 reusable
- **Lines of Code**: ~2,500+
- **Configuration Files**: 7
- **Documentation Files**: 6
- **Dependencies**: 20+

## 🎯 Import Aliases

```typescript
// Components (using alias)
import { Button, Input } from '@mobile/components';

// Screens
import LandingScreen from '../screens/LandingScreen';

// Shared library
import { COLORS, client } from '@thimblely/shared';

// Navigation types
import { RootStackParamList } from '../App';
```

## 📝 File Naming Conventions

- **Screens**: PascalCase + "Screen" suffix

  - `LandingScreen.tsx`
  - `LoginScreen.tsx`

- **Components**: PascalCase

  - `Button.tsx`
  - `Input.tsx`

- **Navigation**: PascalCase

  - `MainTabs.tsx`

- **Config**: lowercase/kebab-case

  - `metro.config.js`
  - `babel.config.js`

- **Docs**: UPPERCASE
  - `README.md`
  - `SETUP.md`

## 🔍 Quick Reference

### Find a Screen

```bash
src/screens/LandingScreen.tsx       # Landing page
src/screens/LoginScreen.tsx         # Login
src/screens/tabs/FeedScreen.tsx     # Home feed
```

### Find a Component

```bash
src/components/Button.tsx           # Button component
src/components/Input.tsx            # Input component
```

### Find Config

```bash
./package.json                      # Dependencies
./app.json                          # Expo config
./metro.config.js                   # Metro config
```

### Find Documentation

```bash
./README.md                         # Main docs
./SETUP.md                          # Setup guide
./QUICKSTART.md                     # Quick start
```

---

**This structure is designed for:**

- ✅ Scalability
- ✅ Maintainability
- ✅ Type safety
- ✅ Developer experience
- ✅ Production readiness
