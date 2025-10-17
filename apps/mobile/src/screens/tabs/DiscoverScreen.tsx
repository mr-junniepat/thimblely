import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { colors } from '@thimblely/shared';
import tw from 'twrnc';
import { Header, SearchBar } from '../../components';
import {
  MapPin,
  Calendar,
  Users,
  ShoppingCart,
  Star,
  Plus,
  Flame,
} from 'lucide-react-native';
import { faker } from '@faker-js/faker';

// Import components
import InfluencersComponent from '../../components/InfluencersComponent';
import ManufacturersComponent from '../../components/ManufacturersComponent';

const tabs = ['All', 'Influencers', 'Manufacturers'];

// Generate mock data with faker
const trendingCards = [
  {
    id: '1',
    image: faker.image.urlPicsumPhotos({ width: 246, height: 121 }),
    badge: {
      text: 'Fashion Weekly',
      color: '#155DFC',
      bgColor: 'rgba(66,133,244,0.09)',
    },
    title: 'Summer Fashion Trend 2024',
    viewers: '2.4k Viewers',
    timeAgo: 'Posted 1hr ago',
  },
  {
    id: '2',
    image: faker.image.urlPicsumPhotos({ width: 246, height: 121 }),
    badge: {
      text: 'Eco Style',
      color: '#155DFC',
      bgColor: 'rgba(66,133,244,0.09)',
    },
    title: 'Summer Fashion Trend 2024',
    viewers: '2.4k Viewers',
    timeAgo: 'Posted 1hr ago',
  },
];

const events = [
  {
    id: '1',
    image: faker.image.urlPicsumPhotos({ width: 133, height: 103 }),
    title: 'Lagos Fashion Week',
    location: 'Lagos, Nigeria',
    date: '25th June, 2025',
    attending: '500+ attending',
  },
  {
    id: '2',
    image: faker.image.urlPicsumPhotos({ width: 133, height: 103 }),
    title: 'Lagos Fashion Week',
    location: 'Lagos, Nigeria',
    date: '25th June, 2025',
    attending: '500+ attending',
  },
];

const influencers = [
  {
    id: '1',
    avatar: faker.image.avatar(),
    name: 'Emma Thompson',
    username: '@emmacreates',
    followers: '67k',
    posts: 342,
    badge: {
      text: 'DIY Fashion',
      color: '#354D0C',
      bgColor: 'rgba(170,237,59,0.09)',
    },
  },
  {
    id: '2',
    avatar: faker.image.avatar(),
    name: 'Marcus Rodriguez',
    username: '@marcus_sews',
    followers: '67k',
    posts: 342,
    badge: {
      text: 'Sewing Expert',
      color: '#354D0C',
      bgColor: 'rgba(170,237,59,0.09)',
    },
  },
];

const manufacturers = [
  {
    id: '1',
    title: 'Industrial Sewing Machine',
    rating: { score: 4.8, count: 2345 },
    location: 'Chicago, IL',
    price: 2339,
    originalPrice: 5339,
  },
  {
    id: '2',
    title: 'Industrial Sewing Machine',
    rating: { score: 4.8, count: 2345 },
    location: 'Chicago, IL',
    price: 2339,
    originalPrice: 5339,
  },
];

