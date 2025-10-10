import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

export function SearchScreen() {
  return (
    <View style={tw`flex-1 bg-white items-center justify-center`}>
      <Text
        style={[tw`text-2xl text-gray-400`, { fontFamily: 'Outfit_500Medium' }]}
      >
        Search
      </Text>
      <Text
        style={[
          tw`text-sm text-gray-400 mt-2`,
          { fontFamily: 'Outfit_400Regular' },
        ]}
      >
        Coming soon...
      </Text>
    </View>
  );
}
