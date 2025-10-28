import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import { Edit3, Plus, Menu, Bell } from 'lucide-react-native';
import { useLazyQuery } from '@apollo/client';
import {
  Header,
  AccountSettingsModal,
  EditProfileModal,
} from '../../components';
import { useAuthContext } from '../../contexts/AuthContext';
import { GET_USER_POSTS_QUERY } from '@thimblely/shared/lib/graphql/schemas/auth/queries';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  blue: '#1A73E8',
};

export default function ProfileScreen({ navigation }: any) {
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [activeTab, setActiveTab] = useState<'posts' | 'bookmarks'>('posts');
  const { user } = useAuthContext();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  // GraphQL query to fetch user posts
  const [fetchPosts] = useLazyQuery(GET_USER_POSTS_QUERY, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data?.feedsCollection?.edges) {
        const fetchedPosts = data.feedsCollection.edges.map((edge: any) => ({
          id: edge.node.id,
          // Use first media URL from media_urls JSONB array
          image: edge.node.media_urls?.[0] || '',
          caption: edge.node.caption,
        }));
        setPosts(fetchedPosts);
      }
    },
    onError: (error) => {
      console.error('Error fetching posts:', error);
      // Set empty array instead of fallback data
      setPosts([]);
    },
  });

  useEffect(() => {
    if (user) {
      loadProfile();
      // Fetch posts from database
      fetchPosts({
        variables: { userId: user.id },
      });
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      setLoading(true);

      if (user) {
        // For now, fallback to auth metadata until RLS is fixed
        // TODO: Implement actual GraphQL query when RLS policies are resolved
        const metadata = user.user_metadata || {};
        const userType = metadata.userType || 'customer';
        const firstName = metadata.firstName || '';
        const lastName = metadata.lastName || '';
        const fullName =
          metadata.full_name ||
          `${firstName} ${lastName}`.trim() ||
          user.email?.split('@')[0] ||
          'User';

        setProfile({
          name: fullName,
          username: `@${user.email?.split('@')[0] || 'user'}`,
          bio: metadata.bio || 'Bio...',
          avatar:
            metadata.avatar_url ||
            `https://ui-avatars.com/api/?name=${fullName}&background=A30552&color=FFFFFF&bold=true`,
          // TODO: Replace with actual counts from database queries
          posts: metadata.posts_count || 0,
          followers: metadata.followers_count || 0,
          following: metadata.following_count || 0,
          role: userType === 'business' ? 'Business Owner' : 'Customer',
        });
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const stats = profile
    ? [
        { label: 'Posts', value: profile.posts },
        { label: 'Followers', value: profile.followers },
        { label: 'Following', value: profile.following },
      ]
    : [];

  // Skeleton loader component
  const SkeletonLoader = () => (
    <View style={tw`items-center mb-8`}>
      {/* Avatar skeleton */}
      <View style={tw`mb-4 w-25 h-25 rounded-full bg-gray-200`} />

      {/* Name skeleton */}
      <View style={tw`mb-1 w-32 h-6 rounded bg-gray-200`} />

      {/* Username skeleton */}
      <View style={tw`mb-2 w-24 h-4 rounded bg-gray-200`} />

      {/* Role skeleton */}
      <View style={tw`mb-2 w-20 h-5 rounded-full bg-gray-200`} />

      {/* Bio skeleton */}
      <View style={tw`mb-8 w-48 h-4 rounded bg-gray-200`} />

      {/* Stats skeleton */}
      <View
        style={[tw`flex-row items-center justify-between mb-6`, { width: 329 }]}
      >
        {[1, 2, 3].map((i) => (
          <View key={i} style={[tw`items-center`, { width: 107 }]}>
            <View style={tw`mb-1 w-16 h-6 rounded bg-gray-200`} />
            <View style={tw`w-20 h-4 rounded bg-gray-200`} />
          </View>
        ))}
      </View>

      {/* Button skeleton */}
      <View style={tw`w-11/12 h-12 rounded-full bg-gray-200`} />
    </View>
  );

  if (loading) {
    return (
      <View style={tw`flex-1 bg-white`}>
        <View style={tw`h-12`} />
        <Header showLogo={true} rightIcons={[]} />
        <ScrollView>
          <SkeletonLoader />
        </ScrollView>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={tw`flex-1 bg-white`}>
        <View style={tw`h-12`} />
        <Header showLogo={true} rightIcons={[]} />
        <View style={tw`flex-1 items-center justify-center`}>
          <Text style={tw`text-gray-500`}>Failed to load profile</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Status Bar Space */}
      <View style={tw`h-12`} />

      {/* Header - Using Header Component */}
      <Header
        showLogo={true}
        rightIcons={[
          {
            icon: Bell,
            size: 24,
            color: colors.black,
            onPress: () => navigation.navigate('NotificationsScreen'),
          },
          {
            icon: Menu,
            size: 24,
            color: colors.black,
            onPress: () => setShowAccountSettings(true),
          },
        ]}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Profile Header - Exact Figma Positioning */}
        <View style={tw`items-center mb-8`}>
          {/* Avatar */}
          <View style={tw`mb-4`}>
            <Image
              source={{ uri: profile.avatar }}
              style={tw`w-25 h-25 rounded-full`}
              resizeMode="cover"
            />
          </View>

          {/* Name and Username */}
          <Text
            style={[
              tw`text-base font-bold mb-1`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            {profile.name}
          </Text>
          <Text
            style={[
              tw`text-sm font-normal mb-2`,
              {
                color: colors.greyText,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            {profile.username}
          </Text>

          {/* Role Badge */}
          <View
            style={[
              tw`px-2 py-1 rounded-full mb-2`,
              {
                backgroundColor: 'rgba(26,115,232,0.09)',
              },
            ]}
          >
            <Text
              style={[
                tw`text-xs font-normal`,
                {
                  color: colors.blue,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              {profile.role}
            </Text>
          </View>

          {/* Bio */}
          <Text
            style={[
              tw`text-sm font-normal mb-8`,
              {
                color: colors.greyText,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            {profile.bio}
          </Text>

          {/* Stats - Exact Figma Width (107px each) */}
          <View
            style={[
              tw`flex-row items-center justify-between mb-6`,
              { width: 329 },
            ]}
          >
            {stats.map((stat, index) => (
              <View key={index} style={[tw`items-center`, { width: 107 }]}>
                <Text
                  style={[
                    tw`text-base font-bold mb-1`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  {stat.value}
                </Text>
                <Text
                  style={[
                    tw`text-sm font-normal`,
                    {
                      color: colors.greyText,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>

          {/* Edit Profile Button - Exact Figma Layout */}
          <TouchableOpacity
            style={[
              tw`px-3 py-3 rounded-full flex-row items-center w-11/12 justify-center`,
              {
                backgroundColor: '#F5F5F7',
                gap: 8,
              },
            ]}
            onPress={() => setShowEditProfile(true)}
          >
            <Edit3 size={16} color={colors.complimentary} />
            <Text
              style={[
                tw`text-sm font-normal`,
                {
                  color: colors.complimentary,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Navigation - Exact Figma Height (48px) */}
        <View
          style={[
            tw`flex-row items-center justify-center mb-4`,
            { height: 48 },
          ]}
        >
          {/* Posts Tab */}
          <TouchableOpacity
            onPress={() => setActiveTab('posts')}
            style={[
              tw`px-4 py-2`,
              {
                borderBottomWidth: activeTab === 'posts' ? 1 : 0,
                borderBottomColor:
                  activeTab === 'posts' ? colors.complimentary : 'transparent',
                height: 48,
                justifyContent: 'center',
              },
            ]}
          >
            <Text
              style={[
                tw`text-sm`,
                {
                  color:
                    activeTab === 'posts'
                      ? colors.complimentary
                      : colors.greyText,
                  fontFamily:
                    activeTab === 'posts' ? 'Satoshi Bold' : 'Satoshi Variable',
                  fontWeight: activeTab === 'posts' ? 'bold' : 'normal',
                },
              ]}
            >
              Posts
            </Text>
          </TouchableOpacity>

          {/* Bookmarks Tab */}
          <TouchableOpacity
            onPress={() => setActiveTab('bookmarks')}
            style={[
              tw`px-4 py-2`,
              {
                borderBottomWidth: activeTab === 'bookmarks' ? 1 : 0,
                borderBottomColor:
                  activeTab === 'bookmarks'
                    ? colors.complimentary
                    : 'transparent',
                height: 48,
                justifyContent: 'center',
              },
            ]}
          >
            <Text
              style={[
                tw`text-sm`,
                {
                  color:
                    activeTab === 'bookmarks'
                      ? colors.complimentary
                      : colors.greyText,
                  fontFamily:
                    activeTab === 'bookmarks'
                      ? 'Satoshi Bold'
                      : 'Satoshi Variable',
                  fontWeight: activeTab === 'bookmarks' ? 'bold' : 'normal',
                },
              ]}
            >
              Bookmarks
            </Text>
          </TouchableOpacity>
        </View>

        {/* Posts or Bookmarks Grid */}
        <View style={tw`px-4`}>
          {activeTab === 'posts' ? (
            /* Posts Grid */
            posts.length > 0 ? (
              <>
                <View style={tw`flex-row gap-1 mb-1`}>
                  {posts.slice(0, 3).map((post) => (
                    <View key={post.id} style={tw`flex-1 h-38`}>
                      <Image
                        source={{ uri: post.image }}
                        style={tw`w-full h-full`}
                        resizeMode="cover"
                      />
                    </View>
                  ))}
                </View>
                {posts.length > 3 && (
                  <View style={tw`flex-row gap-1`}>
                    {posts.slice(3, 6).map((post) => (
                      <View key={post.id} style={tw`flex-1 h-38`}>
                        <Image
                          source={{ uri: post.image }}
                          style={tw`w-full h-full`}
                          resizeMode="cover"
                        />
                      </View>
                    ))}
                  </View>
                )}
              </>
            ) : (
              <View style={tw`items-center py-12`}>
                <Text
                  style={[
                    tw`text-base`,
                    {
                      color: colors.greyText,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  No posts yet
                </Text>
              </View>
            )
          ) : /* Bookmarks Grid */
          bookmarks.length > 0 ? (
            <>
              <View style={tw`flex-row gap-1 mb-1`}>
                {bookmarks.slice(0, 3).map((bookmark) => (
                  <View key={bookmark.id} style={tw`flex-1 h-38`}>
                    <Image
                      source={{ uri: bookmark.image }}
                      style={tw`w-full h-full`}
                      resizeMode="cover"
                    />
                  </View>
                ))}
              </View>
              {bookmarks.length > 3 && (
                <View style={tw`flex-row gap-1`}>
                  {bookmarks.slice(3, 6).map((bookmark) => (
                    <View key={bookmark.id} style={tw`flex-1 h-38`}>
                      <Image
                        source={{ uri: bookmark.image }}
                        style={tw`w-full h-full`}
                        resizeMode="cover"
                      />
                    </View>
                  ))}
                </View>
              )}
            </>
          ) : (
            <View style={tw`items-center py-12`}>
              <Text
                style={[
                  tw`text-base`,
                  {
                    color: colors.greyText,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                No bookmarks yet
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Floating Add Button - Exact Figma Position */}
      <TouchableOpacity
        style={[
          tw`absolute w-14 h-14 rounded-full items-center justify-center`,
          {
            backgroundColor: colors.complimentary,
            left: '75%',
            bottom: 106,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.1,
            shadowRadius: 16,
            elevation: 8,
          },
        ]}
        onPress={() => navigation.navigate('CreatePost')}
      >
        <Plus size={24} color="white" />
      </TouchableOpacity>

      {/* Account Settings Modal */}
      <AccountSettingsModal
        visible={showAccountSettings}
        onClose={() => setShowAccountSettings(false)}
        navigation={navigation}
      />

      {/* Edit Profile Modal */}
      <EditProfileModal
        visible={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        profile={{
          name: profile?.name || '',
          username: profile?.username || '',
          bio: profile?.bio || '',
          email: user?.email || '',
          phone: '',
          country: '',
          avatar: profile?.avatar || '',
        }}
        onSave={(updatedProfile: any) => {
          setProfile({ ...profile, ...updatedProfile });
          setShowEditProfile(false);
        }}
      />
    </View>
  );
}
