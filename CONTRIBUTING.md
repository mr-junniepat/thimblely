# Contributing to Thimblely

Thank you for your interest in contributing to Thimblely! This document provides guidelines and instructions for contributing to the project.

## Getting Started

1. **Fork the Repository** (if working on GitHub)
2. **Clone Your Fork**
   ```bash
   git clone <your-fork-url>
   cd thimblely
   ```
3. **Install Dependencies**
   ```bash
   npm install
   ```
4. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Before Making Changes

1. **Sync the workspace**
   ```bash
   npx nx sync
   ```

2. **Build the shared library**
   ```bash
   npx nx build shared
   ```

### Making Changes

#### Adding to the Shared Library

When adding new features that will be used across apps:

1. **Add Types** in `libs/shared/src/lib/types/index.ts`
   ```typescript
   export interface NewFeature {
     id: string;
     name: string;
   }
   ```

2. **Add GraphQL Operations** in `libs/shared/src/lib/graphql/`
   ```typescript
   export const GET_NEW_FEATURE = gql`
     query GetNewFeature($id: ID!) {
       newFeature(id: $id) {
         id
         name
       }
     }
   `;
   ```

3. **Rebuild the shared library**
   ```bash
   npx nx build shared
   ```

#### Modifying the Landing Page

1. Navigate to `apps/landing/src/`
2. Make your changes to components or pages
3. Test locally:
   ```bash
   npm run dev:landing
   ```
4. Build to verify:
   ```bash
   npm run build:landing
   ```

#### Modifying the Mobile App

1. Navigate to `apps/mobile/src/`
2. Make your changes to screens or components
3. Test locally:
   ```bash
   npm run dev:mobile
   ```

## Code Style Guidelines

### General Principles

1. **Follow TypeScript Best Practices**
   - Use strict typing
   - Avoid `any` types
   - Define interfaces in the shared library

2. **Component Structure**
   - Use functional components with hooks
   - Keep components focused and single-purpose
   - Extract reusable logic to custom hooks

3. **Naming Conventions**
   - Components: PascalCase (e.g., `FeatureCard`)
   - Files: PascalCase for components, camelCase for utilities
   - Variables: camelCase
   - Constants: UPPER_SNAKE_CASE

### Design Guidelines

1. **Colors**: Solid colors only, no gradients
   ```css
   /* ✅ Good */
   background-color: #3b82f6;
   
   /* ❌ Bad */
   background: linear-gradient(to right, #3b82f6, #8b5cf6);
   ```

2. **Icons**: Always use Lucide icons
   ```typescript
   // Web
   import { Icon } from 'lucide-react';
   
   // Mobile
   import { Icon } from 'lucide-react-native';
   ```

3. **Spacing**: Use consistent spacing scale
   - 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

### GraphQL Guidelines

1. **All API calls must use GraphQL**
2. **Define operations in the shared library**
3. **Use typed queries and mutations**
   ```typescript
   import { useQuery } from '@apollo/client';
   import { GET_ITEMS, Item } from '@thimblely/shared';
   
   const { data, loading, error } = useQuery<{ items: Item[] }>(GET_ITEMS);
   ```

### Repository Pattern

Follow the repository pattern by:
1. Keeping all data access in the shared library
2. Components should never directly call external APIs
3. Use GraphQL queries/mutations through Apollo Client

## Testing

### Before Submitting

1. **Build all projects**
   ```bash
   npx nx build shared
   npx nx build landing
   ```

2. **Check for TypeScript errors**
   ```bash
   npx nx typecheck shared
   npx nx typecheck landing
   npx nx typecheck mobile
   ```

3. **Test on actual devices** (for mobile changes)
   - iOS simulator/device
   - Android emulator/device

## Commit Guidelines

### Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(landing): add testimonials section

Add a new testimonials section to the landing page
with customer reviews and ratings.

feat(mobile): implement user profile screen

fix(shared): correct date formatting in utils

docs: update README with deployment instructions
```

## Pull Request Process

1. **Update Documentation**
   - Update README.md if needed
   - Add comments to complex code
   - Update QUICKSTART.md if workflow changes

2. **Ensure All Checks Pass**
   - All builds successful
   - No TypeScript errors
   - No console warnings

3. **Write a Clear PR Description**
   - What changes were made
   - Why the changes were necessary
   - How to test the changes
   - Screenshots (for UI changes)

4. **Link Related Issues**
   - Reference issue numbers in the PR description

## Common Tasks

### Adding a New Component

1. Create the component file
2. Export from the appropriate index
3. Add styles (CSS Module for web, StyleSheet for mobile)
4. Test in isolation first
5. Integrate into the app

### Adding a New Screen (Mobile)

1. Create screen in `apps/mobile/src/screens/`
2. Add route in `apps/mobile/src/navigation/index.tsx`
3. Update RootStackParamList type
4. Test navigation flow

### Adding a New Page (Landing)

1. Create page in `apps/landing/src/app/`
2. Follow Next.js App Router conventions
3. Update navigation if needed
4. Test routing and SEO

### Updating GraphQL Schema

1. Update `docs/schema.graphql`
2. Update types in `libs/shared/src/lib/types/`
3. Add/update queries in `libs/shared/src/lib/graphql/`
4. Rebuild shared library
5. Update components using the queries

## Troubleshooting

### Build Errors

```bash
# Clear Nx cache
npx nx reset

# Sync workspace
npx nx sync

# Rebuild shared library
npx nx build shared
```

### Module Resolution Errors

Make sure imports use `.js` extensions for local files:
```typescript
// ✅ Good
export * from './client.js';

// ❌ Bad
export * from './client';
```

### Type Errors

Rebuild the shared library and restart your dev server:
```bash
npx nx build shared
npm run dev:landing  # or dev:mobile
```

## Getting Help

- Review existing code for examples
- Check [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for architecture
- See [QUICKSTART.md](./QUICKSTART.md) for setup help
- Ask questions in pull request comments

## Code of Conduct

- Be respectful and professional
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to Thimblely! 🎉

