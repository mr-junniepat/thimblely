# Thimblely Mobile Setup Guide

Quick setup guide for the Thimblely mobile app.

## Prerequisites

1. **Install Node.js**

   - Download from [nodejs.org](https://nodejs.org/)
   - Recommended: v18 or higher

2. **Install Expo CLI**

   ```bash
   npm install -g expo-cli
   ```

3. **Install Expo Go App** (for testing on physical device)

   - iOS: Download from App Store
   - Android: Download from Play Store

4. **Install iOS Simulator** (Mac only)

   ```bash
   xcode-select --install
   ```

5. **Install Android Studio** (for Android development)
   - Download from [developer.android.com](https://developer.android.com/studio)
   - Install Android SDK and emulator

## Initial Setup

1. **Navigate to mobile app directory**

   ```bash
   cd apps/mobile
   ```

2. **Install dependencies**

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Build the shared library** (if not already done)

   ```bash
   cd ../../libs/shared
   npm run build
   cd ../../apps/mobile
   ```

4. **Add asset files**

   Place the following files in `assets/images/`:

   - `icon.png` (1024x1024px)
   - `adaptive-icon.png` (1024x1024px)
   - `splash-icon.png` (200x200px recommended)
   - `favicon.png` (48x48px recommended)

   Or use the placeholder assets from `libs/shared/src/images/`

## Running the App

### Development Server

```bash
npm start
```

This will start the Expo development server and show a QR code.

### iOS Simulator

```bash
npm run ios
```

Or press `i` in the terminal after running `npm start`

### Android Emulator

```bash
npm run android
```

Or press `a` in the terminal after running `npm start`

### Physical Device

1. Install Expo Go app on your device
2. Run `npm start`
3. Scan the QR code with:
   - iOS: Camera app
   - Android: Expo Go app

## Common Issues

### Issue: "Unable to resolve module"

**Solution:**

```bash
# Clear cache and restart
expo start --clear

# Or reset Metro bundler
rm -rf node_modules
npm install --legacy-peer-deps
```

### Issue: "Network response timed out"

**Solution:**

```bash
# Use tunnel connection
expo start --tunnel
```

### Issue: Images not loading

**Solution:**

- Ensure images exist in `assets/images/` or `libs/shared/src/images/`
- Check babel.config.js has correct module resolution
- Clear cache: `expo start --clear`

### Issue: TypeScript errors

**Solution:**

```bash
# Rebuild shared library
cd ../../libs/shared
npm run build
cd ../../apps/mobile
```

### Issue: GraphQL client not connecting

**Solution:**

- Check `libs/shared/src/lib/graphql/client.ts` has correct API URL
- Ensure backend server is running
- Check network connection

## Project Structure Quick Reference

```
apps/mobile/
├── src/
│   ├── App.tsx              # Entry point with navigation
│   ├── components/          # Reusable components
│   ├── navigation/          # Navigation setup
│   └── screens/            # All app screens
├── assets/                 # Static assets
├── app.json               # Expo config
└── package.json
```

## Development Workflow

1. **Start dev server**: `npm start`
2. **Make changes** to code
3. **Hot reload** happens automatically
4. **Test** on simulator/device
5. **Commit** changes when ready

## Testing on Device

### iOS (Physical Device)

1. Connect iPhone via USB
2. Trust computer on device
3. Run `npm run ios`
4. Or scan QR code with Camera app

### Android (Physical Device)

1. Enable Developer Mode on device
2. Enable USB Debugging
3. Connect via USB
4. Run `npm run android`
5. Or scan QR code with Expo Go

## Environment Setup

### VS Code Extensions (Recommended)

- React Native Tools
- React-Native/React/Redux snippets
- ESLint
- Prettier

### VS Code Settings

```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Building for Production

See [Building for Production](README.md#building-for-production) section in README.md

## Need Help?

- Check [Expo Documentation](https://docs.expo.dev/)
- Review [React Navigation Docs](https://reactnavigation.org/)
- See main project [README.md](../../README.md)

## Next Steps

1. ✅ Complete initial setup
2. ✅ Run app on simulator/device
3. 🔲 Set up backend connection
4. 🔲 Configure GraphQL client
5. 🔲 Test authentication flow
6. 🔲 Add custom fonts (Outfit family)
7. 🔲 Customize app.json with your details
8. 🔲 Build and test on real devices
