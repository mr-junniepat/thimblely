import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Input, GradientButton, Toast } from '../../components';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { useAuthContext } from '../../contexts/AuthContext';
import { useToast } from '../../hooks';
import tw from 'twrnc';

const colors = {
  black: '#111113',
  complimentary: '#A30552',
  greyText: '#68666F',
  purple: '#9810FA',
  mutedGrey: '#4E4C59',
  purpleLink: '#C175FF',
};

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuthContext();
  const { toast, showToast, hideToast } = useToast();

  const isFormValid = formData.email && formData.password;

  const handleLogin = async () => {
    if (!isFormValid) {
      showToast('Please fill in all fields', 'warning');
      return;
    }

    setLoading(true);
    try {
      const result = await signIn(formData.email, formData.password);
      if (result.success) {
        showToast('Login successful!', 'success');
        setTimeout(() => {
          navigation.navigate('MainTabs');
        }, 1500);
      } else {
        showToast(
          result.error?.message || 'Invalid credentials. Please try again.',
          'error'
        );
      }
    } catch (error: any) {
      showToast(
        error?.message || 'An unexpected error occurred. Please try again.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    // TODO: Implement Google login with Supabase
    showToast('Google login coming soon', 'info');
  };

  const handleForgotPassword = () => {
    showToast('Please contact support to reset your password', 'info');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUpUserType');
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Background Image Overlay */}
      <ImageBackground
        source={require('../../../assets/images/bgfirstsignup.png')}
        style={tw`absolute top-0 left-0 right-0 h-[611px]`}
        resizeMode="cover"
        imageStyle={{ opacity: 1 }}
      />

      {/* Status Bar Space */}
      <View style={tw`h-12`} />

      <ScrollView
        style={tw`flex-1 px-6 relative z-10`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}
      >
        {/* Title */}
        <View style={tw`mt-6 mb-8`}>
          <Text
            style={{
              fontFamily: 'Outfit-Medium',
              fontWeight: '600',
              fontSize: 40,
              color: colors.black,
              marginBottom: 12,
              letterSpacing: -1.6,
            }}
          >
            <Text style={{ color: colors.complimentary }}>Welcome{'\n'}</Text>
            Back!
          </Text>
          <Text
            style={{
              fontFamily: 'Outfit-Regular',
              fontWeight: '400',
              fontSize: 16,
              color: colors.greyText,
              letterSpacing: -0.64,
            }}
          >
            Let's pick up right where you left off.
          </Text>
        </View>

        {/* Form */}
        <View style={tw` mb-4`}>
          {/* Email */}
          <Input
            label="Email"
            placeholder="Email"
            icon={Mail}
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />

          {/* Password */}
          <Input
            label="Password"
            placeholder="Create Password"
            icon={Lock}
            secureTextEntry={!showPassword}
            value={formData.password}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
            rightIcon={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={20} color={colors.greyText} />
                ) : (
                  <Eye size={20} color={colors.greyText} />
                )}
              </TouchableOpacity>
            }
          />
        </View>

        {/* Remember Me & Forgot Password */}
        <View style={tw`flex-row items-center justify-between mb-6`}>
          {/* Remember Me Toggle */}
          <TouchableOpacity
            onPress={() => setRememberMe(!rememberMe)}
            activeOpacity={0.7}
            style={tw`flex-row items-center gap-1.5`}
          >
            <View
              style={tw.style(`w-9 h-5 rounded-full relative`, {
                backgroundColor: rememberMe
                  ? 'rgba(163, 5, 82, 0.09)'
                  : '#E5E5E5',
              })}
            >
              <View
                style={tw.style(`w-5 h-5 rounded-full absolute top-0`, {
                  backgroundColor: rememberMe
                    ? colors.complimentary
                    : '#FFFFFF',
                  left: rememberMe ? 16 : 0,
                })}
              />
            </View>
            <Text
              style={[
                tw`text-xs`,
                {
                  fontFamily: 'Outfit-Regular',
                  color: colors.black,
                },
              ]}
            >
              Remember me
            </Text>
          </TouchableOpacity>

          {/* Forgot Password */}
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text
              style={[
                tw`text-xs`,
                {
                  fontFamily: 'Outfit-Regular',
                  color: colors.purple,
                },
              ]}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <GradientButton
          title={loading ? 'Logging in...' : 'Login'}
          onPress={handleLogin}
          disabled={!isFormValid || loading}
          style={tw`mb-6`}
        />

        {/* Or Divider */}
        <View style={tw`flex-row items-center mb-6`}>
          <View style={tw`flex-1 h-px bg-gray-300`} />
          <Text
            style={[
              tw`mx-3 text-sm`,
              {
                fontFamily: 'Outfit-Regular',
                color: colors.black,
              },
            ]}
          >
            Or
          </Text>
          <View style={tw`flex-1 h-px bg-gray-300`} />
        </View>

        {/* Continue with Google */}
        <TouchableOpacity
          onPress={handleGoogleLogin}
          activeOpacity={0.7}
          style={tw`mb-6`}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 10, // From Figma
              paddingHorizontal: 16, // From Figma
              borderRadius: 32, // From Figma
              borderWidth: 1,
              borderColor: '#D2CDCD', // From Figma
              backgroundColor: 'white',
              gap: 12, // From Figma
            }}
          >
            <Image
              source={require('../../../assets/images/google_logo.png')}
              style={tw`w-6 h-6`}
              resizeMode="contain"
            />
            <Text
              style={[
                {
                  fontFamily: 'Outfit-Regular',
                  fontSize: 14,
                  color: colors.black,
                },
              ]}
            >
              Continue with Google
            </Text>
          </View>
        </TouchableOpacity>

        {/* Don't have an account */}
        <View style={tw`items-center`}>
          <Text style={{ fontFamily: 'Outfit-Regular', fontSize: 12 }}>
            <Text style={{ color: colors.mutedGrey }}>
              Don't have an account ?{' '}
            </Text>
            <Text style={{ color: colors.purpleLink }} onPress={handleSignUp}>
              Sign up
            </Text>
          </Text>
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
