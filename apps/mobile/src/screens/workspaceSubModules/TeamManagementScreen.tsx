import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import {
  ChevronLeft,
  Search,
  Filter,
  Mail,
  Phone,
  Crown,
  Plus,
} from 'lucide-react-native';
import { faker } from '@faker-js/faker';
import {
  SearchBar,
  FloatingButton,
  InviteTeamMemberModal,
  OverviewStat,
} from '../../components';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  white: '#FFFFFF',
  lightGrey: '#F5F5F7',
  red: '#FF383C',
  blue: '#1A73E8',
  purple: '#320C68',
  yellow: '#FBBC04',
  green: '#34C759',
};

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  joinedDate: string;
  avatar?: string;
  skills: string[];
  activeProjects: number;
  permissions: string[];
  isOwner?: boolean;
}

interface Role {
  id: string;
  name: string;
  color: string;
  permissions: string[];
  memberCount: number;
}

// Mock team members
const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Patrick Igwe',
    email: 'marcussews@thimblely.com',
    phone: '+2348945883745',
    role: 'Owner',
    joinedDate: 'July 23, 2025',
    skills: ['Leadership', 'Business Strategy', 'Team Management'],
    activeProjects: 4,
    permissions: [
      'View Reports',
      'Manage Orders',
      'Manage Members',
      'Manage Inventory',
      'Manage Workspace',
    ],
    isOwner: true,
  },
  {
    id: '2',
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: 'Designer',
    joinedDate: faker.date.past().toLocaleDateString(),
    skills: ['Design', 'Creative Direction', 'Branding', 'UI/UX'],
    activeProjects: faker.number.int({ min: 1, max: 5 }),
    permissions: ['Design', 'Review', 'Create Orders'],
  },
  {
    id: '3',
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: 'Manager',
    joinedDate: faker.date.past().toLocaleDateString(),
    skills: ['Project Management', 'Team Leadership', 'Operations'],
    activeProjects: faker.number.int({ min: 2, max: 6 }),
    permissions: ['Admin', 'Manage Team', 'Manage Orders'],
  },
  {
    id: '4',
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: 'Production',
    joinedDate: faker.date.past().toLocaleDateString(),
    skills: ['Manufacturing', 'Quality Control', 'Production Planning'],
    activeProjects: faker.number.int({ min: 1, max: 4 }),
    permissions: ['Production', 'Quality', 'Update Orders'],
  },
  {
    id: '5',
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: 'Assistant',
    joinedDate: faker.date.past().toLocaleDateString(),
    skills: ['Administrative Support', 'Customer Service', 'Data Entry'],
    activeProjects: faker.number.int({ min: 1, max: 3 }),
    permissions: ['Assist', 'View Orders', 'Update Status'],
  },
];

const roles: Role[] = [
  {
    id: 'owner',
    name: 'Owner',
    color: colors.red,
    permissions: ['Admin', 'Manage Team'],
    memberCount: 1,
  },
  {
    id: 'manager',
    name: 'Manager',
    color: colors.blue,
    permissions: ['Admin', 'Manage Team', 'Manage Orders'],
    memberCount: 1,
  },
  {
    id: 'designer',
    name: 'Designer',
    color: colors.purple,
    permissions: ['Design', 'Review', 'Create Orders'],
    memberCount: 1,
  },
  {
    id: 'production',
    name: 'Production',
    color: colors.yellow,
    permissions: ['Production', 'Quality', 'Update Orders'],
    memberCount: 1,
  },
  {
    id: 'assistant',
    name: 'Assistant',
    color: colors.green,
    permissions: ['Assist', 'View Orders', 'Update Status'],
    memberCount: 1,
  },
];

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'owner', label: 'Owner' },
  { id: 'designer', label: 'Designer' },
  { id: 'manager', label: 'Manager' },
  { id: 'production', label: 'Production' },
  { id: 'assistant', label: 'Assistant' },
];

