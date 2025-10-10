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
import { RootStackParamList } from '@mobile/navigation';
import { colors } from '@thimblely/shared';
import { Input } from '@mobile/components/Input';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export function LoginScreen({ navigation }: LoginScreenProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const isFormValid = formData.email && formData.password;

  const handleLogin = () => {
    if (isFormValid) {
      // TODO: Implement login
      navigation.navigate('Home');
    }
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google login
    console.log('Google login');
  };

  const handleForgotPassword = () => {
    // TODO: Navigate to forgot password screen
    console.log('Forgot password');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUpUserType');
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Background Image Overlay */}
      <ImageBackground
        source={require('../../assets/images/bgfirstsignup.png')}
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
            style={[
              tw`text-4xl text-[${colors.black}] mb-3`,
              { fontFamily: 'Outfit_500Medium' },
            ]}
          >
            <Text style={tw`text-[${colors.complimentary}]`}>
              Welcome{'\n'}
            </Text>
            Back!
          </Text>
          <Text
            style={[
              tw`text-base text-[${colors.greyText}]`,
              { fontFamily: 'Outfit_400Regular' },
            ]}
          >
            Let's pick up right where you left off.
          </Text>
        </View>

        {/* Form */}
        <View style={tw`gap-4 mb-6`}>
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
                tw`text-xs text-[${colors.black}]`,
                { fontFamily: 'Outfit_400Regular' },
              ]}
            >
              Remember me
            </Text>
          </TouchableOpacity>

          {/* Forgot Password */}
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text
              style={[
                tw`text-xs text-[${colors.purple}]`,
                { fontFamily: 'Outfit_400Regular' },
              ]}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          disabled={!isFormValid}
          activeOpacity={0.8}
          style={tw`mb-6`}
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
              Login
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Or Divider */}
        <View style={tw`flex-row items-center mb-6`}>
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

        {/* Continue with Google */}
        <TouchableOpacity
          onPress={handleGoogleLogin}
          activeOpacity={0.7}
          style={tw`mb-6`}
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
              Continue with Google
            </Text>
          </View>
        </TouchableOpacity>

        {/* Don't have an account */}
        <View style={tw`items-center`}>
          <Text style={[tw`text-xs`, { fontFamily: 'Outfit_400Regular' }]}>
            <Text style={tw`text-[#7F7F7F]`}>Don't have an account ? </Text>
            <Text style={tw`text-[${colors.purple}]`} onPress={handleSignUp}>
              Sign up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
