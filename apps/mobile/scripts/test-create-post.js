/**
 * Test script to create a sample post
 * Run with: node apps/mobile/scripts/test-create-post.js
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl =
  process.env.EXPO_PUBLIC_SUPABASE_URL ||
  'https://cottrjlfppzrgwjnmnir.supabase.co';
const supabaseKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvdHRyamxmcHB6cmd3am5tbmlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MDc3MjAsImV4cCI6MjA3NzE4MzcyMH0.KYGnscjq_qw9icoTTdg7FD5F2PlUF-Tv1iB27sd0uZM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createSamplePost() {
  try {
    console.log('Testing feed creation...');

    // First, let's test if we can read from feeds
    const { data: feeds, error: feedError } = await supabase
      .from('feeds')
      .select('id')
      .limit(1);

    console.log('Feeds table accessible:', !feedError);
    console.log('Existing feeds:', feeds);

    // Try to create a post with a test user ID
    // You'll need to replace this with an actual user ID from your auth.users table
    const testUserId = '00000000-0000-0000-0000-000000000000'; // Replace with real ID

    const { data, error } = await supabase
      .from('feeds')
      .insert({
        user_id: testUserId,
        feed_type: 'photo',
        caption: 'Test post',
        media_urls: [
          'https://images.unsplash.com/photo-1594938291221-94ad36ebe3b8?w=400',
        ],
        visibility: 'public',
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Error creating post:', error.message);
      return;
    }

    console.log('✅ Post created:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

createSamplePost();
