-- Fix infinite recursion in profiles RLS policies
-- The recursion happens because policies are checking columns that trigger additional queries

-- Step 1: Drop ALL existing policies on profiles
DROP POLICY IF EXISTS "Public profiles viewable by authenticated users" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Service role bypasses RLS" ON public.profiles;

-- Step 2: Temporarily disable RLS to break recursion
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Step 3: Re-enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Step 4: Create safe policies (no is_active check, no recursion triggers)
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Note: We do NOT add a "public profiles viewable" policy to prevent recursion
