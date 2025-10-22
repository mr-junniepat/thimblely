import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

interface OverviewStatProps {
  value: string | number;
  label: string;
}

export default function OverviewStat({ value, label }: OverviewStatProps) {
  return (
    <View style={tw`items-center flex-1`}>
      <Text
        style={[
          tw`text-base font-bold`,
          {
            color: '#111113',
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
            color: '#68666F',
            fontFamily: 'Satoshi Variable',
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}
