import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Import colors directly from the source file
const colors = {
  complimentary: '#A30552',
  greyText: '#68666F',
  black: '#111113',
};
import tw from 'twrnc';
import { Plus } from 'lucide-react-native';
import { faker } from '@faker-js/faker';

// Generate mock influencer data matching Figma exactly
const trendingInfluencers = [
  {
    id: '1',
    name: 'Emma Thompson',
    username: '@emmacreates',
    avatar: faker.image.avatar(),
    followers: '67k',
    posts: 342,
    category: 'DIY Fashion',
    categoryColor: '#354D0C',
    categoryBgColor: 'rgba(170,237,59,0.09)',
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    username: '@marcus_sews',
    avatar: faker.image.avatar(),
    followers: '67k',
    posts: 342,
    category: 'Sewing Expert',
    categoryColor: '#354D0C',
    categoryBgColor: 'rgba(170,237,59,0.09)',
  },
  {
    id: '3',
    name: 'Emma Thompson',
    username: '@emmacreates',
    avatar: faker.image.avatar(),
    followers: '67k',
    posts: 342,
    category: 'DIY Fashion',
    categoryColor: '#354D0C',
    categoryBgColor: 'rgba(170,237,59,0.09)',
  },
  {
    id: '4',
    name: 'Marcus Rodriguez',
    username: '@marcus_sews',
    avatar: faker.image.avatar(),
    followers: '67k',
    posts: 342,
    category: 'Sewing Expert',
    categoryColor: '#354D0C',
    categoryBgColor: 'rgba(170,237,59,0.09)',
  },
  {
    id: '5',
    name: 'Emma Thompson',
    username: '@emmacreates',
    avatar: faker.image.avatar(),
    followers: '67k',
    posts: 342,
    category: 'DIY Fashion',
    categoryColor: '#354D0C',
    categoryBgColor: 'rgba(170,237,59,0.09)',
  },
  {
    id: '6',
    name: 'Marcus Rodriguez',
    username: '@marcus_sews',
    avatar: faker.image.avatar(),
    followers: '67k',
    posts: 342,
    category: 'Sewing Expert',
    categoryColor: '#354D0C',
    categoryBgColor: 'rgba(170,237,59,0.09)',
  },
];

interface InfluencersComponentProps {
  searchQuery: string;
}

