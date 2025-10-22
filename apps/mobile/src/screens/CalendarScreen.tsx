import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import tw from 'twrnc';

// Import colors directly
const colors = {
  black: '#111113',
  greyText: '#68666F',
};

export default function CalendarScreen() {
  const navigation = useNavigation();

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Status Bar Space */}
      <View style={tw`h-12`} />

      {/* Header */}
      <View style={tw`px-6 pt-4 pb-4`}>
        <View style={tw`flex-row items-center justify-between mb-6`}>
          <View style={tw`flex-row items-center gap-5`}>
            <TouchableOpacity onPress={onBack}>
              <ChevronLeft size={24} color={colors.black} />
            </TouchableOpacity>
            <Text
              style={[
                tw`text-base font-bold`,
                { fontFamily: 'System', color: colors.black },
              ]}
            >
              Calendar
            </Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <View style={tw`flex-1 items-center justify-center px-6`}>
        <Text
          style={[
            tw`text-lg font-bold mb-2`,
            { fontFamily: 'System', color: colors.black },
          ]}
        >
          Calendar Coming Soon
        </Text>
        <Text
          style={[
            tw`text-sm text-center`,
            { fontFamily: 'System', color: colors.greyText },
          ]}
        >
          This feature is currently under development
        </Text>
      </View>
    </View>
  );
}
