import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import tw from 'twrnc';
import { ChevronLeft, Camera } from 'lucide-react-native';
import BaseModal from './BaseModal';
import { Button } from './Button';
import { GradientButton } from './GradientButton';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  backgroundGrey: '#F5F5F7',
  borderGrey: 'rgba(0,0,0,0.1)',
};

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  profile: {
    name: string;
    username: string;
    bio: string;
    email: string;
    phone: string;
    country: string;
    avatar: string;
  };
  onSave: (updatedProfile: any) => void;
}

export default function EditProfileModal({
  visible,
  onClose,
  profile,
  onSave,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    name: profile.name,
    username: profile.username,
    bio: profile.bio,
    email: profile.email,
    phone: profile.phone,
    country: profile.country,
    avatar: profile.avatar,
  });

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      onBack={onClose}
      title="EDIT PROFILE"
      height="100%"
      showCloseButton={false}
      showBackButton={true}
      headerContent={
        <View style={tw`flex-row items-center justify-between w-full px-4`}>
          <Text
            style={[
              tw`text-base font-bold`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            EDIT PROFILE
          </Text>

          <GradientButton
            title="Save Profile"
            onPress={handleSave}
            style={{ paddingHorizontal: 12, paddingVertical: 8 }}
          />
        </View>
      }
    >
      <View style={tw`items-center pb-6`}>
        {/* Avatar Section */}
        <View style={tw`items-center mb-6`}>
          <View style={tw`mb-3`}>
            <Image
              source={{ uri: formData.avatar }}
              style={tw`w-25 h-25 rounded-full`}
              resizeMode="cover"
            />
          </View>
          <TouchableOpacity
            style={[
              tw`px-4 py-2 rounded-full`,
              {
                backgroundColor: 'rgba(163,5,82,0.09)',
              },
            ]}
          >
            <Text
              style={[
                tw`text-sm`,
                {
                  color: colors.complimentary,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Change Profile Picture
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={tw`w-full gap-6`}>
          {/* Name */}
          <View style={tw`gap-2`}>
            <Text
              style={[
                tw`text-sm font-medium`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Name
            </Text>
            <TextInput
              style={[
                tw`px-4 py-3 rounded-lg text-sm`,
                {
                  backgroundColor: colors.backgroundGrey,
                  borderWidth: 0.5,
                  borderColor: colors.borderGrey,
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Enter name"
            />
          </View>

          {/* Username */}
          <View style={tw`gap-2`}>
            <Text
              style={[
                tw`text-sm font-medium`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Username
            </Text>
            <TextInput
              style={[
                tw`px-4 py-3 rounded-lg text-sm`,
                {
                  backgroundColor: colors.backgroundGrey,
                  borderWidth: 0.5,
                  borderColor: colors.borderGrey,
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
              value={formData.username}
              onChangeText={(text) =>
                setFormData({ ...formData, username: text })
              }
              placeholder="Enter username"
            />
          </View>

          {/* Bio */}
          <View style={tw`gap-2`}>
            <Text
              style={[
                tw`text-sm font-medium`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Bio
            </Text>
            <TextInput
              style={[
                tw`px-4 py-3 rounded-lg text-sm`,
                {
                  backgroundColor: colors.backgroundGrey,
                  borderWidth: 0.5,
                  borderColor: colors.borderGrey,
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
              value={formData.bio}
              onChangeText={(text) => setFormData({ ...formData, bio: text })}
              placeholder="Enter bio"
              multiline
            />
          </View>

          {/* Email */}
          <View style={tw`gap-2`}>
            <Text
              style={[
                tw`text-sm font-medium`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Email
            </Text>
            <TextInput
              style={[
                tw`px-4 py-3 rounded-lg text-sm`,
                {
                  backgroundColor: colors.backgroundGrey,
                  borderWidth: 0.5,
                  borderColor: colors.borderGrey,
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholder="Enter email"
              keyboardType="email-address"
              editable={false}
            />
          </View>

          {/* Phone */}
          <View style={tw`gap-2`}>
            <Text
              style={[
                tw`text-sm font-medium`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Phone Number
            </Text>
            <TextInput
              style={[
                tw`px-4 py-3 rounded-lg text-sm`,
                {
                  backgroundColor: colors.backgroundGrey,
                  borderWidth: 0.5,
                  borderColor: colors.borderGrey,
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
          </View>

          {/* Country */}
          <View style={tw`gap-2`}>
            <Text
              style={[
                tw`text-sm font-medium`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Country
            </Text>
            <TextInput
              style={[
                tw`px-4 py-3 rounded-lg text-sm`,
                {
                  backgroundColor: colors.backgroundGrey,
                  borderWidth: 0.5,
                  borderColor: colors.borderGrey,
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
              value={formData.country}
              onChangeText={(text) =>
                setFormData({ ...formData, country: text })
              }
              placeholder="Enter country"
            />
          </View>
        </View>
      </View>
    </BaseModal>
  );
}
