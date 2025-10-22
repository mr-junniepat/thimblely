import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import { LucideIcon } from 'lucide-react-native';

interface ModuleCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  iconSource?: any;
  iconBg: string;
  iconColor: string;
  status: string;
  statusColor: string;
  onPress?: () => void;
}

export default function ModuleCard({
  title,
  description,
  icon: Icon,
  iconSource,
  iconBg,
  iconColor,
  status,
  statusColor,
  onPress,
}: ModuleCardProps) {
  return (
    <TouchableOpacity
      style={[
        tw`flex-1 rounded-lg overflow-hidden`,
        {
          backgroundColor: '#F9FAFB',
        },
      ]}
      onPress={onPress}
    >
      <View style={tw`p-4 items-center gap-2`}>
        <View
          style={[
            tw`w-12 h-12 rounded-lg items-center justify-center`,
            {
              backgroundColor: iconBg,
            },
          ]}
        >
          {iconSource ? (
            <Image
              source={iconSource}
              style={[tw`w-8 h-8`, { tintColor: iconColor }]}
              resizeMode="contain"
            />
          ) : Icon ? (
            <Icon size={32} color={iconColor} />
          ) : null}
        </View>
        <Text
          style={[
            tw`text-sm font-normal text-center`,
            {
              color: '#111113',
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            tw`text-xs font-normal text-center`,
            {
              color: '#68666F',
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          {description}
        </Text>
      </View>
      <View
        style={[
          tw`p-2 items-center`,
          {
            backgroundColor: '#F5F5F7',
          },
        ]}
      >
        <Text
          style={[
            tw`text-xs font-bold text-center`,
            {
              color: statusColor,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          {status}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
