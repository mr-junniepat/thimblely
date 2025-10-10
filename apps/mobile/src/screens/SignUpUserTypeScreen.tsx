import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@mobile/navigation';
import { colors } from '@thimblely/shared';
import { ProgressIndicator } from '@mobile/components/ProgressIndicator';
import {
  ShoppingBag,
  Building2,
  ChevronLeft,
  ShoppingBasket,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';

type SignUpUserTypeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUpUserType'>;
};

type UserType = 'customer' | 'business' | null;

export function SignUpUserTypeScreen({
  navigation,
}: SignUpUserTypeScreenProps) {
  const [selectedType, setSelectedType] = useState<UserType>(null);

  const handleNext = () => {
    if (selectedType) {
      navigation.navigate('SignUpCountry', { userType: selectedType });
    }
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

        <ProgressIndicator currentStep={1} totalSteps={4} />

        <View style={tw`w-10`} />
      </View>

      <ScrollView
        style={tw`flex-1 px-6 relative z-10`}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <View style={tw`mt-6 mb-10`}>
          <Text
            style={[
              tw`text-4xl text-[${colors.black}] mb-4`,
              { fontFamily: 'Outfit_500Medium' },
            ]}
          >
            How would you like to use{' '}
            <Text style={tw`text-[${colors.complimentary}]`}>Thimblely</Text> ?
          </Text>
          <Text
            style={[
              tw`text-base text-[${colors.greyText}]`,
              { fontFamily: 'Outfit_400Regular' },
            ]}
          >
            Pick the option that best describes you. You can always create
            another account type later.
          </Text>
        </View>

        {/* User Type Options */}
        <View style={tw`gap-2`}>
          {/* Customer Option */}
          <TouchableOpacity
            onPress={() => setSelectedType('customer')}
            activeOpacity={0.7}
          >
            <View
              style={tw`bg-white border ${
                selectedType === 'customer'
                  ? 'border-[${colors.complimentary}] border-2'
                  : 'border-[rgba(0,0,0,0.1)]'
              } rounded-xl p-4`}
            >
              <View
                style={tw`w-12 h-12 rounded-xl items-center justify-center mb-3`}
              >
                <ShoppingBasket size={24} color={colors.complimentary} />
              </View>
              <Text
                style={[
                  tw`text-sm text-[${colors.black}] mb-2 font-bold`,
                  { fontFamily: 'Outfit_600SemiBold' },
                ]}
              >
                Customer
              </Text>
              <Text
                style={[
                  tw`text-xs text-[${colors.greyText}] leading-5`,
                  { fontFamily: 'Outfit_400Regular' },
                ]}
              >
                Discover styles, connect with skilled tailors, and order unique
                outfits crafted to fit you perfectly
              </Text>
            </View>
          </TouchableOpacity>

          {/* Business Owner Option */}
          <TouchableOpacity
            onPress={() => setSelectedType('business')}
            activeOpacity={0.7}
          >
            <View
              style={tw`bg-white border ${
                selectedType === 'business'
                  ? 'border-[${colors.complimentary}] border-2'
                  : 'border-[rgba(0,0,0,0.1)]'
              } rounded-xl p-4`}
            >
              <View
                style={tw`w-12 h-12 bg-[${colors.lightPink}] rounded-xl items-center justify-center mb-3`}
              >
                <Building2 size={24} color={colors.complimentary} />
              </View>
              <Text
                style={[
                  tw`text-sm text-[${colors.black}] mb-2 font-bold`,
                  { fontFamily: 'Outfit_600SemiBold' },
                ]}
              >
                Business Owner
              </Text>
              <Text
                style={[
                  tw`text-xs text-[${colors.greyText}] leading-5`,
                  { fontFamily: 'Outfit_400Regular' },
                ]}
              >
                Showcase your work, attract customers worldwide, and grow your
                fashion brand with Stitch-meister tools.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Next Button */}
      <View style={tw`p-6 pb-10 relative z-10`}>
        <TouchableOpacity
          onPress={handleNext}
          disabled={!selectedType}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={colors.gradients.cta}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0, 0.49648, 0.97115]}
            style={tw`py-4 rounded-full items-center justify-center ${
              !selectedType ? 'opacity-50' : ''
            }`}
          >
            <Text
              style={[
                tw`text-white text-sm`,
                { fontFamily: 'Outfit_400Regular' },
              ]}
            >
              Next
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
