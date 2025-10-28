# Authentication Setup Guide

This guide explains how to set up and use authentication with Supabase GraphQL in Thimberly.

## Overview

The authentication system uses:

- **Supabase** for backend/auth database
- **Apollo Client** for GraphQL queries
- **Row Level Security (RLS)** for data access control
- **CASL** for permission management

## File Structure

```
libs/shared/src/lib/graphql/schemas/auth/
├── auth.graphql        # GraphQL schema definitions
├── queries.ts          # GraphQL queries
├── mutations.ts        # GraphQL mutations
└── index.ts           # Exports

libs/shared/src/lib/graphql/
├── client.ts           # Apollo Client setup with Supabase
└── index.ts            # Main exports
```

## Environment Variables

Add these to your `.env` files:

```bash
# Supabase URL and Anon Key
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# For React Native / Expo
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Installation

Install required packages:

```bash
# Install Supabase client
npm install @supabase/supabase-js

# Install Apollo Client (if not already installed)
npm install @apollo/client graphql
```

## Usage

### 1. Import GraphQL Operations

```typescript
import {
  SIGN_UP_MUTATION,
  SIGN_IN_MUTATION,
  ME_QUERY,
  MY_WORKSPACES_QUERY,
} from '@thimblely/shared/lib/graphql';

import { client } from '@thimblely/shared/lib/graphql';
```

### 2. Sign Up

```typescript
const signUp = async (
  email: string,
  password: string,
  role: string,
  country_code: string
) => {
  const { data, errors } = await client.mutate({
    mutation: SIGN_UP_MUTATION,
    variables: {
      input: {
        email,
        password,
        role, // 'Business', 'Customer', or 'Admin'
        country_code,
      },
    },
  });

  return data.signUp;
};
```

### 3. Sign In

```typescript
const signIn = async (email: string, password: string) => {
  const { data, errors } = await client.mutate({
    mutation: SIGN_IN_MUTATION,
    variables: {
      input: {
        email,
        password,
      },
    },
  });

  // Store tokens
  const { token, refresh_token } = data.signIn;

  return data.signIn;
};
```

### 4. Get Current User

```typescript
const getCurrentUser = async () => {
  const { data, errors } = await client.query({
    query: ME_QUERY,
    fetchPolicy: 'network-only',
  });

  return data.me;
};
```

### 5. Verify Email

```typescript
const verifyEmail = async (email: string, code: string) => {
  const { data, errors } = await client.mutate({
    mutation: VERIFY_EMAIL_MUTATION,
    variables: {
      input: {
        email,
        code,
      },
    },
  });

  return data.verifyEmail;
};
```

### 6. Social Authentication

```typescript
// Google Sign In
const signInWithGoogle = async (access_token: string, id_token: string) => {
  const { data, errors } = await client.mutate({
    mutation: SIGN_IN_WITH_GOOGLE_MUTATION,
    variables: {
      input: {
        provider: 'google',
        access_token,
        id_token,
      },
    },
  });

  return data.signInWithGoogle;
};

// Apple Sign In
const signInWithApple = async (access_token: string, id_token: string) => {
  const { data, errors } = await client.mutate({
    mutation: SIGN_IN_WITH_APPLE_MUTATION,
    variables: {
      input: {
        provider: 'apple',
        access_token,
        id_token,
      },
    },
  });

  return data.signInWithApple;
};
```

### 7. Create Workspace

```typescript
const createWorkspace = async (
  name: string,
  slug: string,
  business_type: string
) => {
  const { data, errors } = await client.mutate({
    mutation: CREATE_WORKSPACE_MUTATION,
    variables: {
      input: {
        name,
        slug,
        business_type,
      },
    },
  });

  return data.createWorkspace;
};
```

### 8. Invite to Workspace

```typescript
const inviteToWorkspace = async (
  workspace_id: string,
  email: string,
  role: string
) => {
  const { data, errors } = await client.mutate({
    mutation: INVITE_TO_WORKSPACE_MUTATION,
    variables: {
      workspace_id,
      email,
      role, // 'admin', 'manager', 'employee', 'team_member'
    },
  });

  return data.inviteToWorkspace;
};
```

## Available Queries

- `ME_QUERY` - Get current user profile
- `MY_WORKSPACES_QUERY` - Get all workspaces for current user
- `CURRENT_WORKSPACE_QUERY` - Get current active workspace
- `USER_QUERY` - Get a specific user by ID
- `PROFILE_QUERY` - Get a specific profile by ID
- `WORKSPACE_QUERY` - Get a specific workspace by ID
- `WORKSPACE_BY_SLUG_QUERY` - Get a workspace by slug
- `WORKSPACE_MEMBERS_QUERY` - Get workspace members
- `WORKSPACE_INVITATIONS_QUERY` - Get workspace invitations
- `IS_AUTHENTICATED_QUERY` - Check if user is authenticated
- `SESSION_QUERY` - Get current session

## Available Mutations

- `SIGN_UP_MUTATION` - Create a new user account
- `SIGN_IN_MUTATION` - Sign in existing user
- `SIGN_OUT_MUTATION` - Sign out current user
- `VERIFY_EMAIL_MUTATION` - Verify email with code
- `RESEND_VERIFICATION_MUTATION` - Resend verification code
- `SIGN_IN_WITH_GOOGLE_MUTATION` - Sign in with Google
- `SIGN_IN_WITH_APPLE_MUTATION` - Sign in with Apple
- `REQUEST_PASSWORD_RESET_MUTATION` - Request password reset
- `RESET_PASSWORD_MUTATION` - Reset password
- `CHANGE_PASSWORD_MUTATION` - Change password
- `CREATE_WORKSPACE_MUTATION` - Create a workspace
- `INVITE_TO_WORKSPACE_MUTATION` - Invite user to workspace
- `ACCEPT_WORKSPACE_INVITATION_MUTATION` - Accept invitation
- `REMOVE_WORKSPACE_MEMBER_MUTATION` - Remove member from workspace
- `UPDATE_PROFILE_MUTATION` - Update user profile
- `UPDATE_PROFILE_SETTINGS_MUTATION` - Update profile settings

## Security Considerations

1. **RLS Policies**: All workspace-scoped tables must have RLS policies enabled
2. **Permissions**: Check `workspace_members.permissions` for CASL abilities
3. **Token Management**: Store JWT tokens securely (AsyncStorage for React Native)
4. **Password Requirements**: Enforce strong passwords on backend
5. **Email Verification**: Always verify email before full access
6. **Session Management**: Use Supabase built-in session management

## Next Steps

1. Run Supabase migrations to create auth tables
2. Configure RLS policies in Supabase dashboard
3. Set up email templates for verification in Supabase
4. Configure OAuth providers (Google, Apple) in Supabase dashboard
5. Test authentication flow end-to-end

## Reference

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [Security Requirements](../SECURITY_REQUIREMENTS.md)
