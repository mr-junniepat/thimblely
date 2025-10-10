# Thimblely Quick Start Guide

Get up and running with Thimblely in minutes!

## Prerequisites

Before you begin, ensure you have:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for version control)

For mobile development, you'll also need:
- **iOS**: macOS with Xcode installed
- **Android**: Android Studio with an emulator set up
- **Physical Device**: Expo Go app installed

## Installation

### 1. Clone or Navigate to the Project

```bash
cd ~/Desktop/sideprojects/thimblely
```

### 2. Install Dependencies

```bash
npm install
```

This will install all dependencies for the workspace, including both apps and the shared library.

## Running the Landing Page

### Development Mode

```bash
npm run dev:landing
```

Or using Nx directly:

```bash
npx nx dev landing
```

The landing page will be available at:
**http://localhost:4200**

### What You'll See

- Modern, responsive landing page
- Hero section with call-to-action
- Feature cards with icons
- Statistics section
- Footer with links

## Running the Mobile App

### Start the Development Server

```bash
npm run dev:mobile
```

Or using Nx directly:

```bash
npx nx start mobile
```

### Run on a Device

Once the dev server is running, you have several options:

#### Option 1: iOS Simulator (macOS only)

```bash
npx nx run-ios mobile
```

#### Option 2: Android Emulator

```bash
npx nx run-android mobile
```

#### Option 3: Physical Device

1. Install the **Expo Go** app on your phone
2. Scan the QR code shown in your terminal
3. The app will load on your device

### What You'll See

- Home screen with feature cards
- Navigation to detail screens
- Statistics display
- Touch interactions

## Project Structure

```
apps/
├── landing/    # Next.js web app (port 4200)
└── mobile/     # React Native/Expo app

libs/
└── shared/     # Shared code (GraphQL, types, utils)
```

## Making Changes

### Edit the Landing Page

Try editing `apps/landing/src/components/Hero.tsx`:

```typescript
<h1 className={styles.title}>
  Your Updated Title Here
</h1>
```

The page will hot-reload automatically!

### Edit the Mobile App

Try editing `apps/mobile/src/screens/HomeScreen.tsx`:

```typescript
<Text style={styles.title}>Your Updated Title</Text>
```

The app will hot-reload on your device/simulator!

### Using the Shared Library

Both apps can use the shared library:

```typescript
import { formatDate, GET_ITEMS } from '@thimblely/shared';
```

## Common Commands

### Development

```bash
npm run dev:landing       # Start landing page
npm run dev:mobile       # Start mobile app
```

### Building

```bash
npm run build:landing    # Build landing page for production
npm run build:mobile    # Build mobile app
```

### Nx Commands

```bash
npx nx graph            # View project dependency graph
npx nx build shared     # Build shared library
npx nx sync            # Sync workspace configuration
```

## Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/graphql
```

## Troubleshooting

### Port Already in Use

If port 4200 is in use:

```bash
npx nx dev landing --port 3000
```

### Build Errors

Sync the workspace:

```bash
npx nx sync
```

### Module Not Found

Rebuild the shared library:

```bash
npx nx build shared
```

### Mobile App Not Loading

1. Make sure you're on the same WiFi network
2. Try restarting the dev server
3. Clear the cache: `npx nx reset`

### TypeScript Errors

Make sure all dependencies are installed:

```bash
npm install
```

## Next Steps

1. **Explore the Code**: Check out the components and screens
2. **Add Features**: Try adding new GraphQL queries in `libs/shared`
3. **Customize Design**: Update colors in the CSS files
4. **Add Pages**: Create new routes in both apps
5. **Connect Backend**: Set up your GraphQL API and update the endpoint

## Useful Resources

- [Nx Documentation](https://nx.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Lucide Icons](https://lucide.dev/)

## Getting Help

- Check the [README.md](./README.md) for detailed information
- Review [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for architecture details
- Look at example code in the apps

## Development Tips

### Hot Reload

Both apps support hot reload. Changes appear instantly without refreshing.

### Component Development

Create reusable components in the shared library for use across apps.

### GraphQL First

Define all API operations in `libs/shared/src/lib/graphql/`.

### Type Safety

Define types in `libs/shared/src/lib/types/` and use them everywhere.

### Icon Usage

Always use Lucide icons:
- Web: `lucide-react`
- Mobile: `lucide-react-native`

## Success! 🎉

You're now ready to build with Thimblely! Start by making small changes and see them appear in real-time.

Happy coding! 👨‍💻👩‍💻