export default function DiscoverScreen() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Render different content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'Influencers':
        return <InfluencersComponent searchQuery={searchQuery} />;
      case 'Manufacturers':
        return <ManufacturersComponent searchQuery={searchQuery} />;
      default:
        return renderAllContent();
    }
  };

  const renderAllContent = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* Trending Now Section */}
      <View style={{ paddingHorizontal: 24, paddingTop: 16, gap: 16 }}>
        <View style={tw`flex-row items-center gap-1`}>
          <Flame
            size={24}
            color={colors.complimentary}
            fill={colors.complimentary}
          />
          <Text
            style={{ fontSize: 14, fontWeight: '700', color: colors.black }}
          >
            Trending Now
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16 }}
        >
          {trendingCards.map((card) => (
            <View
              key={card.id}
              style={{
                width: 246,
                borderRadius: 9,
                backgroundColor: 'white',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 5,
                overflow: 'hidden',
              }}
            >
              <Image
                source={{ uri: card.image }}
                style={{ width: '100%', height: 121 }}
                resizeMode="cover"
              />
              <View style={{ backgroundColor: 'white', padding: 16, gap: 12 }}>
                <View style={tw`flex-row items-center justify-between`}>
                  <View
                    style={{
                      backgroundColor: card.badge.bgColor,
                      paddingHorizontal: 5.25,
                      paddingVertical: 1.75,
                      borderRadius: 999,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '400',
                        color: card.badge.color,
                      }}
                    >
                      {card.badge.text}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: colors.greyText,
                      textAlign: 'center',
                    }}
                  >
                    {card.viewers}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: colors.black,
                  }}
                >
                  {card.title}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: colors.greyText,
                    textAlign: 'center',
                  }}
                >
                  {card.timeAgo}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Nearby Events Section */}
      <View style={{ paddingHorizontal: 24, paddingTop: 24, gap: 21 }}>
        <Text style={{ fontSize: 14, fontWeight: '700', color: colors.black }}>
          Nearby Events
        </Text>
        <View style={tw`gap-4`}>
          {events.map((event) => (
            <View
              key={event.id}
              style={{
                borderWidth: 1,
                borderColor: 'rgba(107,35,116,0.1)', // From Figma
                borderRadius: 10,
                padding: 12,
                flexDirection: 'row',
                gap: 16,
              }}
            >
              <Image
                source={{ uri: event.image }}
                style={{ width: 133, height: 103, borderRadius: 5 }}
                resizeMode="cover"
              />
              <View style={{ flex: 1, gap: 12 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: colors.black,
                  }}
                >
                  {event.title}
                </Text>
                <View style={tw`flex-row items-center gap-1`}>
                  <MapPin size={16} color={colors.black} />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: colors.black,
                    }}
                  >
                    {event.location}
                  </Text>
                </View>
                <View style={tw`flex-row items-center gap-1`}>
                  <Calendar size={16} color={colors.complimentary} />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: colors.complimentary,
                    }}
                  >
                    {event.date}
                  </Text>
                </View>
                <View style={tw`flex-row items-center gap-1`}>
                  <Users size={16} color={colors.greyText} />
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '400',
                      color: colors.greyText,
                    }}
                  >
                    {event.attending}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Trending Influencers Section */}
      <View style={{ paddingHorizontal: 24, paddingTop: 24, gap: 16 }}>
        <Text style={{ fontSize: 14, fontWeight: '700', color: colors.black }}>
          Trending Influencers
        </Text>
        <View style={tw`flex-row gap-2`}>
          {influencers.map((influencer) => (
            <View
              key={influencer.id}
              style={{
                flex: 1,
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.05)',
                borderRadius: 10,
                padding: 8,
                gap: 12,
              }}
            >
              <View style={{ gap: 8, alignItems: 'center' }}>
                {/* Avatar with Plus Button */}
                <View style={{ position: 'relative' }}>
                  <View
                    style={tw`w-[70px] h-[70px] rounded-full overflow-hidden`}
                  >
                    <Image
                      source={{ uri: influencer.avatar }}
                      style={tw`w-full h-full`}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={{ position: 'absolute', right: -4, bottom: -2 }}>
                    <View
                      style={{
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
                </View>

                {/* Name and Username */}
                <View style={{ gap: 4, width: '100%' }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: colors.black,
                      textAlign: 'center',
                    }}
                  >
                    {influencer.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: colors.greyText,
                      textAlign: 'center',
                    }}
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
                      }}
                    >
                      {influencer.followers}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '400',
                        color: colors.greyText,
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
                      }}
                    >
                      {influencer.posts}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '400',
                        color: colors.greyText,
                      }}
                    >
                      Posts
                    </Text>
                  </View>
                </View>

                {/* Badge */}
                <View
                  style={{
                    backgroundColor: influencer.badge.bgColor,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 32,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '400',
                      color: influencer.badge.color,
                    }}
                  >
                    {influencer.badge.text}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Trending Manufacturers Section */}
      <View
        style={{
          paddingHorizontal: 24,
          paddingTop: 24,
          paddingBottom: 16,
          gap: 16,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: '700', color: colors.black }}>
          Trending Manufacturers
        </Text>
        <View style={tw`flex-row gap-3`}>
          {manufacturers.map((manufacturer) => (
            <View key={manufacturer.id} style={{ flex: 1, gap: 12 }}>
              {/* Product Image Placeholder */}
              <View
                style={{
                  backgroundColor: '#D9D9D9',
                  height: 160,
                  borderRadius: 5,
                }}
              />

              {/* Product Details */}
              <View style={tw`gap-2`}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: colors.black,
                  }}
                >
                  {manufacturer.title}
                </Text>
                <View style={tw`flex-row items-center gap-3`}>
                  <View style={tw`flex-row items-center gap-1`}>
                    <Star size={16} color="#FBBC04" fill="#FBBC04" />
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '400',
                        color: colors.black,
                      }}
                    >
                      {manufacturer.rating.score}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '400',
                        color: colors.black,
                      }}
                    >
                      ({manufacturer.rating.count.toLocaleString()})
                    </Text>
                  </View>
                </View>
                <View style={tw`flex-row items-center gap-1`}>
                  <MapPin size={16} color={colors.greyText} />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: colors.greyText,
                    }}
                  >
                    {manufacturer.location}
                  </Text>
                </View>
                <View style={tw`flex-row items-center gap-1`}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '700',
                      color: colors.black,
                    }}
                  >
                    ${manufacturer.price.toLocaleString()}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '400',
                      color: colors.greyText,
                      textDecorationLine: 'line-through',
                      flex: 1,
                    }}
                  >
                    ${manufacturer.originalPrice.toLocaleString()}
                  </Text>
                </View>
              </View>

              {/* Buy Now Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: '#F5F5F7',
                  paddingHorizontal: 8,
                  paddingVertical: 12,
                  borderRadius: 32,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <ShoppingCart size={14} color={colors.complimentary} />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: colors.complimentary,
                  }}
                >
                  Buy now
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Status Bar Space */}
      <View style={tw`h-12`} />

      {/* Header with Logo */}
      <Header />

      {/* Search Bar */}
      <SearchBar
        placeholder="Search products, people, events"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Tab Navigation - With underline */}
      <View
        style={{
          flexDirection: 'row',
          height: 48,
          paddingHorizontal: 24,
          alignItems: 'center',
        }}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={{
              flex: 1,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 16,
              borderBottomWidth: activeTab === tab ? 1 : 0,
              borderBottomColor: colors.complimentary,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: activeTab === tab ? '700' : '400',
                color:
                  activeTab === tab ? colors.complimentary : colors.greyText,
                fontFamily:
                  activeTab === tab ? 'Outfit-Bold' : 'Outfit-Regular',
              }}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content based on active tab */}
      {renderContent()}
    </View>
  );
}
