import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import tw from 'twrnc';

// Import colors directly from the source file
const colors = {
  complimentary: '#A30552',
  greyText: '#68666F',
  black: '#111113',
};

interface ChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'outline';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
}

export default function Chip({
  label,
  active = false,
  onPress,
  size = 'medium',
  variant = 'default',
  icon: Icon,
  iconPosition = 'left',
}: ChipProps) {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingHorizontal: 12,
          paddingVertical: 6,
          fontSize: 10,
          minWidth: 50,
          iconSize: 12,
          gap: 4,
          height: 32,
        };
      case 'medium':
        return {
          paddingHorizontal: 16,
          paddingVertical: 8,
          fontSize: 12,
          minWidth: 65,
          iconSize: 14,
          gap: 6,
          height: 32,
        };
      case 'large':
        return {
          paddingHorizontal: 20,
          paddingVertical: 10,
          fontSize: 14,
          minWidth: 80,
          iconSize: 16,
          gap: 8,
          height: 38,
        };
      default:
        return {
          paddingHorizontal: 16,
          paddingVertical: 8,
          fontSize: 12,
          minWidth: 65,
          iconSize: 14,
          gap: 6,
          height: 32,
        };
    }
  };

  const getVariantStyles = () => {
    if (variant === 'outline') {
      return {
        backgroundColor: active ? colors.complimentary : 'transparent',
        borderWidth: 1,
        borderColor: active ? colors.complimentary : colors.greyText,
        textColor: active ? 'white' : colors.greyText,
      };
    }

    return {
      backgroundColor: active ? colors.complimentary : '#F5F5F7',
      borderWidth: 0,
      borderColor: 'transparent',
      textColor: active ? 'white' : colors.greyText,
    };
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        tw`flex-row items-center justify-center rounded-full`,
        {
          backgroundColor: variantStyles.backgroundColor,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          paddingVertical: sizeStyles.paddingVertical,
          minWidth: sizeStyles.minWidth,
          height: sizeStyles.height,
          borderWidth: variantStyles.borderWidth,
          borderColor: variantStyles.borderColor,
          gap: sizeStyles.gap,
        },
      ]}
    >
      {Icon && iconPosition === 'left' && (
        <Icon size={sizeStyles.iconSize} color={variantStyles.textColor} />
      )}

      <Text
        style={[
          tw`font-normal`,
          {
            fontSize: sizeStyles.fontSize,
            color: variantStyles.textColor,
            fontFamily: 'Satoshi Variable',
            textAlignVertical: 'center',
            includeFontPadding: false,
          },
        ]}
      >
        {label}
      </Text>

      {Icon && iconPosition === 'right' && (
        <Icon size={sizeStyles.iconSize} color={variantStyles.textColor} />
      )}
    </TouchableOpacity>
  );
}
