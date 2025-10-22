import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { ChevronLeft, Mail, Phone, Building, Crown } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  white: '#FFFFFF',
  lightGrey: '#F5F5F7',
  red: '#FF383C',
  blue: '#1A73E8',
  purple: '#682476',
};

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  joinedDate: string;
  skills: string[];
  activeProjects: number;
  permissions: string[];
  isOwner?: boolean;
}

interface TeamProfileScreenProps {
  navigation: any;
  route: {
    params: {
      member: TeamMember;
    };
  };
}

export default function TeamProfileScreen({
  navigation,
  route,
}: TeamProfileScreenProps) {
  const { member } = route.params;

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'owner':
        return colors.red;
      case 'manager':
        return colors.blue;
      case 'designer':
        return colors.purple;
      default:
        return colors.greyText;
    }
  };

  const renderContactItem = (
    icon: React.ReactNode,
    label: string,
    value: string
  ) => (
    <View style={tw`flex-row items-center mb-6`}>
      <View
        style={[
          tw`w-10 h-10 rounded-lg items-center justify-center mr-3`,
          {
            backgroundColor: 'rgba(0,0,0,0.09)',
          },
        ]}
      >
        {icon}
      </View>
      <View style={tw`flex-1`}>
        <Text
          style={[
            tw`text-xs uppercase mb-1`,
            {
              color: colors.greyText,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          {label}
        </Text>
        <Text
          style={[
            tw`text-sm`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          {value}
        </Text>
      </View>
    </View>
  );

  const renderSkillChip = (skill: string) => (
    <View
      key={skill}
      style={[
        tw`px-2 py-1 rounded-full mr-2 mb-2`,
        {
          backgroundColor: `${colors.blue}1A`,
        },
      ]}
    >
      <Text
        style={[
          tw`text-sm`,
          {
            color: colors.blue,
            fontFamily: 'Satoshi Variable',
          },
        ]}
      >
        {skill}
      </Text>
    </View>
  );

  const renderPermissionItem = (permission: string) => (
    <View key={permission} style={tw`flex-row items-center mb-2`}>
      <View
        style={[
          tw`w-1.5 h-1.5 rounded-full mr-3`,
          {
            backgroundColor: colors.black,
          },
        ]}
      />
      <Text
        style={[
          tw`text-sm`,
          {
            color: colors.black,
            fontFamily: 'Satoshi Variable',
          },
        ]}
      >
        {permission}
      </Text>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Status Bar Space */}
      <View style={tw`h-12`} />

      {/* Header with Gradient */}
      <LinearGradient
        colors={[colors.purple, colors.complimentary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={tw`h-[259px] relative`}
      >
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`absolute top-16 left-6 z-10`}
        >
          <ChevronLeft size={24} color={colors.white} />
        </TouchableOpacity>

        {/* Profile Info */}
        <View style={tw`items-center pt-20`}>
          {/* Avatar */}
          <View
            style={[
              tw`w-[85px] h-[85px] rounded-full items-center justify-center mb-4`,
              {
                backgroundColor: colors.white,
              },
            ]}
          >
            <Text
              style={[
                tw`text-xl font-bold`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              {member.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </Text>
          </View>

          {/* Name */}
          <Text
            style={[
              tw`text-2xl font-bold text-white mb-4`,
              {
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            {member.name}
          </Text>

          {/* Role Badge */}
          <View
            style={[
              tw`px-3 py-1 rounded-full`,
              {
                backgroundColor: colors.white,
              },
            ]}
          >
            <View style={tw`flex-row items-center`}>
              {member.isOwner && (
                <Crown size={16} color={colors.red} style={tw`mr-1`} />
              )}
              <Text
                style={[
                  tw`text-xs`,
                  {
                    color: getRoleColor(member.role),
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {member.role}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView
        style={tw`flex-1`}
        contentContainerStyle={tw`px-6 py-6 pb-24`}
        showsVerticalScrollIndicator={false}
      >
        {/* Contact Information */}
        <View style={tw`mb-6`}>
          <Text
            style={[
              tw`text-base font-bold mb-4`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
                letterSpacing: -0.64,
              },
            ]}
          >
            Contact Information
          </Text>

          {renderContactItem(
            <Mail size={16} color={colors.black} />,
            'EMAIL',
            member.email
          )}

          {renderContactItem(
            <Phone size={16} color={colors.black} />,
            'PHONE',
            member.phone
          )}

          {renderContactItem(
            <Building size={16} color={colors.black} />,
            'JOINED',
            member.joinedDate
          )}
        </View>

        {/* Divider */}
        <View
          style={[
            tw`h-px mb-6`,
            {
              backgroundColor: colors.lightGrey,
            },
          ]}
        />

        {/* Skills & Projects */}
        <View style={tw`mb-6`}>
          <Text
            style={[
              tw`text-base font-bold mb-6`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
                letterSpacing: -0.64,
              },
            ]}
          >
            Skills & Projects
          </Text>

          {/* Skills */}
          <View style={tw`mb-6`}>
            <Text
              style={[
                tw`text-sm mb-4`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Skills
            </Text>
            <View style={tw`flex-row flex-wrap`}>
              {member.skills.map(renderSkillChip)}
            </View>
          </View>

          {/* Active Projects */}
          <View>
            <Text
              style={[
                tw`text-sm mb-4`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Active Projects
            </Text>
            <View style={tw`flex-row items-center`}>
              <Text
                style={[
                  tw`text-base font-bold mr-2`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {member.activeProjects}
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
                Projects Assigned
              </Text>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View
          style={[
            tw`h-px mb-6`,
            {
              backgroundColor: colors.lightGrey,
            },
          ]}
        />

        {/* Permissions */}
        <View style={tw`mb-6`}>
          <Text
            style={[
              tw`text-base font-bold mb-4`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
                letterSpacing: -0.64,
              },
            ]}
          >
            Permissions
          </Text>
          <View style={tw`flex-row flex-wrap`}>
            {member.permissions.map(renderPermissionItem)}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View
        style={[
          tw`absolute bottom-0 left-0 right-0 px-6 py-4`,
          {
            backgroundColor: colors.white,
            borderTopWidth: 1,
            borderTopColor: colors.lightGrey,
          },
        ]}
      >
        <View style={tw`flex-row gap-2`}>
          {/* Edit Profile Button */}
          <TouchableOpacity
            style={[
              tw`flex-1 py-4 rounded-full`,
              {
                backgroundColor: colors.lightGrey,
              },
            ]}
            onPress={() => console.log('Edit Profile pressed')}
          >
            <Text
              style={[
                tw`text-sm font-bold text-center`,
                {
                  color: colors.complimentary,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>

          {/* Update Role Button */}
          <TouchableOpacity
            style={[
              tw`flex-1 py-4 rounded-full`,
              {
                backgroundColor: colors.complimentary,
              },
            ]}
            onPress={() => console.log('Update Role pressed')}
          >
            <Text
              style={[
                tw`text-sm font-bold text-center text-white`,
                {
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Update Role
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
