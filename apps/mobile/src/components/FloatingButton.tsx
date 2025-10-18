import React from 'react';
import { TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Plus } from 'lucide-react-native';

// Import colors directly
const colors = {
  complimentary: '#A30552',
};

interface FloatingButtonProps {
  onPress?: () => void;
  icon?: React.ComponentType<any>;
  iconSize?: number;
  iconColor?: string;
  backgroundColor?: string;
  size?: number;
  bottom?: number;
  right?: number;
  left?: number;
}

export default function FloatingButton({
  onPress,
  icon: Icon = Plus,
  iconSize = 24,
  iconColor = 'white',
  backgroundColor = colors.complimentary,
  size = 56,
  bottom = 111,
  right = 24,
  left,
}: FloatingButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tw`absolute items-center justify-center rounded-full shadow-lg`,
        {
          backgroundColor,
          width: size,
          height: size,
          padding: 16,
          bottom,
          right: left ? undefined : right,
          left,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.1,
          shadowRadius: 16,
          elevation: 8,
        },
      ]}
    >
      <Icon size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
}
