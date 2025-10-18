import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '@thimblely/shared';
import tw from 'twrnc';
import { Header, SearchBar } from '../../components';

// Import components
import InfluencersComponent from '../../components/InfluencersComponent';
import ManufacturersComponent from '../../components/ManufacturersComponent';

const tabs = ['All', 'Influencers', 'Manufacturers'];

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
      <View style={tw`flex-1 items-center justify-center py-20`}>
        <Text
          style={[
            tw`text-lg font-bold text-center mb-2`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          Discover Content
        </Text>
        <Text
          style={[
            tw`text-sm text-center`,
            {
              color: colors.greyText,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          Content will be loaded dynamically
        </Text>
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
