# Thimblely

A modern mobile and web application built with Nx monorepo architecture.

## 🏗️ Architecture

This is an Nx monorepo containing:

- **Landing Page** (`apps/landing`) - Next.js landing page
- **Mobile App** (`apps/mobile`) - React Native/Expo mobile app
- **Shared Library** (`libs/shared`) - Common code, GraphQL queries, types, and utilities

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- Expo CLI (for mobile development)

### Installation

```bash
# Install dependencies
npm install
```

### Development

#### Run the Landing Page

```bash
nx dev landing
```

The landing page will be available at `http://localhost:4200`

#### Run the Mobile App

```bash
# Start the Expo development server
nx start mobile

# Run on iOS simulator
nx run-ios mobile

# Run on Android emulator
nx run-android mobile
```

### Building

#### Build Landing Page

```bash
nx build landing
```

#### Build Mobile App

```bash
# Create production build
nx build mobile

# Create EAS build
nx prebuild mobile
```

## 📁 Project Structure

```
thimblely/
├── apps/
│   ├── landing/          # Next.js landing page
│   │   ├── src/
│   │   │   ├── app/      # App router pages
│   │   │   └── components/ # React components
│   │   └── package.json
│   └── mobile/           # React Native/Expo app
│       ├── src/
│       │   ├── app/      # Main app component
│       │   ├── navigation/ # Navigation configuration
│       │   ├── screens/  # Screen components
│       │   └── components/ # Reusable components
│       └── package.json
├── libs/
│   └── shared/           # Shared library
│       └── src/
│           └── lib/
│               ├── graphql/  # GraphQL queries & mutations
│               ├── types/    # TypeScript types
│               └── utils/    # Utility functions
└── package.json
```

## 🎨 Design Principles

- **Color Coding**: Solid colors only, no gradients
- **Lucide Icons**: Using lucide-react and lucide-react-native for icons
- **Repository Pattern**: Following repository pattern for data access
- **GraphQL**: All API communication uses GraphQL

## 🛠️ Tech Stack

### Web (Landing Page)
- **Framework**: Next.js 15 with App Router
- **Styling**: CSS Modules
- **State Management**: Apollo Client
- **Icons**: Lucide React

### Mobile
- **Framework**: React Native with Expo
- **Navigation**: React Navigation
- **State Management**: Apollo Client
- **Icons**: Lucide React Native

### Shared
- **API Client**: Apollo Client
- **Query Language**: GraphQL
- **Language**: TypeScript

## 📦 Available Scripts

```bash
# Development
nx dev landing              # Start landing page dev server
nx start mobile            # Start mobile app dev server

# Building
nx build landing           # Build landing page
nx build mobile           # Build mobile app

# Type checking
nx typecheck landing       # Type check landing page
nx typecheck mobile       # Type check mobile app
nx typecheck shared       # Type check shared library

# Graph
nx graph                  # View project dependency graph
```

## 🌐 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/graphql
```

## 📱 Mobile App Features

- Modern UI with React Native
- Navigation with React Navigation
- GraphQL integration
- Type-safe with TypeScript
- Cross-platform (iOS & Android)

## 🌍 Landing Page Features

- Server-side rendering with Next.js
- Modern, responsive design
- GraphQL integration
- Optimized performance
- SEO-friendly

## 🤝 Contributing

1. Create a new branch
2. Make your changes
3. Submit a pull request

## 📄 License

MIT
# thimblely