export default function TeamManagementScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);

  const handleTabPress = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  const filteredMembers = useMemo(() => {
    let filtered = teamMembers;

    // Filter by tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(
        (member) => member.role.toLowerCase() === activeTab
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (member) =>
          member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [activeTab, searchQuery]);

  const getRoleColor = (role: string) => {
    const roleObj = roles.find(
      (r) => r.name.toLowerCase() === role.toLowerCase()
    );
    return roleObj?.color || colors.greyText;
  };

  const handleMemberPress = useCallback(
    (member: TeamMember) => {
      navigation.navigate('TeamProfile', { member });
    },
    [navigation]
  );

  const handleInviteTeamMember = useCallback((memberData: any) => {
    console.log('Inviting team member:', memberData);
    // TODO: Implement actual invitation logic
    // This would typically send an API request to invite the member
  }, []);

  const handleOpenInviteModal = useCallback(() => {
    setShowInviteModal(true);
  }, []);

  const handleCloseInviteModal = useCallback(() => {
    setShowInviteModal(false);
  }, []);

  const renderMemberCard = useCallback(
    (member: TeamMember) => (
      <TouchableOpacity
        key={member.id}
        onPress={() => handleMemberPress(member)}
        style={[
          tw`flex-row items-start p-4 mb-4 bg-white border-b border-gray-200`,
        ]}
      >
        {/* Avatar */}
        <View
          style={[
            tw`w-[74px] h-[74px] rounded-full items-center justify-center mr-4`,
            {
              backgroundColor: colors.lightGrey,
            },
          ]}
        >
          <Text
            style={[
              tw`text-lg font-bold`,
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

        {/* Member Info */}
        <View style={tw`flex-1`}>
          {/* Name and Role */}
          <View style={tw`flex-row items-center mb-3`}>
            <Text
              style={[
                tw`text-sm font-medium mr-2`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              {member.name}
            </Text>
            {member.isOwner && (
              <View style={tw`flex-row items-center mr-2`}>
                <Crown size={16} color={colors.red} />
              </View>
            )}
            <View
              style={[
                tw`px-3 py-1 rounded-full`,
                {
                  backgroundColor: `${getRoleColor(member.role)}20`,
                },
              ]}
            >
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

          {/* Contact Info */}
          <View style={tw`gap-2 mb-3`}>
            <View style={tw`flex-row items-center`}>
              <Mail size={16} color={colors.greyText} />
              <Text
                style={[
                  tw`text-xs ml-2`,
                  {
                    color: colors.greyText,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {member.email}
              </Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <Phone size={16} color={colors.greyText} />
              <Text
                style={[
                  tw`text-xs ml-2`,
                  {
                    color: colors.greyText,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {member.phone}
              </Text>
            </View>
          </View>

          {/* Skills */}
          <View style={tw`flex-row flex-wrap gap-2`}>
            {member.skills.slice(0, 2).map((skill, index) => (
              <View
                key={index}
                style={[
                  tw`px-4 py-2 rounded-full`,
                  {
                    backgroundColor: colors.lightGrey,
                  },
                ]}
              >
                <Text
                  style={[
                    tw`text-xs`,
                    {
                      color: colors.greyText,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  {skill}
                </Text>
              </View>
            ))}
            {member.skills.length > 2 && (
              <View
                style={[
                  tw`px-4 py-2 rounded-full`,
                  {
                    backgroundColor: colors.lightGrey,
                  },
                ]}
              >
                <Text
                  style={[
                    tw`text-xs`,
                    {
                      color: colors.greyText,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  +{member.skills.length - 3}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    ),
    [handleMemberPress]
  );

  const renderRoleCard = useCallback(
    (role: Role) => (
      <View
        key={role.id}
        style={[
          tw`p-3 rounded mb-1`,
          {
            backgroundColor: colors.white,
          },
        ]}
      >
        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`flex-1`}>
            <Text
              style={[
                tw`text-sm font-bold mb-2`,
                {
                  color: role.color,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              {role.name}
            </Text>
            <View style={tw`flex-row flex-wrap gap-3`}>
              {role.permissions.map((permission, index) => (
                <Text
                  key={index}
                  style={[
                    tw`text-xs`,
                    {
                      color: colors.greyText,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  {permission}
                </Text>
              ))}
            </View>
          </View>
          <View style={tw`items-end`}>
            <Text
              style={[
                tw`text-sm font-bold`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              {role.memberCount}
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
              Members
            </Text>
          </View>
        </View>
      </View>
    ),
    []
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
            tw`text-base font-bold ml-5`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
              letterSpacing: -0.64,
            },
          ]}
        >
          Team Management
        </Text>
      </View>

      {/* Team Overview Card */}
      <View
        style={[
          tw`mx-6 p-4 rounded-lg mb-6`,
          {
            backgroundColor: colors.white,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 4,
          },
        ]}
      >
        <Text
          style={[
            tw`text-sm font-bold mb-4`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          Team Overview
        </Text>
        <View style={tw`flex-row justify-between`}>
          <OverviewStat value={teamMembers.length} label="Total Members" />
          <OverviewStat value={0} label="Active Today" />
          <OverviewStat value={0} label="Projects" />
          <OverviewStat value={roles.length} label="Roles" />
        </View>
      </View>

      {/* Search and Filter */}
      <View style={tw`px-6 mb-6`}>
        <SearchBar
          placeholder="Search Members..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          containerStyle={tw`px-0 mb-0`}
          showFilter={true}
          onFilterPress={() => console.log('Filter pressed')}
        />
      </View>

      {/* Tab Navigation */}
      <View style={tw`px-6 mb-6`}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={tw`flex-row gap-3`}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                onPress={() => handleTabPress(tab.id)}
                style={[
                  tw`px-4 py-2 rounded-full`,
                  {
                    backgroundColor:
                      activeTab === tab.id
                        ? colors.complimentary
                        : colors.lightGrey,
                  },
                ]}
              >
                <Text
                  style={[
                    tw`text-xs`,
                    {
                      color:
                        activeTab === tab.id ? colors.white : colors.greyText,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`px-6 pb-24`}
        style={tw`flex-1`}
      >
        {activeTab === 'all' ? (
          <>
            {/* Team Members */}
            <View style={tw`mb-6`}>
              {filteredMembers.map(renderMemberCard)}
            </View>

            {/* Roles & Permissions */}
            <View>
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
                Roles & Permissions
              </Text>
              {roles.map(renderRoleCard)}
            </View>
          </>
        ) : (
          /* Role-specific breakdown */
          <View>
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
              {tabs.find((t) => t.id === activeTab)?.label} Members
            </Text>
            {filteredMembers.map(renderMemberCard)}
          </View>
        )}
      </ScrollView>

      {/* Floating Add Button */}
      <FloatingButton
        onPress={handleOpenInviteModal}
        icon={Plus}
        iconSize={24}
        backgroundColor={colors.complimentary}
        size={56}
        bottom={111}
        right={24}
      />

      {/* Invite Team Member Modal */}
      <InviteTeamMemberModal
        visible={showInviteModal}
        onClose={handleCloseInviteModal}
        onInvite={handleInviteTeamMember}
      />
    </View>
  );
}
