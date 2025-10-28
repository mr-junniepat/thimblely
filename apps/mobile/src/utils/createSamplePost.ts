import { supabase } from '../lib/supabase';

/**
 * Create a sample post for testing
 */
export const createSamplePost = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('feeds')
      .insert({
        user_id: userId,
        feed_type: 'photo',
        caption: 'Check out this amazing fashion design!',
        media_urls: [
          'https://images.unsplash.com/photo-1594938291221-94ad36ebe3b8?w=400',
        ],
        visibility: 'public',
        interactions: {
          likes: 0,
          comments: 0,
          shares: 0,
        },
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating sample post:', error);
      return { success: false, error };
    }

    console.log('Sample post created:', data);
    return { success: true, data };
  } catch (error: any) {
    console.error('Error creating sample post:', error);
    return { success: false, error };
  }
};
