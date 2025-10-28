# Authentication Implementation

The Thimblely mobile app enforces authentication using Supabase Auth and Apollo Client.

## Components

### 1. `useAuth` Hook (`src/hooks/useAuth.ts`)

Provides authentication state and functions:

```typescript
const { user, isAuthenticated, isLoading, checkAuth, signOut } = useAuth();
```

**Features:**

- Monitors Supabase auth state changes
- Fetches user profile via GraphQL
- Provides sign out functionality
- Clears Apollo cache on sign out

### 2. `AuthProvider` Context (`src/contexts/AuthContext.tsx`)

Wraps the app to provide auth state globally:

```tsx
import { AuthProvider } from './contexts/AuthContext';

<AuthProvider>{children}</AuthProvider>;
```

**Usage:**

```typescript
import { useAuthContext } from './contexts/AuthContext';

const { user, isAuthenticated, isLoading } = useAuthContext();
```

### 3. `ProtectedRoute` Component (`src/components/ProtectedRoute.tsx`)

Protects routes requiring authentication:

```tsx
import { ProtectedRoute } from './components/ProtectedRoute';

<ProtectedRoute fallback={<LoginScreen />}>
  <ProtectedContent />
</ProtectedRoute>;
```

## How It Works

1. **AuthProvider** wraps the entire app in `App.tsx`
2. **useAuth** hook monitors Supabase auth state changes
3. When user signs in/out, state updates automatically
4. Apollo Client queries include auth tokens
5. Protected routes check authentication status

## Usage Examples

### Get Current User

```typescript
import { useAuthContext } from './contexts/AuthContext';

function MyComponent() {
  const { user, isLoading } = useAuthContext();

  if (isLoading) return <Loading />;
  if (!user) return <LoginPrompt />;

  return <Welcome user={user} />;
}
```

### Sign Out

```typescript
import { useAuthContext } from './contexts/AuthContext';

function Settings() {
  const { signOut } = useAuthContext();

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      // Navigate to login
    }
  };

  return <Button onPress={handleSignOut} title="Sign Out" />;
}
```

### Protect a Screen

```typescript
import { ProtectedRoute } from './components/ProtectedRoute';

function OrderScreen() {
  return (
    <ProtectedRoute fallback={<LoginRedirect />}>
      <OrdersList />
    </ProtectedRoute>
  );
}
```

## Auth State Changes

The app listens for these Supabase events:

- `SIGNED_IN` - User successfully signs in
- `SIGNED_OUT` - User signs out
- `TOKEN_REFRESHED` - Auth token is refreshed

## Notes

- Auth state persists across app restarts
- User profile is fetched via GraphQL on authentication
- Apollo cache is cleared on sign out
- All GraphQL requests include auth headers automatically
