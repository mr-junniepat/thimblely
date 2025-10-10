import React from 'react';
import { View } from 'react-native';
import { colors } from '@thimblely/shared';
import tw from 'twrnc';

interface ThimbleLogoProps {
  size?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

export function ThimbleLogo({
  size = 120,
  primaryColor = colors.logoGold,
  secondaryColor = colors.logoOrange,
}: ThimbleLogoProps) {
  const scale = size / 120;

  return (
    <View
      style={tw.style(`items-center justify-center relative`, {
        width: size,
        height: size,
      })}
    >
      <View
        style={tw.style(`rounded-[50px]`, {
          width: 100,
          height: 110,
          backgroundColor: primaryColor,
          borderColor: secondaryColor,
          borderWidth: 4,
          borderBottomLeftRadius: 60,
          borderBottomRightRadius: 60,
          transform: [{ rotate: '10deg' }, { scale }],
        })}
      />
      <View
        style={tw.style(`absolute flex-row flex-wrap`, {
          width: 70,
          height: 80,
          top: 15,
          left: 25,
          gap: 6,
          transform: [{ rotate: '10deg' }, { scale }],
        })}
      >
        {[...Array(12)].map((_, i) => (
          <View
            key={i}
            style={tw.style(`rounded`, {
              width: 8,
              height: 8,
              backgroundColor: secondaryColor,
            })}
          />
        ))}
      </View>
    </View>
  );
}
