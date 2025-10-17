# Changelog

All notable changes to the Thimblely Mobile app will be documented in this file.

## [1.0.0] - 2025-10-14

### Added - Initial Release

#### Core Structure

- ✅ React Native app with Expo
- ✅ TypeScript configuration
- ✅ Metro bundler setup for monorepo
- ✅ Babel module resolver configuration
- ✅ VS Code workspace settings

#### Navigation

- ✅ React Navigation with Native Stack Navigator
- ✅ Bottom Tabs Navigator for main app
- ✅ Type-safe navigation with TypeScript
- ✅ Authentication flow navigation
- ✅ Main app tab navigation

#### Screens - Authentication Flow

- ✅ **LandingScreen** - Welcome screen with animated icons
  - Gradient background
  - Animated fashion icons
  - Login/Sign up buttons
  - Terms and privacy footer
- ✅ **LoginScreen** - User login
  - Email/password inputs
  - Show/hide password toggle
  - Remember me checkbox
  - Google sign-in option
  - Forgot password link
- ✅ **SignUpUserTypeScreen** - Step 1/4
  - Customer/Business selection
  - Progress indicator
  - Next button
- ✅ **SignUpCountryScreen** - Step 2/4
  - Country picker with search
  - Flag display
  - Progress indicator
- ✅ **SignUpFormScreen** - Step 3/4
  - First/Last name inputs
  - Email, Username, Password fields
  - Terms acceptance checkbox
  - Google sign-up option
  - Progress indicator

#### Screens - Main App

- ✅ **FeedScreen** - Home feed (Tab 1)
  - Placeholder UI
  - Post cards layout
- ✅ **SearchScreen** - Search (Tab 2)
  - Search input
  - Placeholder results
- ✅ **CreateScreen** - Create post (Tab 3)
  - Title/description inputs
  - Media upload buttons
  - Post button
- ✅ **NotificationsScreen** - Notifications (Tab 4)
  - Notification list
  - Icons for like/comment/follow
- ✅ **ProfileScreen** - User profile (Tab 5)
  - Profile header
  - Stats (projects, followers, following)
  - Edit profile button
  - Projects grid

#### Components

- ✅ **Button** - Reusable button component
  - Variants: primary, secondary, outline
  - Disabled state
  - Custom styling support
- ✅ **Input** - Text input component
  - Label support
  - Left/right icons
  - Error state
  - Password visibility toggle
- ✅ **ProgressIndicator** - Multi-step progress
  - Customizable steps
  - Active/inactive states

#### Styling

- ✅ Tailwind utilities via `twrnc`
- ✅ Lucide icons integration
- ✅ Color palette from @thimblely/shared
- ✅ Consistent spacing and typography
- ✅ Expo Linear Gradient support

#### Configuration Files

- ✅ `package.json` - Dependencies and scripts
- ✅ `app.json` - Expo configuration
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `metro.config.js` - Metro bundler for monorepo
- ✅ `babel.config.js` - Module resolution
- ✅ `expo-env.d.ts` - Type definitions
- ✅ `.gitignore` - Git ignore rules

#### Documentation

- ✅ `README.md` - Complete documentation
- ✅ `SETUP.md` - Detailed setup guide
- ✅ `QUICKSTART.md` - Quick start guide
- ✅ `CHANGELOG.md` - This file

#### Scripts

- ✅ `scripts/setup.sh` - Automated setup
- ✅ `scripts/clean.sh` - Clean build artifacts

#### Integration

- ✅ Apollo Client for GraphQL
- ✅ @thimblely/shared library integration
- ✅ Shared constants and utilities
- ✅ Type-safe imports

### Dependencies

#### Production

- expo ~52.0.23
- react 18.3.1
- react-native 0.76.5
- @react-navigation/native ^7.0.11
- @react-navigation/native-stack ^7.1.7
- @react-navigation/bottom-tabs ^7.2.0
- @apollo/client ^3.11.8
- graphql ^16.9.0
- lucide-react-native ^0.454.0
- expo-linear-gradient ~14.0.1
- twrnc ^4.5.1

#### Development

- typescript ~5.3.3
- @types/react ~18.3.12
- babel-plugin-module-resolver ^5.0.2

### Notes

- All images currently reference @thimblely/shared assets
- Authentication mutations not yet implemented (placeholders)
- Tab screens have placeholder content
- Ready for backend integration
- Requires Expo Go app for testing

### Next Release Plans

- [ ] Implement GraphQL mutations for auth
- [ ] Add custom fonts (Outfit family)
- [ ] Build out tab screen functionality
- [ ] Add image picker functionality
- [ ] Implement profile editing
- [ ] Add settings screen
- [ ] Implement notifications logic
- [ ] Add pull-to-refresh
- [ ] Add loading states
- [ ] Add error handling
- [ ] Add offline support
- [ ] Add analytics
