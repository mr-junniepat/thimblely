/**
 * Test script to create a sample post with authentication
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://cottrjlfppzrgwjnmnir.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvdHRyamxmcHB6cmd3am5tbmlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MDc3MjAsImV4cCI6MjA3NzE4MzcyMH0.KYGnscjq_qw9icoTTdg7FD5F2PlUF-Tv1iB27sd0uZM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createSamplePost() {
  try {
    console.log('Signing in...');
    
    // Sign in with a test account
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'test123',
    });

    if (authError) {
      console.log('Auth error (expected):', authError.message);
      console.log('\nTo create a post, you need to:');
      console.log('1. Sign in to your account in the app');
      console.log('2. Then tap the plus button to create a post');
      return;
    }

    const userId = authData.user.id;
    console.log('✅ Signed in as:', userId);

    const { data, error } = await supabase
      .from('feeds')
      .insert({
        user_id: userId,
        feed_type: 'photo',
        caption: 'Test post from script',
        media_urls: ['https://images.unsplash.com/photo-1594938291221-94ad36ebe3b8?w=400'],
        visibility: 'public',
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Error:', error);
      return;
    }

    console.log('✅ Post created:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

createSamplePost();

