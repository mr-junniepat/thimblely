import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import tw from 'twrnc';
import { ChevronLeft, Trash2 } from 'lucide-react-native';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  backgroundWhite: '#FAFAFA',
  green: '#34A853',
  red: '#CF1B2B',
};

interface PrivacyOption {
  id: string;
  title: string;
  description: string;
  hasToggle: boolean;
  isEnabled?: boolean;
  value?: string;
  type: 'toggle' | 'value';
}

const profileSettings: PrivacyOption[] = [
  {
    id: '1',
    title: 'Profile Visibility',
    description: 'Who can see your profile',
    hasToggle: false,
    type: 'value',
    value: 'Public',
  },
  {
    id: '2',
    title: 'Show Email Address',
    description: 'Display email on profile',
    hasToggle: true,
    isEnabled: true,
    type: 'toggle',
  },
  {
    id: '3',
    title: 'Show Phone Number',
    description: 'Display phone on your profile',
    hasToggle: true,
    isEnabled: true,
    type: 'toggle',
  },
  {
    id: '4',
    title: 'Profile Searchability',
    description: 'Allow others to find your profile in search',
    hasToggle: true,
    isEnabled: true,
    type: 'toggle',
  },
];

const interactionSettings: PrivacyOption[] = [
  {
    id: '5',
    title: 'Allow messages',
    description: 'Let other send you direct messages',
    hasToggle: true,
    isEnabled: false,
    type: 'toggle',
  },
  {
    id: '6',
    title: 'Allow comments',
    description: 'Let others comment on your posts',
    hasToggle: true,
    isEnabled: true,
    type: 'toggle',
  },
  {
    id: '7',
    title: 'Allow followers',
    description: 'Let others follow your profile',
    hasToggle: true,
    isEnabled: true,
    type: 'toggle',
  },
  {
    id: '8',
    title: 'Show online status',
    description: "Display when you're online",
    hasToggle: true,
    isEnabled: true,
    type: 'toggle',
  },
];

const dataSettings: PrivacyOption[] = [
  {
    id: '9',
    title: 'Analytics & Insights',
    description: 'Help improve the app with usage data',
    hasToggle: true,
    isEnabled: false,
    type: 'toggle',
  },
];

export default function ProfilePrivacyScreen({ navigation }: any) {
  const [profileOptions, setProfileOptions] = useState(profileSettings);
  const [interactionOptions, setInteractionOptions] =
    useState(interactionSettings);
  const [dataOptions, setDataOptions] = useState(dataSettings);

  const toggleOption = (
    id: string,
    section: 'profile' | 'interaction' | 'data'
  ) => {
    const updateOptions = (options: PrivacyOption[]) =>
      options.map((option) =>
        option.id === id ? { ...option, isEnabled: !option.isEnabled } : option
      );

    switch (section) {
      case 'profile':
        setProfileOptions(updateOptions);
        break;
      case 'interaction':
        setInteractionOptions(updateOptions);
        break;
      case 'data':
        setDataOptions(updateOptions);
        break;
    }
  };

  const handleDeleteAccount = () => {
    console.log('Delete Account pressed');
    // Add delete account logic here
  };

  const renderSection = (
    title: string,
    options: PrivacyOption[],
    section: 'profile' | 'interaction' | 'data'
  ) => (
    <View style={tw`mb-8`}>
      <Text
        style={[
          tw`text-base font-bold mb-4`,
          {
            color: colors.black,
            fontFamily: 'Satoshi Variable',
          },
        ]}
      >
        {title}
      </Text>
      <View style={tw`bg-white rounded-lg`}>
        {options.map((option, index) => (
          <View
            key={option.id}
            style={[
              tw`flex-row items-center justify-between py-6`,
              index < options.length - 1 && {
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(0,0,0,0.05)',
              },
            ]}
          >
            {/* Left side - Text Content */}
            <View style={tw`flex-1`}>
              <Text
                style={[
                  tw`text-sm font-medium mb-1`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {option.title}
              </Text>
              <Text
                style={[
                  tw`text-xs`,
                  {
                    color: colors.greyText,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {option.description}
              </Text>
            </View>

            {/* Right side - Toggle or Value */}
            {option.type === 'toggle' ? (
              <Switch
                value={option.isEnabled}
                onValueChange={() => toggleOption(option.id, section)}
                trackColor={{
                  false: '#D9D9D9',
                  true: 'rgba(163,5,82,0.09)',
                }}
                thumbColor={
                  option.isEnabled ? colors.complimentary : colors.greyText
                }
                style={{
                  transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
                }}
              />
            ) : (
              <View
                style={[
                  tw`px-4 py-2 rounded-full`,
                  {
                    backgroundColor: 'rgba(52,168,83,0.1)',
                  },
                ]}
              >
                <Text
                  style={[
                    tw`text-xs font-bold`,
                    {
                      color: colors.green,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  {option.value}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Status Bar Space */}
      <View style={tw`h-12`} />

      {/* Header */}
      <View style={tw`px-6 py-4 flex-row items-center`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={colors.black} />
        </TouchableOpacity>
        <Text
          style={[
            tw`text-base font-bold ml-4`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          Profile Privacy
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={tw`px-6 mt-8`}>
          {renderSection('Profile Settings', profileOptions, 'profile')}
          {renderSection(
            'Interaction Settings',
            interactionOptions,
            'interaction'
          )}
          {renderSection('Data & Analytics', dataOptions, 'data')}

          {/* Delete Account Button */}
          <TouchableOpacity
            style={[
              tw`flex-row items-center justify-center gap-2 py-4 px-6 rounded-full mt-8`,
              {
                backgroundColor: '#F5F5F7',
              },
            ]}
            onPress={handleDeleteAccount}
          >
            <Trash2 size={16} color={colors.red} />
            <Text
              style={[
                tw`text-sm`,
                {
                  color: colors.red,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
