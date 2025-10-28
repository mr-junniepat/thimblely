-- Add RLS policies for feeds table
-- Allow users to create their own posts
CREATE POLICY "Users can insert own posts" ON public.feeds
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Allow users to view public posts
CREATE POLICY "Users can view public posts" ON public.feeds
  FOR SELECT
  USING (visibility = 'public');

-- Allow users to view own posts
CREATE POLICY "Users can view own posts" ON public.feeds
  FOR SELECT
  USING (user_id = auth.uid());

-- Allow users to update own posts
CREATE POLICY "Users can update own posts" ON public.feeds
  FOR UPDATE
  USING (user_id = auth.uid());

-- Service role can do everything
CREATE POLICY "Service role bypasses RLS on feeds" ON public.feeds
  FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

