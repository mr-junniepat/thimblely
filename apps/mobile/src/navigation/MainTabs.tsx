import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import {
  Home,
  Search as SearchIcon,
  Briefcase,
  User,
} from 'lucide-react-native';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  greyText: '#68666F',
};

// Screens - using new Figma-designed screens
import FeedScreen from '../screens/tabs/FeedScreen';
import DiscoverScreen from '../screens/tabs/DiscoverScreen';
import WorkspaceScreen from '../screens/tabs/WorkspaceScreen';
import ProfileScreen from '../screens/tabs/ProfileScreen';

export type MainTabsParamList = {
  Feed: undefined;
  Discover: undefined;
  Workspace: undefined;
  Profile: undefined;
};

export default function MainTabs({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('Feed');

  const renderScreen = () => {
    switch (activeTab) {
      case 'Feed':
        return <FeedScreen />;
      case 'Discover':
        return <DiscoverScreen />;
      case 'Workspace':
        return <WorkspaceScreen />;
      case 'Profile':
        return <ProfileScreen navigation={navigation} />;
      default:
        return <FeedScreen />;
    }
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Screen Content */}
      <View style={tw`flex-1`}>{renderScreen()}</View>

      {/* Custom Bottom Navigation */}
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 16,
          paddingVertical: 16,
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
        }}
      >
        <View style={tw`flex-row items-center justify-between`}>
          <TouchableOpacity
            style={tw`items-center gap-1.5 w-[75px]`}
            onPress={() => setActiveTab('Feed')}
          >
            <Home
              size={20}
              color={
                activeTab === 'Feed' ? colors.complimentary : colors.greyText
              }
            />
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color:
                  activeTab === 'Feed' ? colors.complimentary : colors.greyText,
              }}
            >
              Feed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`items-center gap-1.5 w-[76px]`}
            onPress={() => setActiveTab('Discover')}
          >
            <SearchIcon
              size={20}
              color={
                activeTab === 'Discover'
                  ? colors.complimentary
                  : colors.greyText
              }
            />
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color:
                  activeTab === 'Discover'
                    ? colors.complimentary
                    : colors.greyText,
              }}
            >
              Discover
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`items-center gap-1.5 w-[75px]`}
            onPress={() => setActiveTab('Workspace')}
          >
            <Briefcase
              size={20}
              color={
                activeTab === 'Workspace'
                  ? colors.complimentary
                  : colors.greyText
              }
            />
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color:
                  activeTab === 'Workspace'
                    ? colors.complimentary
                    : colors.greyText,
              }}
            >
              Workspace
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`items-center gap-1.5 w-[75px]`}
            onPress={() => setActiveTab('Profile')}
          >
            <User
              size={20}
              color={
                activeTab === 'Profile' ? colors.complimentary : colors.greyText
              }
            />
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color:
                  activeTab === 'Profile'
                    ? colors.complimentary
                    : colors.greyText,
              }}
            >
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
