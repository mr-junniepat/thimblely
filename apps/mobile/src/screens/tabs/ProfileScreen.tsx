import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import { Edit3, Plus, Menu, Bell } from 'lucide-react-native';
import { faker } from '@faker-js/faker';
import { Header, AccountSettingsModal } from '../../components';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  blue: '#1A73E8',
};

// Mock user data
const user = {
  name: 'Marcus Rodriguez',
  username: '@marcus_sews',
  bio: 'Bio...',
  avatar: faker.image.avatar(),
  posts: 342,
  followers: '67k',
  following: 3,
  role: 'Designer',
};

const stats = [
  { label: 'Posts', value: user.posts },
  { label: 'Followers', value: user.followers },
  { label: 'Following', value: user.following },
];

// Mock posts data
const posts = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  image: faker.image.url(),
}));

export default function ProfileScreen({ navigation }: any) {
  const [showAccountSettings, setShowAccountSettings] = useState(false);

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
              source={{ uri: user.avatar }}
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
            {user.name}
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
            {user.username}
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
              {user.role}
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
            {user.bio}
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
          <View
            style={[
              tw`px-4 py-2 border-b`,
              {
                borderBottomColor: colors.complimentary,
                borderBottomWidth: 1,
                height: 48,
                justifyContent: 'center',
              },
            ]}
          >
            <Text
              style={[
                tw`text-sm font-bold`,
                {
                  color: colors.complimentary,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Posts
            </Text>
          </View>
          <View
            style={[tw`px-4 py-2`, { height: 48, justifyContent: 'center' }]}
          >
            <Text
              style={[
                tw`text-sm font-normal`,
                {
                  color: colors.greyText,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Bookmarks
            </Text>
          </View>
        </View>

        {/* Posts Grid */}
        <View style={tw`px-4`}>
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
      >
        <Plus size={24} color="white" />
      </TouchableOpacity>

      {/* Account Settings Modal */}
      <AccountSettingsModal
        visible={showAccountSettings}
        onClose={() => setShowAccountSettings(false)}
        navigation={navigation}
      />
    </View>
  );
}
