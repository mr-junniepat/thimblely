import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';

interface StoryItemProps {
  username: string;
  avatar: any;
  onPress?: () => void;
}

export function StoryItem({ username, avatar, onPress }: StoryItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={tw`items-center gap-2 mr-6`}
    >
      <View style={tw`w-19 h-19 rounded-full border-2 border-[#A30552] p-0.5`}>
        <Image source={avatar} style={tw`w-full h-full rounded-full`} />
      </View>
      <Text
        style={[
          tw`text-[10px] text-black text-center max-w-20`,
          { fontFamily: 'Outfit_400Regular' },
        ]}
        numberOfLines={1}
      >
        {username}
      </Text>
    </TouchableOpacity>
  );
}
