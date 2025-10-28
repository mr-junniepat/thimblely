# Quick Auth Fix

Your app is trying to connect to local auth at `http://localhost:54324` but there's a database schema issue.

## Quick Fix

1. **Create a Supabase account**: https://app.supabase.com
2. **Create a new project**
3. **Update your `.env` file** in `apps/mobile/`:

```env
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

4. **Restart Expo**: The app will now use Supabase Cloud auth (signup, login, OTP all work)

## What's the Issue?

- GoTrue is Supabase's auth server (what powers their authentication)
- We're running it locally in Docker
- It needs to connect to the `auth` schema in Postgres
- There's a schema search path configuration issue

## Alternative

Use the Supabase CLI instead of Docker:

```bash
npx supabase start
```

This sets everything up correctly.
