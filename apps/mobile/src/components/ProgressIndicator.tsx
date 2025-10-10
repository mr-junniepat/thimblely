import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
}: ProgressIndicatorProps) {
  return (
    <View style={tw`flex-row gap-1.5`}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <View
          key={index}
          style={tw`w-14 h-1 rounded-full ${
            index < currentStep ? 'bg-[#A30552]' : 'bg-[#D9D9D9]'
          }`}
        />
      ))}
    </View>
  );
}
