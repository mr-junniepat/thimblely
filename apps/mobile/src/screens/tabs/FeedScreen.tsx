import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { PostCard } from '@mobile/components/PostCard';
import { StoryItem } from '@mobile/components/StoryItem';
import { FilterChip } from '@mobile/components/FilterChip';
import { ShoppingBag, Shirt, Star } from 'lucide-react-native';
import { faker } from '@faker-js/faker';
import tw from 'twrnc';

// Generate stories with Faker.js
const generateStories = () => {
  return Array.from({ length: 8 }, (_, index) => ({
    id: `${index + 1}`,
    username: faker.internet.username().toLowerCase(),
    avatar: { uri: faker.image.avatar() },
  }));
};

const filters = [
  { id: 'all', label: 'All', icon: ShoppingBag },
  { id: 'materials', label: 'Materials', icon: ShoppingBag },
  { id: 'clothes', label: 'Clothes', icon: Shirt },
  { id: 'creators', label: 'Creators', icon: Star },
];

// Generate posts with Faker.js
const generatePosts = () => {
  const userTypes = [
    { type: 'Style Creator', color: '#9810FA' },
    { type: 'Material Supplier', color: '#155DFC' },
    { type: 'Custom Tailor', color: '#00A63E' },
    { type: 'Fashion Designer', color: '#FF6B6B' },
    { type: 'Textile Artist', color: '#4ECDC4' },
  ];

  const fashionHashtags = [
    '#fashion',
    '#style',
    '#outfit',
    '#design',
    '#sewing',
    '#tailoring',
    '#textiles',
    '#handmade',
    '#custom',
    '#vintage',
  ];

  return Array.from({ length: 5 }, (_, index) => {
    const userType = faker.helpers.arrayElement(userTypes);
    const hasPrice = faker.datatype.boolean();
    const hasRating = faker.datatype.boolean();
    const hasBadge = faker.datatype.boolean();

    return {
      id: `${index + 1}`,
      username: faker.internet.username().toLowerCase(),
      userAvatar: { uri: faker.image.avatar() },
      userType: userType.type,
      userTypeColor: userType.color,
      timeAgo: `${faker.number.int({ min: 1, max: 12 })}h ago`,
      postImage: {
        uri: faker.helpers.arrayElement([
          faker.image.url({ width: 400, height: 300 }),
          faker.image.urlLoremFlickr({
            width: 400,
            height: 300,
            category: 'fashion',
          }),
          faker.image.urlLoremFlickr({
            width: 400,
            height: 300,
            category: 'clothing',
          }),
          faker.image.urlLoremFlickr({
            width: 400,
            height: 300,
            category: 'style',
          }),
          faker.image.urlLoremFlickr({
            width: 400,
            height: 300,
            category: 'design',
          }),
        ]),
      },
      description:
        faker.lorem.sentences(2) +
        ' ' +
        faker.helpers.arrayElements(fashionHashtags, 3).join(' '),
      ...(hasPrice && {
        price: `$${faker.number.int({ min: 20, max: 500 })}`,
        originalPrice: `$${faker.number.int({ min: 50, max: 800 })}`,
      }),
      ...(hasRating && {
        location: faker.location.city() + ', ' + faker.location.state(),
        rating: faker.number
          .float({ min: 4.0, max: 5.0, fractionDigits: 1 })
          .toString(),
        reviewCount: faker.number.int({ min: 10, max: 5000 }).toString(),
      }),
      ...(hasBadge && {
        badge: faker.helpers.arrayElement([
          'Custom Made',
          'Limited Edition',
          'Handcrafted',
          'Premium Quality',
        ]),
        badgeColor: faker.helpers.arrayElement([
          '#00C950',
          '#FF9500',
          '#007AFF',
          '#FF3B30',
        ]),
      }),
      likes: faker.number.int({ min: 50, max: 1000 }),
      comments: faker.number.int({ min: 10, max: 200 }),
      shares: faker.number.int({ min: 5, max: 100 }),
    };
  });
};

export function FeedScreen() {
  const [activeFilter, setActiveFilter] = useState('all');

  // Generate stories and posts using useMemo to avoid regenerating on every render
  const stories = useMemo(() => generateStories(), []);
  const posts = useMemo(() => generatePosts(), []);

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header with Logo */}
      <View style={tw`h-12`} />
      <View style={tw`flex-row items-center gap-2 px-6 py-4`}>
        <Image
          source={require('../../assets/images/small_logo.png')}
          style={tw`w-8 h-8`}
          resizeMode="contain"
        />
        <Text
          style={[tw`text-sm text-black`, { fontFamily: 'Outfit_400Regular' }]}
        >
          Thimblely
        </Text>
      </View>

      {/* Stories Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={tw`max-h-28`}
        contentContainerStyle={tw`px-6 py-4`}
      >
        {stories.map((story) => (
          <StoryItem
            key={story.id}
            username={story.username}
            avatar={story.avatar}
          />
        ))}
      </ScrollView>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={tw`max-h-16`}
        contentContainerStyle={tw`px-6 gap-2 flex-row`}
      >
        {filters.map((filter) => (
          <FilterChip
            key={filter.id}
            label={filter.label}
            icon={filter.icon}
            isActive={activeFilter === filter.id}
            onPress={() => setActiveFilter(filter.id)}
          />
        ))}
      </ScrollView>

      {/* Feed Posts */}
      <ScrollView
        style={tw`flex-1`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-20`}
      >
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </ScrollView>
    </View>
  );
}
