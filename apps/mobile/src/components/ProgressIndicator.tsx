import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '@thimblely/shared';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
}: ProgressIndicatorProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.bar,
            index < currentStep ? styles.activeBar : styles.inactiveBar,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5, // From Figma
  },
  bar: {
    width: 55, // From Figma
    height: 4, // From Figma
    borderRadius: 36, // Fully rounded from Figma
  },
  activeBar: {
    backgroundColor: COLORS.complimentary, // #A30552 from Figma
  },
  inactiveBar: {
    backgroundColor: '#D9D9D9', // From Figma
  },
});
