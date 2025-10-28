import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
// import { colors } from '@thimblely/shared';
const colors = {
  black: '#111113',
  complimentary: '#A30552',
  greyText: '#68666F',
  purple: '#9810FA',
  mutedGrey: '#4E4C59',
  purpleLink: '#C175FF',
  lightGrey: '#9CA3AF',
  white: '#FFFFFF',
};
import { ProgressIndicator, GradientButton, Toast } from '../../../components';
import { ChevronLeft } from 'lucide-react-native';
import { supabase } from '../../../lib/supabase';
import { useToast } from '../../../hooks';
import { createWelcomeNotification } from '../../profile/NotificationsScreen';
import tw from 'twrnc';

type SignUpVerifyScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUpVerify'>;
  route: RouteProp<RootStackParamList, 'SignUpVerify'>;
};

export default function SignUpVerifyScreen({
  navigation,
  route,
}: SignUpVerifyScreenProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(65); // 1:05 in seconds
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const { toast, showToast, hideToast } = useToast();

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}s`;
  };

  const handleCodeChange = (text: string, index: number) => {
    // Only allow numbers
    if (text && !/^\d+$/.test(text)) return;

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    setTimer(65);
    setCode(['', '', '', '', '', '']);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: route.params.email,
      });
      if (error) {
        showToast(error.message, 'error');
      } else {
        showToast('Verification code sent!', 'success');
      }
    } catch (error: any) {
      showToast('Failed to resend code. Please try again.', 'error');
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join('');
    if (verificationCode.length !== 6) {
      showToast('Please enter a complete 6-digit code', 'warning');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: route.params.email,
        token: verificationCode,
        type: 'signup',
      });

      if (error) {
        showToast(error.message || 'Invalid verification code', 'error');
      } else if (data) {
        // Create welcome notification
        if (data.user?.id) {
          await createWelcomeNotification(data.user.id, supabase);
        }

        showToast('Account verified successfully!', 'success');
        setTimeout(() => {
          navigation.navigate('MainTabs');
        }, 1500);
      }
    } catch (error: any) {
      showToast(
        error?.message || 'Verification failed. Please try again.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const isCodeComplete = code.every((digit) => digit !== '');

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Background Image Overlay */}
      <ImageBackground
        source={require('../../../../assets/images/bgfirstsignup.png')}
        style={tw`absolute top-0 left-0 right-0 h-[611px]`}
        resizeMode="cover"
        imageStyle={{ opacity: 1 }}
      />

      {/* Status Bar Space */}
      <View style={tw`h-12`} />

      {/* Header with Back Button and Progress */}
      <View
        style={tw`flex-row items-center justify-between px-6 py-4 relative z-10`}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`w-10 h-10 items-center justify-center`}
        >
          <ChevronLeft size={24} color={colors.black} />
        </TouchableOpacity>

        <ProgressIndicator currentStep={4} totalSteps={4} />

        <View style={tw`w-10`} />
      </View>

      <View style={tw`flex-1 px-6 relative z-10`}>
        {/* Title Section */}
        <View style={{ marginTop: 24, marginBottom: 47 }}>
          {/* Title */}
          <Text
            style={{
              fontFamily: 'Outfit-Medium',
              fontWeight: '500',
              fontSize: 40,
              color: colors.black,
              marginBottom: 12, // Gap from Figma
              letterSpacing: -1.6,
            }}
          >
            <Text style={{ color: colors.complimentary }}>Verify</Text> your
            account
          </Text>

          {/* Subtitle */}
          <Text
            style={{
              fontFamily: 'Outfit-Regular',
              fontWeight: '400',
              fontSize: 16,
              color: colors.greyText, // #68666F
              letterSpacing: -0.64,
            }}
          >
            We've sent a 6-digit code to g********@gmail.com Enter it below to
            continue.
          </Text>
        </View>

        {/* OTP Input Section */}
        <View style={{ gap: 16, marginBottom: 47 }}>
          {/* OTP Boxes */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            {code.map((digit, index) => (
              <View
                key={index}
                style={{
                  width: 50, // From Figma
                  height: 50, // From Figma
                  borderWidth: 1,
                  borderColor: digit
                    ? '#6A2374' // Active border color from Figma
                    : 'rgba(0,0,0,0.1)', // Inactive border from Figma
                  borderRadius: 5, // From Figma
                  backgroundColor: colors.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TextInput
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={{
                    fontSize: 14, // From Figma
                    fontWeight: '400',
                    color: '#1F2937', // From Figma (blacktext)
                    textAlign: 'center',
                    width: '100%',
                    height: '100%',
                    padding: 0,
                  }}
                  value={digit}
                  onChangeText={(text) => handleCodeChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                />
              </View>
            ))}
          </View>

          {/* Timer and Resend */}
          <Text
            style={{
              fontFamily: 'Outfit-Regular',
              fontWeight: '400',
              fontSize: 12, // From Figma
              textAlign: 'center',
              width: '100%',
            }}
          >
            <Text style={{ color: colors.lightGrey }}>
              {formatTime(timer)}{' '}
            </Text>
            <Text
              style={{
                color: colors.purple, // #6B2374
                textDecorationLine: 'underline',
              }}
              onPress={timer === 0 ? handleResend : undefined}
            >
              Resend verification code
            </Text>
          </Text>
        </View>

        {/* Verify Account Button */}
        <GradientButton
          title={loading ? 'Verifying...' : 'Verify Account'}
          onPress={handleVerify}
          disabled={!isCodeComplete || loading}
        />
      </View>

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
