import React from 'react';
import { View, Text, TextInput, TextInputProps, ViewStyle } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import tw from 'twrnc';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  white: '#FFFFFF',
  error: '#CF1B2B',
  border: 'rgba(0,0,0,0.1)',
  textSecondary: '#68666F',
};

interface InputProps extends TextInputProps {
  label?: string;
  icon?: LucideIcon;
  rightIcon?: React.ReactNode;
  error?: string;
  containerStyle?: ViewStyle;
}

export function Input({
  label,
  icon: Icon,
  rightIcon,
  error,
  containerStyle,
  multiline = false,
  ...props
}: InputProps) {
  return (
    <View style={[{ marginBottom: 15 }, containerStyle]}>
      {label && (
        <Text
          style={[
            tw`text-sm font-bold mb-2`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          {label}
        </Text>
      )}
      <View
        style={[
          tw`border rounded-lg px-4 flex-row items-center`,
          {
            borderColor: error ? colors.error : colors.border,
            backgroundColor: colors.white,
            minHeight: multiline ? 80 : 51,
            maxHeight: multiline ? 120 : 60,
          },
        ]}
      >
        {Icon && (
          <View style={tw`mr-2`}>
            <Icon size={16} color={colors.textSecondary} />
          </View>
        )}
        <TextInput
          style={[
            tw`flex-1 text-sm font-normal`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
              paddingVertical: multiline ? 8 : 0,
              textAlignVertical: multiline ? 'top' : 'center',
            },
          ]}
          placeholderTextColor={colors.textSecondary}
          multiline={multiline}
          {...props}
        />
        {rightIcon && <View style={tw`ml-2`}>{rightIcon}</View>}
      </View>
      {error && (
        <Text
          style={[
            tw`text-xs font-normal mt-1`,
            {
              color: colors.error,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
