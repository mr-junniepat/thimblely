import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  actionColor?: string;
  onActionPress?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionText,
  actionColor = '#A30552',
  onActionPress,
}) => {
  const colors = {
    black: '#111113',
  };

  return (
    <View style={tw`flex-row items-center justify-between mb-6`}>
      <Text
        style={[
          tw`text-sm font-bold`,
          {
            color: colors.black,
            fontFamily: 'Satoshi Variable',
          },
        ]}
      >
        {title}
      </Text>
      {actionText && (
        <TouchableOpacity onPress={onActionPress}>
          <Text
            style={[
              tw`text-xs`,
              {
                color: actionColor,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            {actionText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionHeader;
