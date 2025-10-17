# Thimblely Mobile - Quick Start

Get the mobile app running in 5 minutes!

## 🚀 Quick Setup

```bash
# 1. Navigate to mobile app
cd apps/mobile

# 2. Run setup script (Mac/Linux)
./scripts/setup.sh

# Or manually:
npm install --legacy-peer-deps

# 3. Start development server
npm start

# 4. Run on iOS (Mac only)
npm run ios

# Or Android
npm run android
```

## 📱 What's Included

### ✅ Complete Authentication Flow

- **Landing Screen** - Beautiful gradient with animated icons
- **Login Screen** - Email/password login with Google option
- **Sign Up Flow** - 3-step registration process
  - User Type Selection (Customer/Business)
  - Country Selection
  - Account Form

### ✅ Main App with Bottom Tabs

- **Feed** - Project feed (placeholder)
- **Search** - Search functionality (placeholder)
- **Create** - Create new posts (placeholder)
- **Notifications** - Activity feed (placeholder)
- **Profile** - User profile (placeholder)

### ✅ Reusable Components

- `Button` - Multiple variants (primary, secondary, outline)
- `Input` - Text input with icons and validation
- `ProgressIndicator` - Multi-step progress tracker

### ✅ Navigation

- React Navigation with Native Stack
- Bottom Tabs for main app
- Type-safe navigation with TypeScript

### ✅ Styling

- Tailwind-like utilities with `twrnc`
- Consistent color palette from `@thimblely/shared`
- Lucide icons throughout

### ✅ Configuration

- Expo app.json configured
- TypeScript setup
- Metro bundler configured for monorepo
- Babel module resolver for clean imports

## 📂 Key Files

```
apps/mobile/
├── src/App.tsx                    # 👈 Start here - Main entry point
├── src/screens/
│   ├── LandingScreen.tsx          # Auth: Landing page
│   ├── LoginScreen.tsx            # Auth: Login
│   ├── SignUpUserTypeScreen.tsx   # Auth: Step 1
│   ├── SignUpCountryScreen.tsx    # Auth: Step 2
│   ├── SignUpFormScreen.tsx       # Auth: Step 3
│   └── tabs/                      # Main app tabs
└── src/components/                # Reusable components
```

## 🎨 Screens Preview

### Landing Screen

- Gradient background with animated fashion icons
- Login and Sign Up buttons
- Terms and privacy footer

### Login Screen

- Email and password inputs
- Remember me checkbox
- Google sign-in option
- Forgot password link

### Sign Up Flow

1. **User Type**: Customer or Business selection
2. **Country**: Country picker with search
3. **Form**: Name, email, username, password

### Main App Tabs

- Home feed with placeholder content
- Search with input
- Create post interface
- Notifications list
- Profile with stats

## 🔧 Customization

### Colors

Edit `libs/shared/src/lib/constants/colors.ts`:

```typescript
export const COLORS = {
  primary: '#7D2078',
  complimentary: '#A30552',
  // ... more colors
};
```

### Navigation

Edit `src/App.tsx` to add/remove screens

### Components

Create new components in `src/components/`

## 🐛 Common Issues

**Issue**: Module not found errors  
**Fix**: `expo start --clear`

**Issue**: Images not loading  
**Fix**: Add placeholder images to `assets/images/`

**Issue**: TypeScript errors  
**Fix**: Rebuild shared library

```bash
cd ../../libs/shared
npm run build
```

## 📖 Next Steps

1. ✅ Get app running
2. 🔲 Add your assets to `assets/images/`
3. 🔲 Connect to backend GraphQL API
4. 🔲 Implement authentication mutations
5. 🔲 Build out tab screens
6. 🔲 Add custom fonts
7. 🔲 Test on physical devices

## 📚 Documentation

- [Full README](README.md) - Complete documentation
- [Setup Guide](SETUP.md) - Detailed setup instructions
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)

## 💡 Tips

- Use `Cmd/Ctrl + D` on device for dev menu
- Shake device to open dev menu
- Enable Fast Refresh for instant updates
- Use Expo Go app for quick testing
- Check Metro bundler logs for errors

## 🎯 Development Workflow

1. **Start server**: `npm start`
2. **Make changes** to screens/components
3. **App updates** automatically (Fast Refresh)
4. **Test** on simulator/device
5. **Commit** when ready

## 🚢 Ready for Production?

See [README.md](README.md#building-for-production) for build instructions.

---

**Need help?** Check [SETUP.md](SETUP.md) for detailed instructions.
