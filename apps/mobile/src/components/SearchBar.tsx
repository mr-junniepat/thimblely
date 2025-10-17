import React from 'react';
import { View, TextInput } from 'react-native';
import { colors } from '@thimblely/shared';
import { Search as SearchIcon } from 'lucide-react-native';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  containerStyle?: any;
}

export default function SearchBar({
  placeholder = 'Search...',
  value,
  onChangeText,
  containerStyle,
}: SearchBarProps) {
  return (
    <View style={[{ paddingHorizontal: 24, marginBottom: 16 }, containerStyle]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.1)',
          borderRadius: 32,
          paddingHorizontal: 12,
          paddingVertical: 16,
          gap: 12,
        }}
      >
        <SearchIcon size={16} color={colors.black} />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.black}
          style={{
            flex: 1,
            fontSize: 14,
            fontWeight: '400',
            color: colors.black,
            padding: 0,
          }}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
}
