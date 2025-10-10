import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@thimblely/shared';
import tw from 'twrnc';

export type ButtonVariant = 'primary' | 'secondary' | 'gradient';

interface ButtonProps {
  onPress: () => void;
  variant?: ButtonVariant;
  children: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  onPress,
  variant = 'primary',
  children,
  style,
  textStyle,
}: ButtonProps) {
  const baseButtonStyle = tw`py-3.5 px-4 rounded-full items-center justify-center`;
  const baseTextStyle = tw`text-base font-normal`;

  // Gradient button (for login with gold gradient)
  if (variant === 'gradient') {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={style}>
        <LinearGradient
          colors={colors.gradients.logo}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[baseButtonStyle, tw`shadow-lg`]}
        >
          <Text
            style={[
              baseTextStyle,
              tw`text-[${colors.primaryDark}]`,
              { fontFamily: 'Outfit_400Regular' },
              textStyle,
            ]}
          >
            {children}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  // Primary button (white background, black text)
  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[baseButtonStyle, tw`bg-white shadow-lg`, style]}
      >
        <Text
          style={[
            baseTextStyle,
            tw`text-black`,
            { fontFamily: 'Outfit_400Regular' },
            textStyle,
          ]}
        >
          {children}
        </Text>
      </TouchableOpacity>
    );
  }

  // Secondary button (dark background, white text)
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        baseButtonStyle,
        tw`bg-[${colors.primaryDark}] border-2 border-white/20`,
        style,
      ]}
    >
      <Text
        style={[
          baseTextStyle,
          tw`text-white`,
          { fontFamily: 'Outfit_400Regular' },
          textStyle,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
