import React from 'react';
import { TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { LucideIcon } from 'lucide-react-native';

interface FloatingButtonProps {
  icon: LucideIcon;
  iconColor?: string;
  backgroundColor?: string;
  onPress?: () => void;
  size?: number;
  borderColor?: string;
  borderWidth?: number;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  icon: Icon,
  iconColor = '#FFFFFF',
  backgroundColor = '#A30552',
  onPress,
  size = 24,
  borderColor,
  borderWidth,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tw`absolute bottom-20 right-6 w-14 h-14 rounded-full items-center justify-center`,
        {
          backgroundColor,
          borderColor,
          borderWidth,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.1,
          shadowRadius: 16,
          elevation: 8,
        },
      ]}
    >
      <Icon size={size} color={iconColor} />
    </TouchableOpacity>
  );
};

export default FloatingButton;
