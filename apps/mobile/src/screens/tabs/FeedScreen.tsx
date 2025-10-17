import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
// Import colors directly from the source file
const colors = {
  complimentary: '#A30552',
  greyText: '#68666F',
  black: '#111113',
};
import tw from 'twrnc';
import { Header, Chip } from '../../components';
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Smile,
  Home,
  Search as SearchIcon,
  Briefcase,
  User,
  ShoppingBag,
  MapPin,
  Star,
} from 'lucide-react-native';
import { faker } from '@faker-js/faker';

// Mock data
const stories = [
  { id: '1', username: 'Fashionista_style', avatar: faker.image.avatar() },
  { id: '2', username: 'SewingMachine', avatar: faker.image.avatar() },
  { id: '3', username: 'textile_artist', avatar: faker.image.avatar() },
  { id: '4', username: 'craftcorner', avatar: faker.image.avatar() },
  { id: '5', username: 'textile_artist', avatar: faker.image.avatar() },
];

const filters = [
  { id: 'all', label: 'All', icon: null, active: true },
  { id: 'materials', label: 'Materials', icon: ShoppingBag },
  { id: 'clothes', label: 'Clothes', icon: ShoppingBag },
  { id: 'creators', label: 'Creators', icon: User },
];

const posts = [
  {
    id: '1',
    user: {
      username: 'Fashionista_style',
      avatar: faker.image.avatar(),
      badge: { text: 'Style Creator', color: '#9810FA' },
      location: null,
      rating: null,
    },
    timeAgo: '2h ago',
    image: faker.image.urlPicsumPhotos({ width: 430, height: 210 }),
    caption:
      'Latest street style inspiration from Paris Fashion Week. The perfect blend of vintage and modern aesthetics. #fashion #streetstyle #vintage',
    likes: 322,
    comments: 322,
    shares: 322,
  },
  {
    id: '2',
    user: {
      username: 'PremiumTextiles',
      avatar: faker.image.avatar(),
      badge: { text: 'Material Supplier', color: '#155DFC' },
      location: 'Chicago, IL',
      rating: { score: 4.8, count: 2345 },
    },
    timeAgo: '4h ago',
    image: faker.image.urlPicsumPhotos({ width: 430, height: 210 }),
    product: {
      title: 'Organic Cotton Fabric - Premium Quality',
      price: 45,
      originalPrice: 65,
    },
    caption:
      'Latest street style inspiration from Paris Fashion Week. The perfect blend of vintage and modern aesthetics. #fashion #streetstyle #vintage',
    likes: 322,
    comments: 322,
    shares: 322,
  },
  {
    id: '3',
    user: {
      username: 'MasterTailor_John',
      avatar: faker.image.avatar(),
      badge: { text: 'Custom Tailor', color: '#00A63E' },
      location: 'London, UK',
      rating: { score: 4.9, count: 89 },
    },
    timeAgo: '6h ago',
    image: faker.image.urlPicsumPhotos({ width: 430, height: 210 }),
    product: {
      title: 'Custom Three-Piece Wedding Suit',
      price: 2099,
      originalPrice: 2599,
      badge: 'Custom Made',
    },
    caption:
      'Custom three-piece suit completed for a wedding. Hand-stitched details and perfect fit guaranteed. #tailoring #custom #wedding',
    likes: 322,
    comments: 322,
    shares: 322,
  },
];

