import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
  textGrey: '#68666F',
  white: '#FFFFFF',
  gradients: {
    purpleToPink: ['#9810FA', '#A30552'],
    cta: ['#A30552', '#56062D', '#A30552'] as const,
  },
};
import { ProgressIndicator, Toast } from '../../../components';
import { Input } from '../../../components/Input';
import {
  ChevronLeft,
  Mail,
  User,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useToast } from '../../../hooks';
import tw from 'twrnc';

type SignUpFormScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUpForm'>;
  route: {
    params: {
      userType: string;
      country: string;
    };
  };
};

export default function SignUpFormScreen({
  navigation,
  route,
}: SignUpFormScreenProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuthContext();
  const { toast, showToast, hideToast } = useToast();

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.username &&
    formData.password &&
    acceptedTerms;

  const handleNext = async () => {
    if (!isFormValid) {
      showToast('Please fill in all fields and accept terms', 'warning');
      return;
    }

    setLoading(true);
    try {
      const result = await signUp(formData.email, formData.password, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        userType: route.params.userType,
        country: route.params.country,
      });
      if (result.success) {
        showToast(
          'Account created! Please check your email for verification',
          'success'
        );
        setTimeout(() => {
          navigation.navigate('SignUpVerify', {
            userType: route.params.userType,
            country: route.params.country,
            email: formData.email,
          });
        }, 2000);
      } else {
        showToast(
          result.error?.message || 'Sign up failed. Please try again.',
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

  const handleGoogleSignUp = () => {
    // TODO: Implement Google sign-up
    console.log('Google sign-up');
  };

  const handleLogin = () => {
    // TODO: Navigate to login screen
    navigation.navigate('Landing');
  };

  return (
    <KeyboardAvoidingView
      style={tw`flex-1 bg-white`}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
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

        <ProgressIndicator currentStep={3} totalSteps={4} />

        <View style={tw`w-10`} />
      </View>

      <ScrollView
        style={tw`flex-1 px-6 relative z-10`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}
      >
        {/* Title */}
        <View style={{ marginTop: 24, marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: 'Outfit-Medium',
              fontWeight: '500',
              fontSize: 32, // From Figma
              color: colors.complimentary, // #A30552
              letterSpacing: -1.28, // From Figma
              marginBottom: 8, // Gap from Figma
            }}
          >
            Create Account
          </Text>
          <Text
            style={{
              fontFamily: 'Outfit-Regular',
              fontWeight: '400',
              fontSize: 16,
              color: colors.greyText, // #68666F
              letterSpacing: -0.64,
              maxWidth: 345,
            }}
          >
            Just a few details so we can set up your perfect fit.
          </Text>
        </View>

        {/* Form */}
        <View style={{ gap: 20, marginBottom: 20 }}>
          {/* First Name and Last Name - Side by Side */}
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <View style={tw`flex-1`}>
              <Input
                label="First Name"
                placeholder="First Name"
                value={formData.firstName}
                onChangeText={(text) =>
                  setFormData({ ...formData, firstName: text })
                }
              />
            </View>
            <View style={tw`flex-1`}>
              <Input
                label="Last Name"
                placeholder="Last Name"
                value={formData.lastName}
                onChangeText={(text) =>
                  setFormData({ ...formData, lastName: text })
                }
              />
            </View>
          </View>

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

          {/* Username */}
          <Input
            label="Username"
            placeholder="Enter Username"
            icon={User}
            autoCapitalize="none"
            value={formData.username}
            onChangeText={(text) =>
              setFormData({ ...formData, username: text })
            }
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

        {/* Terms and Conditions Checkbox */}
        <TouchableOpacity
          onPress={() => setAcceptedTerms(!acceptedTerms)}
          activeOpacity={0.7}
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginBottom: 20,
            height: 48,
          }}
        >
          <View
            style={{
              width: 15, // From Figma
              height: 15, // From Figma
              borderWidth: 1,
              borderColor: '#B6B6B6', // From Figma
              borderRadius: 3, // From Figma
              marginRight: 11, // From Figma (11px to align with text at 35px from left)
              marginTop: 12, // From Figma (to center vertically in 48px container)
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: acceptedTerms
                ? colors.complimentary
                : 'transparent',
            }}
          >
            {acceptedTerms && (
              <View
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: 'white',
                  borderRadius: 1,
                }}
              />
            )}
          </View>
          <Text
            style={{
              fontFamily: 'Outfit-Regular',
              fontWeight: '400',
              fontSize: 13, // From Figma
              color: colors.textGrey, // #5E5656
              flex: 1,
              marginTop: 12, // From Figma (27px from top of 48px container)
            }}
          >
            By signing up, you accept thimblely{' '}
            <Text style={{ textDecorationLine: 'underline' }}>
              Terms of Services
            </Text>{' '}
            and <Text style={{ textDecorationLine: 'underline' }}>privacy</Text>{' '}
            and <Text style={{ textDecorationLine: 'underline' }}>cookies</Text>
            .
          </Text>
        </TouchableOpacity>

        {/* Create Account Button */}
        <TouchableOpacity
          onPress={handleNext}
          disabled={!isFormValid || loading}
          activeOpacity={0.8}
          style={{ marginBottom: 20 }}
        >
          <View
            style={{
              backgroundColor: isFormValid && !loading ? undefined : '#E8E8E8',
              borderRadius: 32,
              paddingVertical: 12,
              paddingHorizontal: 8,
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 51,
            }}
          >
            {isFormValid && !loading ? (
              <LinearGradient
                colors={colors.gradients.cta}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                locations={[0, 0.49648, 0.97115]}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  borderRadius: 32,
                }}
              />
            ) : null}
            <Text
              style={{
                fontFamily: 'Outfit-Regular',
                fontWeight: '400',
                fontSize: 14, // From Figma
                color: '#FFFFFF',
                zIndex: 1,
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Or Divider */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
            width: 345,
            alignSelf: 'center',
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: '#E5E7EB' }} />
          <Text
            style={{
              fontFamily: 'Outfit-Regular',
              fontWeight: '400',
              fontSize: 14, // From Figma
              color: colors.black, // #111113
              marginHorizontal: 12, // Gap from Figma
            }}
          >
            Or
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: '#E5E7EB' }} />
        </View>

        {/* Sign up with Google */}
        <TouchableOpacity
          onPress={handleGoogleSignUp}
          activeOpacity={0.7}
          style={{ marginBottom: 20, width: 345, alignSelf: 'center' }}
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
              height: 51,
            }}
          >
            <Image
              source={require('../../../../assets/images/google_logo.png')}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontFamily: 'Outfit-Regular',
                fontWeight: '400',
                fontSize: 14, // From Figma
                color: colors.black, // #111113
              }}
            >
              Sign up with Google
            </Text>
          </View>
        </TouchableOpacity>

        {/* Already have an account */}
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: 'Outfit-Regular',
              fontWeight: '400',
              fontSize: 12,
            }}
          >
            <Text style={{ color: colors.mutedGrey }}>
              Already have an account ?{' '}
            </Text>
            <Text style={{ color: colors.purpleLink }} onPress={handleLogin}>
              Log in
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
    </KeyboardAvoidingView>
  );
}
