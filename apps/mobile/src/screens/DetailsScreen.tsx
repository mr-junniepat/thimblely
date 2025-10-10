import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@mobile/navigation';
import tw from 'twrnc';

type DetailsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Details'>;
  route: RouteProp<RootStackParamList, 'Details'>;
};

export function DetailsScreen({ route }: DetailsScreenProps) {
  const { id } = route.params;

  return (
    <ScrollView style={tw`flex-1 bg-gray-50`}>
      <View style={tw`p-6`}>
        <Text style={tw`text-3xl font-bold text-gray-900 mb-2`}>
          Feature Details
        </Text>
        <Text style={tw`text-base text-gray-600 mb-6`}>ID: {id}</Text>

        <View style={tw`bg-white p-5 rounded-xl mb-4 shadow-sm`}>
          <Text style={tw`text-lg font-semibold text-gray-900 mb-3`}>
            Overview
          </Text>
          <Text style={tw`text-[15px] text-gray-600 leading-6`}>
            This is a detailed view of the selected feature. Here you can add
            more information about the feature, including specifications,
            benefits, and use cases.
          </Text>
        </View>

        <View style={tw`bg-white p-5 rounded-xl mb-4 shadow-sm`}>
          <Text style={tw`text-lg font-semibold text-gray-900 mb-3`}>
            Key Benefits
          </Text>
          <Text style={tw`text-[15px] text-gray-600 leading-6`}>
            • Enhanced productivity{'\n'}• Seamless integration{'\n'}• Real-time
            updates{'\n'}• 24/7 support
          </Text>
        </View>

        <View style={tw`bg-white p-5 rounded-xl mb-4 shadow-sm`}>
          <Text style={tw`text-lg font-semibold text-gray-900 mb-3`}>
            How It Works
          </Text>
          <Text style={tw`text-[15px] text-gray-600 leading-6`}>
            Our feature leverages cutting-edge technology to provide you with
            the best possible experience. Simply enable it in your settings and
            start enjoying the benefits immediately.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
