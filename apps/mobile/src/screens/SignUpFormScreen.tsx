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
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@mobile/navigation';
import { colors } from '@thimblely/shared';
import { ProgressIndicator } from '@mobile/components/ProgressIndicator';
import { Input } from '@mobile/components/Input';
import {
  ChevronLeft,
  Mail,
  User,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';

type SignUpFormScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUpForm'>;
  route: RouteProp<RootStackParamList, 'SignUpForm'>;
};

export function SignUpFormScreen({ navigation, route }: SignUpFormScreenProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.username &&
    formData.password &&
    acceptedTerms;

  const handleNext = () => {
    if (isFormValid) {
      navigation.navigate('SignUpVerify', {
        userType: route.params.userType,
        country: route.params.country,
        email: formData.email,
      });
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
        source={require('../../assets/images/bgfirstsignup.png')}
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
        <View style={tw`mt-6 mb-6`}>
          <Text
            style={[
              tw`text-3xl text-[${colors.complimentary}] mb-2`,
              { fontFamily: 'Outfit_500Medium' },
            ]}
          >
            Create Account
          </Text>
          <Text
            style={[
              tw`text-base text-[${colors.greyText}]`,
              { fontFamily: 'Outfit_400Regular' },
            ]}
          >
            Just a few details so we can set up your perfect fit.
          </Text>
        </View>

        {/* Form */}
        <View style={tw`gap-5 mb-5`}>
          {/* First Name and Last Name - Side by Side */}
          <View style={tw`flex-row gap-4`}>
            <View style={tw`flex-1`}>
              <Input
                label="First Name"
                placeholder="Email"
                value={formData.firstName}
                onChangeText={(text) =>
                  setFormData({ ...formData, firstName: text })
                }
              />
            </View>
            <View style={tw`flex-1`}>
              <Input
                label="Last Name"
                placeholder="Email"
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
          style={tw`flex-row items-start mb-5`}
        >
          <View
            style={tw`w-4 h-4 border border-[#B6B6B6] rounded mr-3 mt-0.5 items-center justify-center ${
              acceptedTerms
                ? 'bg-[${colors.complimentary}] border-[${colors.complimentary}]'
                : ''
            }`}
          >
            {acceptedTerms && <View style={tw`w-2 h-2 bg-white rounded-sm`} />}
          </View>
          <Text
            style={[
              tw`text-xs text-[#5E5656] flex-1`,
              { fontFamily: 'Outfit_400Regular' },
            ]}
          >
            By signing up, you accept thimblely{' '}
            <Text style={tw`underline`}>Terms of Services</Text> and{' '}
            <Text style={tw`underline`}>privacy</Text> and{' '}
            <Text style={tw`underline`}>cookies</Text>.
          </Text>
        </TouchableOpacity>

        {/* Create Account Button */}
        <TouchableOpacity
          onPress={handleNext}
          disabled={!isFormValid}
          activeOpacity={0.8}
          style={tw`mb-5`}
        >
          <LinearGradient
            colors={
              isFormValid
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
              Create Account
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Or Divider */}
        <View style={tw`flex-row items-center mb-5`}>
          <View style={tw`flex-1 h-px bg-gray-300`} />
          <Text
            style={[
              tw`mx-3 text-sm text-[${colors.black}]`,
              { fontFamily: 'Outfit_400Regular' },
            ]}
          >
            Or
          </Text>
          <View style={tw`flex-1 h-px bg-gray-300`} />
        </View>

        {/* Sign up with Google */}
        <TouchableOpacity
          onPress={handleGoogleSignUp}
          activeOpacity={0.7}
          style={tw`mb-5`}
        >
          <View
            style={tw`flex-row items-center justify-center py-4 rounded-full border border-[#D2CDCD] bg-white`}
          >
            <Image
              source={require('../../assets/images/google_logo.png')}
              style={tw`w-6 h-6 mr-3`}
              resizeMode="contain"
            />
            <Text
              style={[
                tw`text-sm text-[${colors.black}]`,
                { fontFamily: 'Outfit_400Regular' },
              ]}
            >
              Sign up with Google
            </Text>
          </View>
        </TouchableOpacity>

        {/* Already have an account */}
        <View style={tw`items-center`}>
          <Text style={[tw`text-xs`, { fontFamily: 'Outfit_400Regular' }]}>
            <Text style={tw`text-[#7F7F7F]`}>Already have an account ? </Text>
            <Text style={tw`text-[#6A2374]`} onPress={handleLogin}>
              Log in
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
