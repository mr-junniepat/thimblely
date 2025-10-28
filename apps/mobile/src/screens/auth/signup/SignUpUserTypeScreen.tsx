import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { ProgressIndicator, GradientButton } from '../../../components';

const colors = {
  black: '#111113',
  complimentary: '#A30552',
  greyText: '#68666F',
};
import { Building2, ChevronLeft, ShoppingBasket } from 'lucide-react-native';
import tw from 'twrnc';

type SignUpUserTypeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUpUserType'>;
};

type UserType = 'customer' | 'business' | null;

export default function SignUpUserTypeScreen({
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

        <ProgressIndicator currentStep={1} totalSteps={4} />

        <View style={tw`w-10`} />
      </View>

      <ScrollView
        style={tw`flex-1 px-6 relative z-10`}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <View style={{ marginTop: 24, marginBottom: 40 }}>
          <Text
            style={{
              fontFamily: 'Outfit-Medium',
              fontWeight: '500', // Medium weight from Figma
              fontSize: 40,
              color: colors.black,
              marginBottom: 16,
              letterSpacing: -1.6,
              maxWidth: 320,
            }}
          >
            How would you like to use{' '}
            <Text style={{ color: colors.complimentary }}>Thimblely</Text> ?
          </Text>
          <Text
            style={{
              fontFamily: 'Outfit-Regular',
              fontWeight: '400', // Regular weight from Figma
              fontSize: 16,
              color: colors.greyText,
              letterSpacing: -0.64,
            }}
          >
            Pick the option that best describes you. You can always create
            another account type later.
          </Text>
        </View>

        {/* User Type Options */}
        <View style={{ gap: 8 }}>
          {/* Customer Option */}
          <TouchableOpacity
            onPress={() => setSelectedType('customer')}
            activeOpacity={0.7}
          >
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.5)', // From Figma
                borderWidth: 1,
                borderColor:
                  selectedType === 'customer'
                    ? colors.complimentary
                    : 'rgba(0,0,0,0.1)', // From Figma
                borderRadius: 10, // From Figma
                padding: 16, // From Figma
                gap: 8, // From Figma
              }}
            >
              <View style={{ width: 24, height: 24 }}>
                <ShoppingBasket size={24} color={colors.complimentary} />
              </View>
              <Text
                style={{
                  fontSize: 14, // From Figma
                  fontWeight: '700', // Bold from Figma (Satoshi Variable Bold)
                  color: colors.black,
                }}
              >
                Customer
              </Text>
              <Text
                style={{
                  fontSize: 12, // From Figma
                  fontWeight: '400', // Regular from Figma (Satoshi Variable Regular)
                  color: colors.greyText,
                  lineHeight: 12, // 100% line height from Figma
                }}
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
              style={{
                backgroundColor: 'rgba(255,255,255,0.5)', // From Figma
                borderWidth: 1,
                borderColor:
                  selectedType === 'business'
                    ? colors.complimentary
                    : 'rgba(0,0,0,0.1)', // From Figma
                borderRadius: 10, // From Figma
                padding: 16, // From Figma
                gap: 8, // From Figma
              }}
            >
              <View style={{ width: 24, height: 24 }}>
                <Building2 size={24} color={colors.complimentary} />
              </View>
              <Text
                style={{
                  fontSize: 14, // From Figma
                  fontWeight: '700', // Bold from Figma (Satoshi Variable Bold)
                  color: colors.black,
                }}
              >
                Business Owner
              </Text>
              <Text
                style={{
                  fontSize: 12, // From Figma
                  fontWeight: '400', // Regular from Figma (Satoshi Variable Regular)
                  color: colors.greyText,
                  lineHeight: 12, // 100% line height from Figma
                }}
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
        <GradientButton
          title="Next"
          onPress={handleNext}
          disabled={!selectedType}
        />
      </View>
    </View>
  );
}
