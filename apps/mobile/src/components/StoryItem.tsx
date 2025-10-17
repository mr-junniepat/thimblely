import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';

interface StoryItemProps {
  story: {
    id: string;
    username: string;
    avatar: string;
    isViewed?: boolean;
    isActive?: boolean;
  };
  onPress?: () => void;
}

export default function StoryItem({ story, onPress }: StoryItemProps) {
  const { username, avatar, isViewed = false, isActive = false } = story;

  return (
    <TouchableOpacity style={tw`items-center gap-2`} onPress={onPress}>
      {/* Story Container */}
      <View style={tw`relative`}>
        {/* Story with ring border (all stories have rings) */}
        <View
          style={{
            width: 70.5,
            height: 70.5,
            borderRadius: 40.25,
            padding: 2.75,
            backgroundColor: isViewed
              ? '#E5E7EB'
              : isActive
              ? '#A30552'
              : '#A30552',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Inner Avatar */}
          <View
            style={{
              width: 65,
              height: 65,
              borderRadius: 37.5,
              overflow: 'hidden',
              backgroundColor: '#F3F4F6',
            }}
          >
            <Image
              source={{ uri: avatar }}
              style={tw`w-full h-full`}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>

      {/* Username */}
      <Text
        style={{
          fontSize: 10,
          fontWeight: '400',
          color: isViewed ? '#9CA3AF' : '#111113',
          fontFamily: 'Satoshi Variable',
          textAlign: 'center',
          maxWidth: 60,
        }}
        numberOfLines={1}
      >
        {username}
      </Text>
    </TouchableOpacity>
  );
}
