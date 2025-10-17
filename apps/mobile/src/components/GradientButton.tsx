import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@thimblely/shared';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: any;
}

export function GradientButton({
  title,
  onPress,
  disabled = false,
  style,
}: GradientButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[style]}
    >
      <LinearGradient
        colors={[
          COLORS.complimentary,
          COLORS.complimentaryDark,
          COLORS.complimentary,
        ]}
        locations={[0, 0.49648, 0.97115]} // From Figma gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, disabled && styles.disabled]}
      >
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 32, // From Figma login button
    paddingVertical: 12, // From Figma
    paddingHorizontal: 8, // From Figma
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 51, // Height from Figma
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: COLORS.white,
    fontSize: 14, // From Figma
    fontFamily: 'Outfit-Regular', // Outfit font from Figma
    fontWeight: 'normal',
  },
});
