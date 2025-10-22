import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import { LucideIcon } from 'lucide-react-native';

interface StatCardProps {
  /** The icon to display */
  icon: LucideIcon;
  /** The main value/number to display */
  value: number | string;
  /** The label text below the value */
  label: string;
  /** The color theme for the card */
  color: string;
  /** Background color of the card */
  backgroundColor?: string;
  /** Whether the card should take full width */
  fullWidth?: boolean;
}

export default function StatCard({
  icon: Icon,
  value,
  label,
  color,
  backgroundColor = '#FFFFFF',
  fullWidth = false,
}: StatCardProps) {
  return (
    <View
      style={[
        tw`p-2 rounded-lg flex-row items-center gap-4`,
        {
          backgroundColor,
        },
      ]}
    >
      {/* Icon Container */}
      <View
        style={[
          tw`w-10 h-10 rounded-full items-center justify-center`,
          {
            backgroundColor: `${color}20`,
          },
        ]}
      >
        <Icon size={16} color={color} />
      </View>

      {/* Content */}
      <View style={tw`flex-1`}>
        <Text
          style={[
            tw`text-base font-bold`,
            {
              color,
              fontFamily: 'Satoshi Variable',
              letterSpacing: -0.64,
            },
          ]}
        >
          {value}
        </Text>
        <Text
          style={[
            tw`text-xs`,
            {
              color: '#111113',
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          {label}
        </Text>
      </View>
    </View>
  );
}
