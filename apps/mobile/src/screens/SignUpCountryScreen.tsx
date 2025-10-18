import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import tw from 'twrnc';
import { RootStackParamList } from '../App';
import { ProgressIndicator, SearchBar } from '../components';
import { ChevronLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  gradients: {
    cta: ['#A30552', '#56062D', '#A30552'] as const,
  },
};

type SignUpCountryScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUpCountry'>;
  route: any;
};

const COUNTRIES = [
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
];

export default function SignUpCountryScreen({
  navigation,
  route,
}: SignUpCountryScreenProps) {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = COUNTRIES.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNext = () => {
    if (selectedCountry) {
      navigation.navigate('SignUpForm', {
        userType: route.params.userType,
        country: selectedCountry,
      });
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

        <ProgressIndicator currentStep={2} totalSteps={4} />

        <View style={tw`w-10`} />
      </View>

      <View style={tw`flex-1 px-6 relative z-10`}>
        {/* Title */}
        <View style={{ marginTop: 24, marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: 'Outfit-Medium',
              fontWeight: '700',
              fontSize: 40,
              color: colors.black,
              marginBottom: 16, // Gap from Figma
              letterSpacing: -1.6,
              maxWidth: 320,
            }}
          >
            Where In The{' '}
            <Text style={{ color: colors.complimentary }}>World</Text> Are You ?
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 16, // From Figma (Satoshi Variable Regular)
              color: colors.greyText,
              letterSpacing: -0.64,
            }}
          >
            We'll customize your experience based on your location
          </Text>
        </View>

        {/* Search Input */}
        <SearchBar
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          containerStyle={{ marginBottom: 24 }}
        />

        {/* Country List - Card Style - Scrollable */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={tw`flex-1`}
          contentContainerStyle={{ gap: 16, paddingBottom: 24 }}
        >
          {filteredCountries.map((country) => (
            <TouchableOpacity
              key={country.code}
              onPress={() => setSelectedCountry(country.code)}
              activeOpacity={0.7}
            >
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,0.5)', // From Figma
                  borderWidth: 1,
                  borderColor:
                    selectedCountry === country.code
                      ? colors.complimentary
                      : 'rgba(0,0,0,0.1)', // From Figma
                  borderRadius: 10, // From Figma
                  paddingHorizontal: 12, // From Figma
                  paddingVertical: 16, // From Figma
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12, // From Figma
                }}
              >
                <Text style={{ fontSize: 18, width: 18, height: 18 }}>
                  {country.flag}
                </Text>
                <Text
                  style={{
                    fontSize: 16, // From Figma (Satoshi Variable Regular)
                    fontWeight: '400',
                    color: colors.black,
                    flex: 1,
                  }}
                >
                  {country.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Next Button */}
      <View style={tw`p-6 pb-10 relative z-10`}>
        <TouchableOpacity
          onPress={handleNext}
          disabled={!selectedCountry}
          activeOpacity={0.8}
        >
          <View
            style={{
              backgroundColor: selectedCountry ? undefined : '#E8E8E8', // Disabled color from Figma
              borderRadius: 32,
              paddingVertical: 12,
              paddingHorizontal: 8,
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 51,
            }}
          >
            {selectedCountry ? (
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
                fontSize: 14,
                color: '#FFFFFF',
                zIndex: 1,
              }}
            >
              Next
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
