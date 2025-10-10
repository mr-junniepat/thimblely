# Thimblely Project Structure

## Overview

This document outlines the structure and organization of the Thimblely monorepo.

## Directory Structure

```
thimblely/
├── apps/                    # Application projects
│   ├── landing/            # Next.js landing page
│   │   ├── src/
│   │   │   ├── app/        # Next.js App Router
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   └── global.css
│   │   │   └── components/ # React components
│   │   │       ├── ApolloWrapper.tsx
│   │   │       ├── Hero.tsx
│   │   │       ├── Features.tsx
│   │   │       ├── CTA.tsx
│   │   │       └── Footer.tsx
│   │   ├── public/         # Static assets
│   │   ├── next.config.js
│   │   └── package.json
│   │
│   └── mobile/             # React Native/Expo app
│       ├── src/
│       │   ├── app/        # Main app entry
│       │   │   └── App.tsx
│       │   ├── navigation/ # Navigation configuration
│       │   │   └── index.tsx
│       │   ├── screens/    # Screen components
│       │   │   ├── HomeScreen.tsx
│       │   │   └── DetailsScreen.tsx
│       │   └── components/ # Reusable components
│       │       └── FeatureCard.tsx
│       ├── assets/         # Images, fonts, etc.
│       ├── app.json        # Expo configuration
│       ├── metro.config.js
│       └── package.json
│
├── libs/                   # Shared libraries
│   └── shared/            # Common code library
│       └── src/
│           ├── index.ts   # Main export file
│           └── lib/
│               ├── graphql/      # GraphQL operations
│               │   ├── client.ts    # Apollo Client setup
│               │   ├── queries.ts   # GraphQL queries
│               │   ├── mutations.ts # GraphQL mutations
│               │   └── index.ts
│               ├── types/        # TypeScript types
│               │   └── index.ts
│               └── utils/        # Utility functions
│                   └── index.ts
│
├── tools/                  # Build tools and scripts
├── nx.json                 # Nx workspace configuration
├── package.json           # Root package.json
├── tsconfig.base.json     # Base TypeScript configuration
├── .gitignore
├── .env.example
├── README.md
└── PROJECT_STRUCTURE.md   # This file
```

## Application Details

### Landing Page (`apps/landing`)

- **Framework**: Next.js 15 with App Router
- **Styling**: CSS Modules (no gradients, solid colors only)
- **Icons**: Lucide React
- **Data Fetching**: Apollo Client with GraphQL

**Key Components**:
- `Hero`: Main hero section with CTA
- `Features`: Feature cards showcasing app capabilities
- `CTA`: Call-to-action section
- `Footer`: Site footer with links and social media
- `ApolloWrapper`: Client-side Apollo Provider wrapper

### Mobile App (`apps/mobile`)

- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Native Stack)
- **Icons**: Lucide React Native
- **Data Fetching**: Apollo Client with GraphQL

**Key Screens**:
- `HomeScreen`: Main screen with feature list
- `DetailsScreen`: Detail view for features

**Key Components**:
- `FeatureCard`: Reusable card component for features

### Shared Library (`libs/shared`)

The shared library contains code that is used by both the landing page and mobile app.

**GraphQL Module** (`lib/graphql`):
- `client.ts`: Apollo Client configuration
- `queries.ts`: GraphQL query definitions
- `mutations.ts`: GraphQL mutation definitions

**Types Module** (`lib/types`):
- Common TypeScript interfaces and types
- Ensures type safety across apps

**Utils Module** (`lib/utils`):
- `formatDate`: Date formatting utility
- `truncateText`: Text truncation utility
- `debounce`: Debounce function for performance

## Design System

### Colors

Following the "no gradients" rule, all colors are solid:

```css
--primary: #3b82f6      /* Blue */
--primary-dark: #2563eb /* Dark Blue */
--secondary: #8b5cf6    /* Purple */
--accent: #ec4899       /* Pink */
--success: #10b981      /* Green */
--warning: #f59e0b      /* Orange */
--danger: #ef4444       /* Red */
--dark: #1a1a1a        /* Dark Gray */
--light: #f3f4f6       /* Light Gray */
--border: #e5e7eb      /* Border Gray */
```

### Icons

Using Lucide icon library:
- `lucide-react` for web (landing page)
- `lucide-react-native` for mobile

### Typography

- System fonts for optimal performance
- Font weights: 400 (regular), 600 (semibold), 700 (bold), 800 (extrabold)

## Development Workflow

### Adding a New Feature

1. **Define Types**: Add TypeScript types in `libs/shared/src/lib/types/`
2. **Add GraphQL**: Create queries/mutations in `libs/shared/src/lib/graphql/`
3. **Implement UI**: 
   - For web: Add components in `apps/landing/src/components/`
   - For mobile: Add screens/components in `apps/mobile/src/`

### Using the Shared Library

Import from `@thimblely/shared`:

```typescript
import { createApolloClient, GET_ITEMS, Item } from '@thimblely/shared';
```

### Running Commands

```bash
# Development
npm run dev:landing      # Start landing page
npm run dev:mobile      # Start mobile app

# Building
npm run build:landing   # Build landing page
npm run build:mobile   # Build mobile app

# Nx Commands
npx nx graph           # View dependency graph
npx nx build shared    # Build shared library
```

## Best Practices

1. **Repository Pattern**: All data access goes through the shared library
2. **GraphQL First**: Use GraphQL for all API communication
3. **Type Safety**: Define types in the shared library
4. **Component Reusability**: Create reusable components in the shared library when needed
5. **Consistent Styling**: Follow the design system (solid colors, no gradients)
6. **Icon Usage**: Always use Lucide icons

## Environment Variables

Configure in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/graphql
```

## Notes

- The workspace uses npm workspaces for dependency management
- Nx handles build orchestration and caching
- TypeScript is configured with strict mode
- All imports use `.js` extensions for module resolution (TypeScript requirement)

