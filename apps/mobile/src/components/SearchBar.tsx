import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Search as SearchIcon, Filter } from 'lucide-react-native';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
};

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  containerStyle?: any;
  showFilter?: boolean;
  onFilterPress?: () => void;
}

export default function SearchBar({
  placeholder = 'Search...',
  value,
  onChangeText,
  containerStyle,
  showFilter = false,
  onFilterPress,
}: SearchBarProps) {
  return (
    <View style={containerStyle}>
      <View style={tw`flex-row items-center gap-2`}>
        <View
          style={[
            tw`flex-1 flex-row items-center px-3 py-0 rounded-full border`,
            {
              borderColor: 'rgba(0,0,0,0.1)',
            },
          ]}
        >
          <SearchIcon size={16} color={colors.complimentary} />
          <TextInput
            style={[
              tw`flex-1 ml-3 text-sm`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
              },
            ]}
            placeholder={placeholder}
            placeholderTextColor={colors.greyText}
            value={value}
            onChangeText={onChangeText}
          />
        </View>

        {showFilter && (
          <TouchableOpacity
            onPress={onFilterPress}
            style={[
              tw`items-center justify-center rounded`,
              {
                backgroundColor: `${colors.complimentary}15`,
                width: 43,
                height: 43,
                padding: 6,
              },
            ]}
          >
            <Filter size={16} color={colors.complimentary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
