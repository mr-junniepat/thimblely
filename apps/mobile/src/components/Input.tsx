import React from 'react';
import { View, Text, TextInput, TextInputProps, ViewStyle } from 'react-native';
import { colors } from '@thimblely/shared';
import { LucideIcon } from 'lucide-react-native';
import tw from 'twrnc';

interface InputProps extends TextInputProps {
  label?: string;
  icon?: LucideIcon;
  rightIcon?: React.ReactNode;
  error?: string;
  containerStyle?: ViewStyle;
}

export function Input({
  label,
  icon: Icon,
  rightIcon,
  error,
  containerStyle,
  ...props
}: InputProps) {
  return (
    <View style={[{ marginBottom: 16 }, containerStyle]}>
      {label && (
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'Outfit-Regular',
            fontWeight: 'normal',
            color: colors.black,
            marginBottom: 8,
          }}
        >
          {label}
        </Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.white,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: error ? colors.error : colors.border,
          paddingHorizontal: 16,
          minHeight: 51,
        }}
      >
        {Icon && (
          <View style={{ marginRight: 8 }}>
            <Icon size={20} color={colors.textSecondary} />
          </View>
        )}
        <TextInput
          style={{
            flex: 1,
            fontSize: 14,
            fontWeight: '400',
            color: colors.black,
            paddingVertical: 16,
            paddingLeft: Icon ? 0 : undefined,
          }}
          placeholderTextColor={colors.textSecondary}
          {...props}
        />
        {rightIcon && <View style={{ marginLeft: 8 }}>{rightIcon}</View>}
      </View>
      {error && (
        <Text style={{ fontSize: 12, color: colors.error, marginTop: 4 }}>
          {error}
        </Text>
      )}
    </View>
  );
}
