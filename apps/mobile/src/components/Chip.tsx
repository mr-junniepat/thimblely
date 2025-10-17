import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
// Import colors directly from the source file
const colors = {
  complimentary: '#A30552',
  greyText: '#68666F',
  black: '#111113',
};
import { LucideIcon } from 'lucide-react-native';

interface ChipProps {
  label: string;
  icon?: LucideIcon;
  active?: boolean;
  onPress?: () => void;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'outline' | 'filled';
}

export default function Chip({
  label,
  icon: Icon,
  active = false,
  onPress,
  size = 'medium',
  variant = 'default',
}: ChipProps) {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingHorizontal: 8,
          paddingVertical: 4,
          fontSize: 10,
          iconSize: 12,
          borderRadius: 32,
        };
      case 'large':
        return {
          paddingHorizontal: 16,
          paddingVertical: 8,
          fontSize: 16,
          iconSize: 18,
          borderRadius: 32,
        };
      default: // medium
        return {
          paddingHorizontal: 16,
          paddingVertical: 8,
          fontSize: 12,
          iconSize: 14,
          borderRadius: 32,
        };
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: active ? colors.complimentary : colors.greyText,
          textColor: active ? colors.complimentary : colors.greyText,
          iconColor: active ? colors.complimentary : colors.greyText,
        };
      case 'filled':
        return {
          backgroundColor: active ? colors.complimentary : '#F5F5F7',
          borderWidth: 0,
          textColor: active ? 'white' : colors.greyText,
          iconColor: active ? 'white' : colors.greyText,
        };
      default: // default
        return {
          backgroundColor: active ? colors.complimentary : '#F5F5F7',
          borderWidth: 0,
          textColor: active ? 'white' : colors.greyText,
          iconColor: active ? 'white' : colors.greyText,
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: sizeStyles.paddingHorizontal,
        paddingVertical: sizeStyles.paddingVertical,
        backgroundColor: variantStyles.backgroundColor,
        borderWidth: variantStyles.borderWidth,
        borderColor: variantStyles.borderColor,
        borderRadius: sizeStyles.borderRadius,
        gap: Icon ? 8 : 0,
        minWidth: 65,
      }}
      activeOpacity={0.7}
    >
      {Icon && (
        <Icon size={sizeStyles.iconSize} color={variantStyles.iconColor} />
      )}
      <Text
        style={{
          fontSize: sizeStyles.fontSize,
          fontWeight: '400',
          color: variantStyles.textColor,
          fontFamily: 'Outfit-Regular',
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
