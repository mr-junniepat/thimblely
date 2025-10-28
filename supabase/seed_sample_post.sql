-- Insert a sample feed post for testing
-- This script should be run manually or via Supabase SQL Editor

-- First, get a test user_id (replace with actual user ID from your auth.users table)
-- You can run: SELECT id FROM auth.users LIMIT 1; to get a user ID

-- Insert sample feed post
INSERT INTO public.feeds (
  user_id,
  media_urls,
  caption,
  feed_type,
  is_published,
  metadata
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  ARRAY['https://images.unsplash.com/photo-1594938291221-94ad36ebe3b8?w=400']::TEXT[],
  'Check out this amazing fashion design!',
  'photo',
  TRUE,
  '{"location": "New York", "tags": ["fashion", "design", "sustainable"]}'::JSONB
);

-- Verify the post was created
SELECT * FROM public.feeds WHERE caption = 'Check out this amazing fashion design!';

