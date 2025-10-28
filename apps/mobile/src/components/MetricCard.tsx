import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

interface MetricCardProps {
  iconColor: string;
  label: string;
  value: string;
  description: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  iconColor,
  label,
  value,
  description,
}) => {
  const colors = {
    black: '#111113',
    greyText: '#68666F',
  };

  return (
    <View style={tw`items-center flex-1`}>
      <View style={tw`flex-row items-center justify-center mb-3`}>
        <View style={tw`w-4 h-4 mr-2`}>
          {/* Icon placeholder */}
          <View
            style={[tw`w-4 h-4 rounded-full`, { backgroundColor: iconColor }]}
          />
        </View>
        <Text
          style={[
            tw`text-sm`,
            {
              color: iconColor,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          {label}
        </Text>
      </View>
      <View style={tw`items-start w-full`}>
        <Text
          style={[
            tw`text-base mb-1`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          {value}
        </Text>
        <Text
          style={[
            tw`text-xs`,
            {
              color: colors.greyText,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          {description}
        </Text>
      </View>
    </View>
  );
};

export default MetricCard;
