import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

interface PlanningCardProps {
  iconColor: string;
  backgroundColor: string;
  title: string;
  description: string;
  status: string;
  statusColor: string;
  onPress?: () => void;
}

const PlanningCard: React.FC<PlanningCardProps> = ({
  iconColor,
  backgroundColor,
  title,
  description,
  status,
  statusColor,
  onPress,
}) => {
  const colors = {
    black: '#111113',
    greyText: '#68666F',
  };

  const CardContent = (
    <>
      <View style={tw`flex-row items-center justify-between mb-4`}>
        <View style={tw`w-6 h-6`}>
          {/* Icon placeholder */}
          <View
            style={[tw`w-6 h-6 rounded-full`, { backgroundColor: iconColor }]}
          />
        </View>
        <Text
          style={[
            tw`text-xs`,
            {
              color: statusColor,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          {status}
        </Text>
      </View>
      <View style={tw`w-[91px]`}>
        <Text
          style={[
            tw`text-sm mb-1`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          {title}
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
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[tw`flex-1 p-4 rounded-lg`, { backgroundColor }]}
      >
        {CardContent}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[tw`flex-1 p-4 rounded-lg`, { backgroundColor }]}>
      {CardContent}
    </View>
  );
};

export default PlanningCard;