export default function FeedScreen() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [comment, setComment] = useState('');

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Status Bar Space */}
      <View style={tw`h-12`} />

      {/* Header with Logo */}
      <Header />

      {/* Stories Row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`px-6 gap-6 py-4`}
      >
        {stories.map((story) => (
          <TouchableOpacity key={story.id} style={tw`items-center gap-2`}>
            <View style={tw`w-[75px] h-[75px] rounded-full overflow-hidden`}>
              <Image
                source={{ uri: story.avatar }}
                style={tw`w-full h-full`}
                resizeMode="cover"
              />
            </View>
            <Text style={{ fontSize: 10, fontWeight: '400', color: 'black' }}>
              {story.username}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`px-6 gap-2 py-4`}
      >
        {filters.map((filter) => (
          <Chip
            key={filter.id}
            label={filter.label}
            icon={filter.icon || undefined}
            active={activeFilter === filter.id}
            onPress={() => setActiveFilter(filter.id)}
            size="medium"
          />
        ))}
      </ScrollView>

      {/* Feed Posts */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {posts.map((post) => (
          <View
            key={post.id}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#F3F4F6',
              paddingBottom: 16,
              backgroundColor: 'white',
            }}
          >
            {/* Post Header */}
            <View style={tw`px-6 py-3.5 flex-row items-center justify-between`}>
              <View style={tw`flex-row items-center gap-2.5`}>
                {/* Avatar */}
                <View style={tw`w-10 h-10 rounded-full overflow-hidden`}>
                  <Image
                    source={{ uri: post.user.avatar }}
                    style={tw`w-full h-full`}
                    resizeMode="cover"
                  />
                </View>

                {/* User Info */}
                <View style={tw`gap-1`}>
                  <View style={tw`flex-row items-center gap-1`}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: '#0A0A0A',
                      }}
                    >
                      {post.user.username}
                    </Text>
                    <View
                      style={{
                        backgroundColor: '#F3F4F6',
                        paddingHorizontal: 5.25,
                        paddingVertical: 1.75,
                        borderRadius: 999,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '400',
                          color: post.user.badge.color,
                        }}
                      >
                        {post.user.badge.text}
                      </Text>
                    </View>
                  </View>

                  <View style={tw`flex-row items-center gap-2.5`}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '400',
                        color: '#6A7282',
                      }}
                    >
                      {post.timeAgo}
                    </Text>
                    {post.user.location && (
                      <>
                        <Text style={{ fontSize: 12, color: '#6A7282' }}>
                          •
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '400',
                            color: '#6A7282',
                          }}
                        >
                          {post.user.location}
                        </Text>
                      </>
                    )}
                    {post.user.rating && (
                      <>
                        <Text style={{ fontSize: 12, color: '#6A7282' }}>
                          ⭐
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '400',
                            color: '#6A7282',
                          }}
                        >
                          {post.user.rating.score}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '400',
                            color: '#6A7282',
                          }}
                        >
                          ({post.user.rating.count})
                        </Text>
                      </>
                    )}
                  </View>
                </View>
              </View>

              {/* More Options */}
              <TouchableOpacity>
                <Text style={{ fontSize: 20, color: colors.greyText }}>⋯</Text>
              </TouchableOpacity>
            </View>

            {/* Post Image */}
            <View style={{ position: 'relative' }}>
              <Image
                source={{ uri: post.image }}
                style={{ width: '100%', height: 210 }}
                resizeMode="cover"
              />
              {post.product?.badge && (
                <View
                  style={{
                    position: 'absolute',
                    top: 10.5,
                    left: 10.5,
                    backgroundColor: '#00C950',
                    paddingHorizontal: 7,
                    paddingVertical: 3.5,
                    borderRadius: 999,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '400',
                      color: 'white',
                      lineHeight: 15,
                    }}
                  >
                    {post.product.badge}
                  </Text>
                </View>
              )}
            </View>

            {/* Product Info (if applicable) */}
            {post.product && (
              <View style={tw`px-6 py-4 gap-4`}>
                <Text
                  style={{ fontSize: 14, fontWeight: '400', color: '#0A0A0A' }}
                >
                  {post.product.title}
                </Text>
                <View style={tw`flex-row items-center justify-between`}>
                  <View style={tw`flex-row items-center gap-1.5`}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: colors.complimentary,
                      }}
                    >
                      ${post.product.price}
                    </Text>
                    {post.product.originalPrice && (
                      <Text
                        style={{
                          fontSize: post.product.originalPrice > 100 ? 10 : 12,
                          fontWeight: '400',
                          color: '#6A7282',
                          textDecorationLine: 'line-through',
                        }}
                      >
                        ${post.product.originalPrice}
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.complimentary,
                      paddingHorizontal: 20,
                      paddingVertical: 8,
                      borderRadius: 999,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <ShoppingBag size={12} color="white" />
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: 'white',
                      }}
                    >
                      Buy now
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Interactions */}
            <View style={tw`px-6 gap-4`}>
              <View style={tw`flex-row items-center justify-between`}>
                <View style={tw`flex-row items-end gap-3`}>
                  <View style={tw`flex-row items-center gap-1`}>
                    <Heart size={24} color={colors.greyText} />
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '400',
                        color: colors.greyText,
                      }}
                    >
                      {post.likes}
                    </Text>
                  </View>
                  <View style={tw`flex-row items-center gap-2`}>
                    <MessageCircle size={24} color={colors.greyText} />
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '400',
                        color: colors.greyText,
                      }}
                    >
                      {post.comments}
                    </Text>
                  </View>
                  <View style={tw`flex-row items-center gap-2`}>
                    <Send size={24} color={colors.greyText} />
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '400',
                        color: colors.greyText,
                      }}
                    >
                      {post.shares}
                    </Text>
                  </View>
                </View>
                <Bookmark size={24} color={colors.greyText} />
              </View>

              {/* Caption */}
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: '#4A5565',
                  lineHeight: 18,
                }}
              >
                {post.caption}
              </Text>

              {/* Comment Input */}
              <View style={tw`flex-row items-center gap-3`}>
                <Smile size={20} color={colors.greyText} />
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#F9FAFB',
                    borderRadius: 999,
                    paddingHorizontal: 12,
                    paddingVertical: 12,
                  }}
                >
                  <TextInput
                    placeholder="Add a comment..."
                    placeholderTextColor={colors.greyText}
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: colors.black,
                    }}
                    value={comment}
                    onChangeText={setComment}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: colors.complimentary,
                  }}
                >
                  Post
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
