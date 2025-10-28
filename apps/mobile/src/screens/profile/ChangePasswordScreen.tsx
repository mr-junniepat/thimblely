import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react-native';
import { Input, Toast, GradientButton } from '../../components';
import { supabase } from '../../lib/supabase';
import { useAuthContext } from '../../contexts/AuthContext';
import { useToast } from '../../hooks';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
};

export default function ChangePasswordScreen({ navigation }: any) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useAuthContext();
  const { toast, showToast, hideToast } = useToast();

  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    number: false,
    lowercase: false,
    uppercase: false,
    specialChar: false,
  });

  const checkPasswordStrength = (password: string) => {
    setPasswordStrength({
      length: password.length >= 8 && password.length <= 20,
      number: /\d/.test(password),
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const validatePassword = (password: string): boolean => {
    checkPasswordStrength(password);
    return (
      passwordStrength.length &&
      passwordStrength.number &&
      passwordStrength.lowercase &&
      passwordStrength.uppercase &&
      passwordStrength.specialChar
    );
  };

  const handleResetPassword = async () => {
    // Validate inputs
    if (!currentPassword) {
      showToast('Please enter your current password', 'warning');
      return;
    }

    if (!validatePassword(newPassword)) {
      showToast('New password does not meet requirements', 'warning');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match', 'warning');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Verify current password by trying to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: currentPassword,
      });

      if (signInError) {
        showToast('Current password is incorrect', 'error');
        setLoading(false);
        return;
      }

      // Step 2: Update password using Supabase updateUser
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        showToast('Failed to update password', 'error');
      } else {
        showToast('Password updated successfully!', 'success');
        // Clear form
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error: any) {
      showToast(error?.message || 'An error occurred', 'error');
    } finally {
      setLoading(false);
    }
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
            onChangeText={(text) => {
              setNewPassword(text);
              checkPasswordStrength(text);
            }}
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
          {newPassword.length > 0 && (
            <View style={tw`mb-6`}>
              <View style={tw`mb-2`}>
                <Text
                  style={[
                    tw`text-xs mb-1`,
                    {
                      color: passwordStrength.length
                        ? '#10B981'
                        : colors.greyText,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  ✓ {passwordStrength.length ? '' : ''}8-20 Characters
                </Text>
                <Text
                  style={[
                    tw`text-xs mb-1`,
                    {
                      color: passwordStrength.number
                        ? '#10B981'
                        : colors.greyText,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  ✓ {passwordStrength.number ? '' : ''}Contains Number(s)
                </Text>
                <Text
                  style={[
                    tw`text-xs mb-1`,
                    {
                      color: passwordStrength.lowercase
                        ? '#10B981'
                        : colors.greyText,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  ✓ {passwordStrength.lowercase ? '' : ''}Contains Lowercase
                </Text>
                <Text
                  style={[
                    tw`text-xs mb-1`,
                    {
                      color: passwordStrength.uppercase
                        ? '#10B981'
                        : colors.greyText,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  ✓ {passwordStrength.uppercase ? '' : ''}Contains Uppercase
                </Text>
                <Text
                  style={[
                    tw`text-xs`,
                    {
                      color: passwordStrength.specialChar
                        ? '#10B981'
                        : colors.greyText,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  ✓ {passwordStrength.specialChar ? '' : ''}Contains Special
                  Characters
                </Text>
              </View>
            </View>
          )}

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
            containerStyle={{ marginBottom: 8 }}
          />

          {/* Password Match Indicator */}
          {confirmPassword.length > 0 && (
            <Text
              style={[
                tw`text-xs mb-6`,
                {
                  color:
                    newPassword === confirmPassword ? '#10B981' : '#EF4444',
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              {newPassword === confirmPassword
                ? '✓ Passwords match'
                : '✗ Passwords do not match'}
            </Text>
          )}

          {/* Reset Password Button */}
          <GradientButton
            title={loading ? 'Updating...' : 'Reset Password'}
            onPress={handleResetPassword}
            disabled={loading}
          />
        </View>
      </ScrollView>

      {/* Toast */}
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        position={toast.position}
        onHide={hideToast}
      />
    </View>
  );
}
