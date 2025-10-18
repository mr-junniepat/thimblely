import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
// Import colors directly from the source file
const colors = {
  complimentary: '#A30552',
  greyText: '#68666F',
  black: '#111113',
};
import tw from 'twrnc';
import { LucideIcon } from 'lucide-react-native';

interface HeaderProps {
  title?: string;
  rightIcon?: LucideIcon;
  onRightIconPress?: () => void;
  showLogo?: boolean;
  rightIcons?: Array<{
    icon: LucideIcon;
    onPress?: () => void;
    size?: number;
    color?: string;
  }>;
}

export default function Header({
  title,
  rightIcon: RightIcon,
  onRightIconPress,
  showLogo = true,
  rightIcons,
}: HeaderProps) {
  return (
    <View style={tw`px-4 py-4 flex-row items-center justify-between`}>
      <View style={tw`flex-row items-center gap-2`}>
        {showLogo && (
          <View style={tw`w-8 h-8`}>
            <Image
              source={require('../../assets/images/small_logo.png')}
              style={tw`w-full h-full`}
              resizeMode="contain"
            />
          </View>
        )}
        {title && (
          <Text
            style={{ fontSize: 18, fontWeight: '700', color: colors.black }}
          >
            {title}
          </Text>
        )}
        {!title && (
          <Text style={{ fontSize: 14, fontWeight: '400', color: 'black' }}>
            Thimblely
          </Text>
        )}
      </View>

      {/* Support for multiple right icons */}
      {rightIcons && rightIcons.length > 0 ? (
        <View style={tw`flex-row items-center gap-4`}>
          {rightIcons.map((iconConfig, index) => {
            const IconComponent = iconConfig.icon;
            return (
              <TouchableOpacity
                key={index}
                onPress={iconConfig.onPress}
                style={{
                  width: 32,
                  height: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconComponent
                  size={iconConfig.size || 24}
                  color={iconConfig.color || colors.black}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        /* Single right icon with circular background */
        RightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: colors.complimentary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RightIcon size={16} color="white" />
          </TouchableOpacity>
        )
      )}
    </View>
  );
}
