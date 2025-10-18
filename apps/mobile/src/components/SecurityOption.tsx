import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import tw from 'twrnc';
import { ChevronDown } from 'lucide-react-native';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  backgroundWhite: '#FAFAFA',
};

interface SecurityOptionProps {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  hasToggle: boolean;
  isEnabled?: boolean;
  value?: string;
  onToggle?: (id: string) => void;
  onValuePress?: (id: string) => void;
  showBorder?: boolean;
}

export default function SecurityOption({
  id,
  title,
  description,
  icon: Icon,
  hasToggle,
  isEnabled = false,
  value,
  onToggle,
  onValuePress,
  showBorder = true,
}: SecurityOptionProps) {
  return (
    <View
      style={[
        tw`flex-row items-center justify-between py-6`,
        showBorder && {
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(0,0,0,0.05)',
        },
      ]}
    >
      {/* Left side - Icon and Text */}
      <View style={tw`flex-row items-center gap-3 flex-1`}>
        {/* Icon */}
        <View
          style={[
            tw`w-10 h-10 rounded items-center justify-center`,
            {
              backgroundColor: 'rgba(163,5,82,0.09)',
            },
          ]}
        >
          <Icon size={20} color={colors.complimentary} />
        </View>

        {/* Text Content */}
        <View style={tw`flex-1`}>
          <Text
            style={[
              tw`text-sm font-medium mb-1`,
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
      </View>

      {/* Right side - Toggle or Selector */}
      {hasToggle ? (
        <Switch
          value={isEnabled}
          onValueChange={() => onToggle?.(id)}
          trackColor={{
            false: '#D9D9D9',
            true: 'rgba(163,5,82,0.09)',
          }}
          thumbColor={isEnabled ? colors.complimentary : colors.greyText}
          style={{
            transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
          }}
        />
      ) : (
        <TouchableOpacity
          style={[
            tw`px-4 py-3 rounded-full flex-row items-center gap-2`,
            {
              backgroundColor: colors.backgroundWhite,
            },
          ]}
          onPress={() => onValuePress?.(id)}
        >
          <Text
            style={[
              tw`text-sm`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            {value}
          </Text>
          <ChevronDown size={16} color={colors.black} />
        </TouchableOpacity>
      )}
    </View>
  );
}
