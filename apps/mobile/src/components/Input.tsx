import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { colors } from '@thimblely/shared';
import tw from 'twrnc';

interface InputProps extends TextInputProps {
  label?: string;
  icon?: LucideIcon;
  error?: string;
  rightIcon?: React.ReactNode;
}

export function Input({
  label,
  icon: Icon,
  error,
  rightIcon,
  style,
  ...textInputProps
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={tw`w-full`}>
      {/* Label */}
      {label && (
        <Text
          style={[
            tw`text-sm text-[${colors.black}] mb-2`,
            { fontFamily: 'Outfit_400Regular' },
          ]}
        >
          {label}
        </Text>
      )}

      {/* Input Field */}
      <View style={tw`relative`}>
        <View
          style={tw`flex-row items-center border border-[rgba(0,0,0,0.1)] rounded-xl px-4 py-4 ${
            isFocused ? 'bg-white' : 'bg-transparent'
          } ${error ? 'border-red-500' : ''}`}
        >
          {/* Left Icon */}
          {Icon && (
            <View style={tw`mr-2`}>
              <Icon size={16} color={colors.greyText} />
            </View>
          )}

          {/* Text Input */}
          <TextInput
            style={[
              tw`flex-1 text-sm text-[${colors.black}]`,
              { fontFamily: 'Outfit_400Regular' },
              style,
            ]}
            placeholderTextColor={colors.greyText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...textInputProps}
          />

          {/* Right Icon (e.g., Eye icon for password) */}
          {rightIcon && <View style={tw`ml-2`}>{rightIcon}</View>}
        </View>
      </View>

      {/* Error Message */}
      {error && (
        <Text
          style={[
            tw`text-xs text-red-500 mt-1`,
            { fontFamily: 'Outfit_400Regular' },
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
