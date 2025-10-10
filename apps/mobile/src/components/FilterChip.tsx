import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { colors } from '@thimblely/shared';
import tw from 'twrnc';

interface FilterChipProps {
  label: string;
  icon?: LucideIcon;
  isActive?: boolean;
  onPress?: () => void;
}

export function FilterChip({
  label,
  icon: Icon,
  isActive = false,
  onPress,
}: FilterChipProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={tw.style(
        `flex-row items-center gap-2 px-3 py-2 rounded-full`,
        isActive ? `bg-[${colors.complimentary}]` : 'bg-gray-100'
      )}
    >
      {Icon && (
        <Icon size={14} color={isActive ? colors.white : colors.greyText} />
      )}
      <Text
        style={[
          tw`text-xs`,
          {
            fontFamily: 'Outfit_400Regular',
            color: isActive ? colors.white : colors.greyText,
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
