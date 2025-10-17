import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { colors } from '@thimblely/shared';
import tw from 'twrnc';
import { Header } from '../../components';
import {
  Settings,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Edit3,
  Camera,
  Share,
  ChevronRight,
} from 'lucide-react-native';
import { faker } from '@faker-js/faker';

// Mock user data
const user = {
  name: 'Sarah Johnson',
  username: '@sarahcreates',
  bio: 'Fashion designer & sewing enthusiast. Creating sustainable fashion one stitch at a time.',
  avatar: faker.image.avatar(),
  followers: '12.4k',
  following: '1.2k',
  posts: 156,
  verified: true,
  location: 'San Francisco, CA',
  joinedDate: 'Joined March 2023',
};

const stats = [
  { label: 'Posts', value: user.posts },
  { label: 'Followers', value: user.followers },
  { label: 'Following', value: user.following },
];

const menuItems = [
  {
    id: '1',
    title: 'Edit Profile',
    icon: Edit3,
    hasArrow: true,
  },
  {
    id: '2',
    title: 'Notifications',
    icon: Bell,
    hasArrow: true,
  },
  {
    id: '3',
    title: 'Privacy & Security',
    icon: Shield,
    hasArrow: true,
  },
  {
    id: '4',
    title: 'Help & Support',
    icon: HelpCircle,
    hasArrow: true,
  },
  {
    id: '5',
    title: 'Settings',
    icon: Settings,
    hasArrow: true,
  },
];

export default function ProfileScreen() {
  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Status Bar Space */}
      <View style={tw`h-12`} />

      {/* Header */}
      <Header title="Profile" rightIcon={Settings} showLogo={false} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Profile Header */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <View style={tw`items-center mb-6`}>
            {/* Avatar */}
            <View style={{ position: 'relative', marginBottom: 16 }}>
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: '#F5F5F7',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <Image
                  source={{ uri: user.avatar }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
              </View>
              {user.verified && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: colors.complimentary,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{ color: 'white', fontSize: 12, fontWeight: '700' }}
                  >
                    ✓
                  </Text>
                </View>
              )}
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: colors.greyText,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Camera size={14} color="white" />
              </TouchableOpacity>
            </View>

            {/* Name and Username */}
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: colors.black,
                marginBottom: 4,
              }}
            >
              {user.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: colors.greyText,
                marginBottom: 8,
              }}
            >
              {user.username}
            </Text>

            {/* Bio */}
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: colors.black,
                textAlign: 'center',
                lineHeight: 20,
                marginBottom: 12,
              }}
            >
              {user.bio}
            </Text>

            {/* Location and Join Date */}
            <View style={tw`flex-row items-center gap-4 mb-6`}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: colors.greyText,
                }}
              >
                📍 {user.location}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: colors.greyText,
                }}
              >
                {user.joinedDate}
              </Text>
            </View>

            {/* Stats */}
            <View style={tw`flex-row gap-8 mb-6`}>
              {stats.map((stat, index) => (
                <View key={index} style={tw`items-center`}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '700',
                      color: colors.black,
                    }}
                  >
                    {stat.value}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: colors.greyText,
                    }}
                  >
                    {stat.label}
                  </Text>
                </View>
              ))}
            </View>

            {/* Action Buttons */}
            <View style={tw`flex-row gap-3`}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: colors.complimentary,
                  paddingVertical: 12,
                  borderRadius: 24,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: 'white',
                  }}
                >
                  Edit Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: '#F5F5F7',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Share size={20} color={colors.complimentary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={{ paddingHorizontal: 24 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: colors.black,
              marginBottom: 16,
            }}
          >
            Account
          </Text>
          <View
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.05)',
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 16,
                  borderBottomWidth: index < menuItems.length - 1 ? 1 : 0,
                  borderBottomColor: 'rgba(0,0,0,0.05)',
                }}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: `${colors.complimentary}20`,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                  }}
                >
                  <item.icon size={16} color={colors.complimentary} />
                </View>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 14,
                    fontWeight: '500',
                    color: colors.black,
                  }}
                >
                  {item.title}
                </Text>
                {item.hasArrow && (
                  <ChevronRight size={16} color={colors.greyText} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: 'rgba(239,68,68,0.2)',
              borderRadius: 12,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: 'rgba(239,68,68,0.1)',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <LogOut size={16} color="#EF4444" />
            </View>
            <Text
              style={{
                flex: 1,
                fontSize: 14,
                fontWeight: '500',
                color: '#EF4444',
              }}
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