export default function InfluencersComponent({
  searchQuery,
}: InfluencersComponentProps) {
  const navigation = useNavigation();

  // Filter influencers based on search query
  const filteredInfluencers = trendingInfluencers.filter((influencer) => {
    const matchesSearch =
      influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      influencer.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      influencer.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleInfluencerPress = (influencer: any) => {
    navigation.navigate('InfluencerDetail' as never, { influencer } as never);
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <View
        style={{
          paddingHorizontal: 24,
          paddingTop: 16,
          gap: 16,
        }}
      >
        {/* Section Title */}
        <Text
          style={{
            fontSize: 14,
            fontWeight: '700',
            color: colors.black,
            fontFamily: 'Outfit-Bold',
          }}
        >
          Trending Influencers
        </Text>

        <View style={{ gap: 8 }}>
          {/* Row 1 */}
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {filteredInfluencers.slice(0, 2).map((influencer) => (
              <TouchableOpacity
                key={influencer.id}
                onPress={() => handleInfluencerPress(influencer)}
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  padding: 8,
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.05)',
                }}
              >
                <View style={{ gap: 8, alignItems: 'center' }}>
                  {/* Avatar with Plus Button */}
                  <View style={{ position: 'relative' }}>
                    <View
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                        backgroundColor: '#F5F5F7',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        source={{ uri: influencer.avatar }}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                      />
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: colors.complimentary,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Plus size={20} color="white" />
                    </View>
                  </View>

                  {/* Name and Username */}
                  <View style={{ gap: 4, width: '100%' }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '400',
                        color: colors.black,
                        textAlign: 'center',
                        fontFamily: 'Outfit-Regular',
                      }}
                      numberOfLines={1}
                    >
                      {influencer.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '400',
                        color: colors.greyText,
                        textAlign: 'center',
                        fontFamily: 'Outfit-Regular',
                      }}
                      numberOfLines={1}
                    >
                      {influencer.username}
                    </Text>
                  </View>

                  {/* Stats */}
                  <View style={tw`flex-row items-center w-full`}>
                    <View style={tw`flex-1 items-center gap-1`}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '400',
                          color: colors.black,
                          fontFamily: 'Outfit-Regular',
                        }}
                      >
                        {influencer.followers}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '400',
                          color: colors.greyText,
                          fontFamily: 'Outfit-Regular',
                        }}
                      >
                        Followers
                      </Text>
                    </View>
                    <View style={tw`flex-1 items-center gap-1`}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '400',
                          color: colors.black,
                          fontFamily: 'Outfit-Regular',
                        }}
                      >
                        {influencer.posts}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '400',
                          color: colors.greyText,
                          fontFamily: 'Outfit-Regular',
                        }}
                      >
                        Posts
                      </Text>
                    </View>
                  </View>

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
                        fontSize: 10,
                        fontWeight: '400',
                        color: influencer.categoryColor,
                        fontFamily: 'Outfit-Regular',
                      }}
                    >
                      {influencer.category}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Row 2 */}
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {filteredInfluencers.slice(2, 4).map((influencer) => (
              <TouchableOpacity
                key={influencer.id}
                onPress={() => handleInfluencerPress(influencer)}
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  padding: 8,
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.05)',
                }}
              >
                <View style={{ gap: 8, alignItems: 'center' }}>
                  {/* Avatar with Plus Button */}
                  <View style={{ position: 'relative' }}>
                    <View
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                        backgroundColor: '#F5F5F7',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        source={{ uri: influencer.avatar }}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                      />
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: colors.complimentary,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Plus size={20} color="white" />
                    </View>
                  </View>

                  {/* Name and Username */}
                  <View style={{ gap: 4, width: '100%' }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '400',
                        color: colors.black,
                        textAlign: 'center',
                        fontFamily: 'Outfit-Regular',
                      }}
                      numberOfLines={1}
                    >
                      {influencer.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '400',
                        color: colors.greyText,
                        textAlign: 'center',
                        fontFamily: 'Outfit-Regular',
                      }}
                      numberOfLines={1}
                    >
                      {influencer.username}
                    </Text>
                  </View>

                  {/* Stats */}
                  <View style={tw`flex-row items-center w-full`}>
                    <View style={tw`flex-1 items-center gap-1`}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '400',
                          color: colors.black,
                          fontFamily: 'Outfit-Regular',
                        }}
                      >
                        {influencer.followers}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '400',
                          color: colors.greyText,
                          fontFamily: 'Outfit-Regular',
                        }}
                      >
                        Followers
                      </Text>
                    </View>
                    <View style={tw`flex-1 items-center gap-1`}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '400',
                          color: colors.black,
                          fontFamily: 'Outfit-Regular',
                        }}
                      >
                        {influencer.posts}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '400',
                          color: colors.greyText,
                          fontFamily: 'Outfit-Regular',
                        }}
                      >
                        Posts
                      </Text>
                    </View>
                  </View>

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
                        fontSize: 10,
                        fontWeight: '400',
                        color: influencer.categoryColor,
                        fontFamily: 'Outfit-Regular',
                      }}
                    >
                      {influencer.category}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Row 3 */}
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {filteredInfluencers.slice(4, 6).map((influencer) => (
              <TouchableOpacity
                key={influencer.id}
                onPress={() => handleInfluencerPress(influencer)}
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  padding: 8,
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.05)',
                }}
              >
                <View style={{ gap: 8, alignItems: 'center' }}>
                  {/* Avatar with Plus Button */}
                  <View style={{ position: 'relative' }}>
                    <View
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                        backgroundColor: '#F5F5F7',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        source={{ uri: influencer.avatar }}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                      />
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: colors.complimentary,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Plus size={20} color="white" />
                    </View>
                  </View>

                  {/* Name and Username */}
                  <View style={{ gap: 4, width: '100%' }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '400',
                        color: colors.black,
                        textAlign: 'center',
                        fontFamily: 'Outfit-Regular',
                      }}
                      numberOfLines={1}
                    >
                      {influencer.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '400',
                        color: colors.greyText,
                        textAlign: 'center',
                        fontFamily: 'Outfit-Regular',
                      }}
                      numberOfLines={1}
                    >
                      {influencer.username}
                    </Text>
                  </View>

                  {/* Stats */}
                  <View style={tw`flex-row items-center w-full`}>
                    <View style={tw`flex-1 items-center gap-1`}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '400',
                          color: colors.black,
                          fontFamily: 'Outfit-Regular',
                        }}
                      >
                        {influencer.followers}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '400',
                          color: colors.greyText,
                          fontFamily: 'Outfit-Regular',
                        }}
                      >
                        Followers
                      </Text>
                    </View>
                    <View style={tw`flex-1 items-center gap-1`}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '400',
                          color: colors.black,
                          fontFamily: 'Outfit-Regular',
                        }}
                      >
                        {influencer.posts}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '400',
                          color: colors.greyText,
                          fontFamily: 'Outfit-Regular',
                        }}
                      >
                        Posts
                      </Text>
                    </View>
                  </View>

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
                        fontSize: 10,
                        fontWeight: '400',
                        color: influencer.categoryColor,
                        fontFamily: 'Outfit-Regular',
                      }}
                    >
                      {influencer.category}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
