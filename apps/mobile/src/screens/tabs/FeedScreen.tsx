import React, { useState, useCallback, useMemo, useRef } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import tw from 'twrnc';
import {
  Header,
  PostCard,
  StoryItem,
  Chip,
  Toast,
  useToast,
} from '../../components';
import { faker } from '@faker-js/faker';
import { Frame, Gem, Shirt, Users } from 'lucide-react-native';

// Mock data
const stories = [
  {
    id: '1',
    username: 'Fashionista_style',
    avatar: faker.image.avatar(),
    isViewed: false,
    isActive: true,
  },
  {
    id: '2',
    username: 'SewingMachine',
    avatar: faker.image.avatar(),
    isViewed: true,
    isActive: false,
  },
  {
    id: '3',
    username: 'textile_artist',
    avatar: faker.image.avatar(),
    isViewed: true,
    isActive: false,
  },
  {
    id: '4',
    username: 'craftcorner',
    avatar: faker.image.avatar(),
    isViewed: false,
    isActive: false,
  },
  {
    id: '5',
    username: 'designer_pro',
    avatar: faker.image.avatar(),
    isViewed: true,
    isActive: false,
  },
];

const filters = [
  { id: 'all', label: 'All', icon: Frame },
  { id: 'equipment', label: 'Equipment', icon: Gem },
  { id: 'fabrics', label: 'Fabrics', icon: Shirt },
  { id: 'leather', label: 'Leather', icon: Users },
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
    category: 'all', // Non-product post
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
      'Premium organic cotton fabric perfect for sustainable fashion. Available in multiple colors and weights. #fabric #organic #sustainable',
    likes: 156,
    comments: 23,
    shares: 45,
    category: 'fabrics',
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
    likes: 89,
    comments: 12,
    shares: 34,
    category: 'all', // Service post
  },
  {
    id: '4',
    user: {
      username: 'SewingMachinePro',
      avatar: faker.image.avatar(),
      badge: { text: 'Equipment Dealer', color: '#FF6B35' },
      location: 'New York, NY',
      rating: { score: 4.7, count: 567 },
    },
    timeAgo: '8h ago',
    image: faker.image.urlPicsumPhotos({ width: 430, height: 210 }),
    product: {
      title: 'Professional Industrial Sewing Machine',
      price: 2500,
      originalPrice: 3200,
    },
    caption:
      'Industrial-grade sewing machine perfect for professional tailors. High-speed stitching with precision control. #sewing #equipment #professional',
    likes: 234,
    comments: 45,
    shares: 67,
    category: 'equipment',
  },
  {
    id: '5',
    user: {
      username: 'LeatherCraft_Master',
      avatar: faker.image.avatar(),
      badge: { text: 'Leather Supplier', color: '#8B4513' },
      location: 'Milan, Italy',
      rating: { score: 4.9, count: 1234 },
    },
    timeAgo: '10h ago',
    image: faker.image.urlPicsumPhotos({ width: 430, height: 210 }),
    product: {
      title: 'Italian Full-Grain Leather Hide',
      price: 180,
      originalPrice: 220,
    },
    caption:
      'Premium Italian leather hide perfect for luxury bags and accessories. Soft, durable, and beautifully textured. #leather #luxury #craft',
    likes: 445,
    comments: 78,
    shares: 123,
    category: 'leather',
  },
  {
    id: '6',
    user: {
      username: 'FabricWorld_Store',
      avatar: faker.image.avatar(),
      badge: { text: 'Fabric Retailer', color: '#155DFC' },
      location: 'Los Angeles, CA',
      rating: { score: 4.6, count: 890 },
    },
    timeAgo: '12h ago',
    image: faker.image.urlPicsumPhotos({ width: 430, height: 210 }),
    product: {
      title: 'Silk Chiffon Fabric - Designer Collection',
      price: 85,
      originalPrice: 120,
    },
    caption:
      'Luxurious silk chiffon in stunning colors. Perfect for evening wear and bridal gowns. Limited stock available. #silk #chiffon #luxury',
    likes: 189,
    comments: 34,
    shares: 56,
    category: 'fabrics',
  },
];

export default function FeedScreen() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [comment, setComment] = useState('');
  const [storyStates, setStoryStates] = useState(stories);
  const { toast, showToast, hideToast } = useToast();

  const handleStoryPress = useCallback((storyId: string) => {
    setStoryStates((prev) =>
      prev.map((story) =>
        story.id === storyId
          ? { ...story, isViewed: true, isActive: false }
          : story
      )
    );
  }, []);

  const handleFilterPress = useCallback((filterId: string) => {
    setActiveFilter(filterId);
    const filterName =
      filters.find((f) => f.id === filterId)?.label || 'Unknown';
    showToast(`Filtered by ${filterName}`, 'info', 2000);
  }, []);

  // Filter posts based on active filter
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (activeFilter === 'all') {
        return true;
      }
      return post.category === activeFilter;
    });
  }, [activeFilter]);

  const ListHeaderComponent = useCallback(
    () => (
      <>
        {/* Stories Row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingVertical: 16,
            gap: 24,
            height: 120,
          }}
        >
          {storyStates.map((story) => (
            <StoryItem
              key={story.id}
              story={story}
              onPress={() => handleStoryPress(story.id)}
            />
          ))}
        </ScrollView>

        {/* Filter Chips */}
        <View
          style={{
            height: 50,
            justifyContent: 'center',
            backgroundColor: 'white',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <View style={[tw`px-6 flex-row items-center`, { gap: 8 }]}>
            {filters.map((filter) => (
              <Chip
                key={filter.id}
                label={filter.label}
                icon={filter.icon}
                active={activeFilter === filter.id}
                onPress={() => handleFilterPress(filter.id)}
                size="small"
                iconPosition="left"
              />
            ))}
          </View>
        </View>
      </>
    ),
    [storyStates, activeFilter, filters]
  );

  const renderPost = useCallback(
    ({ item: post }) => (
      <PostCard
        post={{
          ...post,
          user: {
            ...post.user,
            location:
              post.user.location === null ? undefined : post.user.location,
            rating: post.user.rating === null ? undefined : post.user.rating,
          },
        }}
        comment={comment}
        onCommentChange={setComment}
      />
    ),
    [comment]
  );

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Status Bar Space */}
      <View style={tw`h-12`} />

      {/* Header with Logo */}
      <Header />

      {/* Toast */}
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        position={toast.position}
        onHide={hideToast}
      />

      {/* Feed Posts */}
      <FlatList
        data={filteredPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeaderComponent}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={10}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
          autoscrollToTopThreshold: 10,
        }}
      />
    </View>
  );
}
