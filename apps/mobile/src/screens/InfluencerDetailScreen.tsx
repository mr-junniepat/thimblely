import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
// Import colors directly from the source file
const colors = {
  complimentary: '#A30552',
  greyText: '#68666F',
  black: '#111113',
};
import tw from 'twrnc';
import { ChevronLeft, Calendar, Plus, Share } from 'lucide-react-native';
import { faker } from '@faker-js/faker';

interface InfluencerDetailScreenProps {
  route: any;
  navigation: any;
}

export default function InfluencerDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { influencer } = route.params as { influencer: any };

  if (!influencer) return null;

  // Mock data for specialties
  const specialties = ['Sewing Expert', 'Sustainable Fashion', 'Upcycling'];

  // Mock data for recent posts
  const recentPosts = Array.from({ length: 3 }, (_, i) => ({
    id: (i + 1).toString(),
    image: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
    title: 'Transformed an old sweater...',
  }));

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Status Bar Space */}
      <View style={tw`h-12`} />

      {/* Header with Back Button */}
      <View
        style={{
          paddingHorizontal: 24,
          paddingVertical: 16,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginRight: 16 }}
        >
          <ChevronLeft size={24} color={colors.black} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Main Content */}
        <View
          style={{
            paddingHorizontal: 24,
            paddingTop: 24,
          }}
        >
          {/* Profile Section */}
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            {/* Avatar */}
            <View
              style={{
                width: 122,
                height: 122,
                borderRadius: 61,
                backgroundColor: '#F5F5F7',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                marginBottom: 16,
              }}
            >
              <Image
                source={{ uri: influencer.avatar }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </View>

            {/* Name and Username */}
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: colors.black,
                textAlign: 'center',
                marginBottom: 8,
                fontFamily: 'Outfit-Regular',
              }}
            >
              {influencer.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: colors.greyText,
                textAlign: 'center',
                marginBottom: 8,
                fontFamily: 'Outfit-Regular',
              }}
            >
              {influencer.username}
            </Text>

            {/* Category Badge */}
            <View
              style={{
                backgroundColor: influencer.categoryBgColor,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 32,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: influencer.categoryColor,
                  fontFamily: 'Outfit-Regular',
                }}
              >
                {influencer.category}
              </Text>
            </View>
          </View>

          {/* Stats Section */}
          <View
            style={{
              backgroundColor: '#F5F5F7',
              height: 71,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 24,
              marginBottom: 24,
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: '#1A73E8',
                  fontFamily: 'Outfit-Bold',
                }}
              >
                {influencer.followers}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: colors.greyText,
                  fontFamily: 'Outfit-Regular',
                }}
              >
                Followers
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: '#087E34',
                  fontFamily: 'Outfit-Bold',
                }}
              >
                {influencer.posts}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: colors.greyText,
                  fontFamily: 'Outfit-Regular',
                }}
              >
                Posts
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: colors.complimentary,
                  fontFamily: 'Outfit-Bold',
                }}
              >
                {specialties.length}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: colors.greyText,
                  fontFamily: 'Outfit-Regular',
                }}
              >
                Specialties
              </Text>
            </View>
          </View>

          {/* About Section */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: colors.greyText,
                marginBottom: 8,
                fontFamily: 'Outfit-Regular',
              }}
            >
              About
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: colors.black,
                fontFamily: 'Outfit-Regular',
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Lectus tortor quam amet
              tempus a sit.
            </Text>
          </View>

          {/* Account Information */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: colors.greyText,
                marginBottom: 12,
                fontFamily: 'Outfit-Regular',
              }}
            >
              Account Information
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Calendar size={14} color={colors.black} />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: colors.black,
                  marginLeft: 8,
                  fontFamily: 'Outfit-Regular',
                }}
              >
                Joined June 2022
              </Text>
            </View>
          </View>

          {/* Specialties Section */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: colors.greyText,
                marginBottom: 8,
                fontFamily: 'Outfit-Regular',
              }}
            >
              Specialties
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {specialties.map((specialty, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: 'rgba(26,115,232,0.1)',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 32,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: '#1A73E8',
                      fontFamily: 'Outfit-Regular',
                    }}
                  >
                    {specialty}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Recent Posts Section */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: colors.greyText,
                marginBottom: 8,
                fontFamily: 'Outfit-Regular',
              }}
            >
              Recent Posts
            </Text>
            <View style={{ flexDirection: 'row', gap: 12, height: 172 }}>
              {recentPosts.map((post) => (
                <View key={post.id} style={{ flex: 1, gap: 8 }}>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: '#F5F5F7',
                      borderRadius: 8,
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      source={{ uri: post.image }}
                      style={{ width: '100%', height: '100%' }}
                      resizeMode="cover"
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '400',
                      color: colors.black,
                      fontFamily: 'Outfit-Regular',
                    }}
                    numberOfLines={2}
                  >
                    {post.title}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={{ gap: 12, marginBottom: 24 }}>
            {/* Follow Button */}
            <TouchableOpacity
              style={{
                backgroundColor: colors.complimentary,
                paddingVertical: 16,
                borderRadius: 32,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <Plus size={12} color="white" />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: 'white',
                  fontFamily: 'Outfit-Regular',
                }}
              >
                Follow
              </Text>
            </TouchableOpacity>

            {/* Share Profile Button */}
            <TouchableOpacity
              style={{
                backgroundColor: '#F5F5F7',
                paddingVertical: 16,
                borderRadius: 32,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <Share size={16} color={colors.black} />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: colors.black,
                  fontFamily: 'Outfit-Regular',
                }}
              >
                Share Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
