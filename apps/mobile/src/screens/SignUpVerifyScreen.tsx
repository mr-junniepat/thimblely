import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@mobile/navigation';
import { colors } from '@thimblely/shared';
import { ProgressIndicator } from '@mobile/components/ProgressIndicator';
import { ChevronLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';

type SignUpVerifyScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUpVerify'>;
  route: RouteProp<RootStackParamList, 'SignUpVerify'>;
};

export function SignUpVerifyScreen({
  navigation,
  route,
}: SignUpVerifyScreenProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(65); // 1:05
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}s`;
  };

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    // Handle backspace
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isCodeComplete = code.every((digit) => digit !== '');

  const handleVerify = () => {
    if (isCodeComplete) {
      // TODO: Verify code and navigate to home
      navigation.navigate('Home');
    }
  };

  const handleResendCode = () => {
    // TODO: Implement resend verification code
    setTimer(65);
    setCode(['', '', '', '', '', '']);
  };

  // Mask email for privacy
  const maskEmail = (email: string) => {
    const [localPart, domain] = email.split('@');
    if (localPart.length <= 2) return email;
    return `${localPart[0]}${'*'.repeat(localPart.length - 1)}@${domain}`;
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Background Image Overlay */}
      <ImageBackground
        source={require('../../assets/images/bgfirstsignup.png')}
        style={tw`absolute top-0 left-0 right-0 h-[746px]`}
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

      <ScrollView
        style={tw`flex-1 px-6 relative z-10`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}
      >
        {/* Title */}
        <View style={tw`mt-6 mb-12`}>
          <Text
            style={[
              tw`text-4xl text-[${colors.black}] mb-3`,
              { fontFamily: 'Outfit_500Medium' },
            ]}
          >
            <Text style={tw`text-[${colors.complimentary}]`}>Verify{'\n'}</Text>
            Your Account
          </Text>
          <Text
            style={[
              tw`text-base text-[${colors.greyText}]`,
              { fontFamily: 'Outfit_400Regular' },
            ]}
          >
            We've sent a 6-digit code to {maskEmail(route.params.email)} Enter
            it below to continue.
          </Text>
        </View>

        {/* Verification Code Inputs */}
        <View style={tw`mb-4`}>
          <View style={tw`flex-row justify-between mb-4`}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                style={[
                  tw`w-12.5 h-12.5 bg-white border rounded-md text-center text-sm`,
                  {
                    fontFamily: 'Outfit_400Regular',
                    borderWidth: 1,
                    borderColor: digit ? colors.purple : 'rgba(0, 0, 0, 0.1)',
                    color: '#1F2937',
                  },
                ]}
                maxLength={1}
                keyboardType="number-pad"
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                onKeyPress={({ nativeEvent }) =>
                  handleKeyPress(nativeEvent.key, index)
                }
              />
            ))}
          </View>

          {/* Timer & Resend */}
          <Text
            style={[
              tw`text-xs text-center`,
              { fontFamily: 'Outfit_400Regular' },
            ]}
          >
            <Text style={tw`text-[#9F9DA0]`}>{formatTime(timer)} </Text>
            <Text
              style={tw`text-[${colors.purple}] underline`}
              onPress={timer === 0 ? handleResendCode : undefined}
            >
              Resend verification code
            </Text>
          </Text>
        </View>

        {/* Verify Button */}
        <View style={tw`mt-8`}>
          <TouchableOpacity
            onPress={handleVerify}
            disabled={!isCodeComplete}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={
                isCodeComplete
                  ? colors.gradients.cta
                  : ['#E8E8E8', '#E8E8E8', '#E8E8E8']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              locations={[0, 0.49648, 0.97115]}
              style={tw`py-4 rounded-full items-center justify-center`}
            >
              <Text
                style={[
                  tw`text-white text-sm`,
                  { fontFamily: 'Outfit_400Regular' },
                ]}
              >
                Verify Account
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
