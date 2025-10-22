import React from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'twrnc';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  white: '#FFFFFF',
  lightGrey: '#F5F5F7',
  blue: '#007AFF',
};

interface WorkspaceStatCardProps {
  icon?: React.ComponentType<any>;
  iconSource?: any;
  iconSize?: number;
  iconColor?: string;
  label: string;
  value: string | number;
  change?: string;
  changeColor?: string;
}

export default function WorkspaceStatCard({
  icon: Icon,
  iconSource,
  iconSize = 24,
  iconColor = colors.greyText,
  label,
  value,
  change,
  changeColor = colors.blue,
}: WorkspaceStatCardProps) {
  return (
    <View
      style={[
        tw`flex-1 bg-white p-4 rounded-lg flex-row items-center gap-4`,
        {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 4,
        },
      ]}
    >
      {iconSource ? (
        <Image
          source={iconSource}
          style={[tw`w-6 h-6`, { tintColor: iconColor }]}
          resizeMode="contain"
        />
      ) : Icon ? (
        <Icon size={iconSize} color={iconColor} />
      ) : null}

      <View style={tw`flex-1`}>
        <Text
          style={[
            tw`text-xs font-normal mb-1`,
            {
              color: colors.greyText,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          {label}
        </Text>
        <View style={tw`flex-row items-end gap-1`}>
          <Text
            style={[
              tw`text-base font-bold`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
                letterSpacing: -0.64,
              },
            ]}
          >
            {value}
          </Text>
          {change && (
            <Text
              style={[
                tw`text-xs font-normal`,
                {
                  color: changeColor,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              {change}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
