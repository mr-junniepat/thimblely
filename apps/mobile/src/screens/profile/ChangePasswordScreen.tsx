import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Input } from '../../components';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  gradientStart: '#A30552',
  gradientMiddle: '#56062D',
  gradientEnd: '#A30552',
};

export default function ChangePasswordScreen({ navigation }: any) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = () => {
    // Handle password reset logic here
    console.log('Reset password');
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Status Bar Space */}
      <View style={tw`h-12`} />

      {/* Header */}
      <View style={tw`px-6 py-4 flex-row items-center`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={colors.black} />
        </TouchableOpacity>
        <Text
          style={[
            tw`text-base font-bold ml-4`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          Change Password
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={tw`px-6 mt-8`}>
          {/* Current Password */}
          <Input
            label="Current Password"
            placeholder="Enter current password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry={!showCurrentPassword}
            rightIcon={
              <TouchableOpacity
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeOff size={16} color={colors.greyText} />
                ) : (
                  <Eye size={16} color={colors.greyText} />
                )}
              </TouchableOpacity>
            }
            containerStyle={{ marginBottom: 24 }}
          />

          {/* New Password */}
          <Input
            label="New Password"
            placeholder="Enter new password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showNewPassword}
            rightIcon={
              <TouchableOpacity
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff size={16} color={colors.greyText} />
                ) : (
                  <Eye size={16} color={colors.greyText} />
                )}
              </TouchableOpacity>
            }
            containerStyle={{ marginBottom: 8 }}
          />

          {/* Password Requirements */}
          <View style={tw`mb-6`}>
            <View style={tw`flex-row justify-between mb-1`}>
              <Text
                style={[
                  tw`text-xs`,
                  {
                    color: colors.greyText,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                8-20 Characters
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
                Number(s)
              </Text>
            </View>
            <View style={tw`flex-row gap-6`}>
              <Text
                style={[
                  tw`text-xs`,
                  {
                    color: colors.greyText,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Upper & Lowercase
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
                Special Characters
              </Text>
            </View>
          </View>

          {/* Confirm Password */}
          <Input
            label="Confirm Password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            rightIcon={
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff size={16} color={colors.greyText} />
                ) : (
                  <Eye size={16} color={colors.greyText} />
                )}
              </TouchableOpacity>
            }
            containerStyle={{ marginBottom: 32 }}
          />

          {/* Reset Password Button */}
          <TouchableOpacity onPress={handleResetPassword}>
            <LinearGradient
              colors={[
                colors.gradientStart,
                colors.gradientMiddle,
                colors.gradientEnd,
              ]}
              locations={[0, 0.496, 0.971]}
              style={[
                tw`py-4 px-6 rounded-full items-center`,
                {
                  borderRadius: 32,
                },
              ]}
            >
              <Text
                style={[
                  tw`text-sm font-normal`,
                  {
                    color: 'white',
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Reset Password
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
