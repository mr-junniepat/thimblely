import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { colors } from '@thimblely/shared';
import tw from 'twrnc';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  children,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return tw`bg-[${colors.primaryDark}]`; // #19051A from Figma
      case 'secondary':
        return tw`bg-white border-0`;
      case 'outline':
        return tw`bg-transparent border border-[${colors.complimentary}]`;
      default:
        return tw`bg-[${colors.primaryDark}]`;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return colors.white;
      case 'secondary':
        return colors.black;
      case 'outline':
        return colors.complimentary;
      default:
        return colors.white;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        tw`py-3.5 px-4 rounded-full items-center justify-center w-full`,
        tw.style({ minHeight: 48 }),
        getVariantStyles(),
        disabled && tw`opacity-50`,
        style,
      ]}
    >
      <Text
        style={[
          tw`text-base`,
          {
            fontFamily: 'Outfit-Regular',
            fontWeight: '400',
            color: getTextColor(),
          },
          textStyle,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
