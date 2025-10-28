# EAS Build Instructions for Android APK

## Setup (One Time)

1. **Install EAS CLI:**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo:**
   ```bash
   eas login
   ```

3. **Configure Project:**
   ```bash
   eas init
   ```
   This will create `.easrc.json` with your project ID.

## Building APK

### Option 1: Preview Build (Recommended for Testing)
```bash
eas build --profile preview --platform android
```

This creates an APK for internal testing.

### Option 2: Development Build (For Development)
```bash
eas build --profile development --platform android
```

### Option 3: Production Build (Store Ready)
```bash
eas build --profile production --platform android
```

## Download APK

After build completes:
1. Visit the build URL shown in terminal
2. Or check: https://expo.dev/accounts/[your-account]/projects/thimblely/builds
3. Download the APK file
4. Install on Android device

## OTA Updates Configuration

### Initial Setup
The app is already configured for OTA updates in `app.json`:
- Updates URL: Pointing to Expo's updates service
- Runtime version policy: appVersion
- Fallback timeout: 0ms

### Publishing OTA Updates

1. **Make code changes** (e.g., bug fixes, UI improvements)

2. **Publish update:**
   ```bash
   eas update --branch production --message "Bug fixes and improvements"
   ```

3. **Users get update automatically** on next app open (no rebuild needed!)

### Update Channels

- **Production:** `eas update --branch production`
- **Preview:** `eas update --branch preview`

### Force Immediate Update Check
Add this to your app for immediate updates:
```typescript
import * as Updates from 'expo-updates';

// Check for updates on app start
Updates.checkForUpdateAsync().then((update) => {
  if (update.isAvailable) {
    Updates.fetchUpdateAsync().then(() => {
      Updates.reloadAsync();
    });
  }
});
```

## Important Notes

- **APK Size:** ~20-50MB depending on assets
- **Build Time:** 15-20 minutes
- **OTA Updates:** Only works for JS/React Native changes, not native code
- **Native Changes:** Require new build (e.g., adding new packages)
- **Environment Variables:** Already configured for Supabase in `eas.json`

## Troubleshooting

- **Build fails:** Check `eas.json` syntax
- **OTA not working:** Verify `runtimeVersion` matches build version
- **APK won't install:** Enable "Install from unknown sources" on Android

