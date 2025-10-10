import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ImageBackground,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@mobile/navigation';
import { colors } from '@thimblely/shared';
import { ProgressIndicator } from '@mobile/components/ProgressIndicator';
import { ChevronLeft, Search } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';

type SignUpCountryScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUpCountry'>;
  route: RouteProp<RootStackParamList, 'SignUpCountry'>;
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

export function SignUpCountryScreen({
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
        <View style={tw`mt-6 mb-6`}>
          <Text
            style={[
              tw`text-4xl text-[${colors.black}] mb-4`,
              { fontFamily: 'Outfit_500Medium' },
            ]}
          >
            Where In The{' '}
            <Text style={tw`text-[${colors.complimentary}]`}>World</Text> Are
            You ?
          </Text>
          <Text
            style={[
              tw`text-base text-[${colors.greyText}]`,
              { fontFamily: 'Outfit_400Regular' },
            ]}
          >
            We'll customize your experience based on your location
          </Text>
        </View>

        {/* Search Input - Sticky */}
        <View style={tw`mb-6 bg-white`}>
          <View
            style={tw`flex-row items-center bg-white/50 border border-[rgba(0,0,0,0.1)] rounded-full px-4 py-3`}
          >
            <Search size={16} color={colors.complimentary} />
            <TextInput
              style={[
                tw`flex-1 ml-3 text-sm text-[${colors.black}]`,
                { fontFamily: 'Outfit_400Regular' },
              ]}
              placeholder="Search"
              placeholderTextColor={colors.black}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Country List - Card Style - Scrollable */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={tw`flex-1`}
          contentContainerStyle={tw`gap-4 pb-6`}
        >
          {filteredCountries.map((country) => (
            <TouchableOpacity
              key={country.code}
              onPress={() => setSelectedCountry(country.code)}
              activeOpacity={0.7}
            >
              <View
                style={tw.style(
                  `bg-white/50 border border-[rgba(0,0,0,0.1)] rounded-xl px-3 py-4 flex-row items-center gap-3`,
                  selectedCountry === country.code && {
                    borderColor: colors.complimentary,
                    borderWidth: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  }
                )}
              >
                <Text style={tw`text-lg`}>{country.flag}</Text>
                <Text
                  style={[
                    tw`text-base text-[${colors.black}] flex-1`,
                    { fontFamily: 'Outfit_400Regular' },
                  ]}
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
          <LinearGradient
            colors={
              selectedCountry
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
                tw`text-sm ${selectedCountry ? 'text-white' : 'text-white'}`,
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
