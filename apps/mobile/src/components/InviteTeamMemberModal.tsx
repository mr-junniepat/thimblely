import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';
import { X, ChevronDown } from 'lucide-react-native';
import { Input } from './index';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  white: '#FFFFFF',
  lightGrey: '#F5F5F7',
  purple: '#682476',
};

interface InviteTeamMemberModalProps {
  visible: boolean;
  onClose: () => void;
  onInvite: (memberData: any) => void;
}

const roles = [
  { id: 'owner', name: 'Owner', color: '#FF383C' },
  { id: 'manager', name: 'Manager', color: '#1A73E8' },
  { id: 'designer', name: 'Designer', color: '#320C68' },
  { id: 'production', name: 'Production', color: '#FBBC04' },
  { id: 'assistant', name: 'Assistant', color: '#34C759' },
];

const permissions = [
  'View Reports',
  'Manage Orders',
  'Manage Members',
  'Manage Inventory',
  'Manage Workspace',
  'Design',
  'Review',
  'Create Orders',
  'Production',
  'Quality',
  'Update Orders',
  'Assist',
  'View Orders',
  'Update Status',
];

export default function InviteTeamMemberModal({
  visible,
  onClose,
  onInvite,
}: InviteTeamMemberModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    permissions: [] as string[],
    personalMessage: '',
  });

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showPermissionsDropdown, setShowPermissionsDropdown] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRoleSelect = (role: string) => {
    setFormData((prev) => ({ ...prev, role }));
    setShowRoleDropdown(false);
  };

  const handlePermissionToggle = (permission: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleInvite = () => {
    if (formData.fullName && formData.email && formData.role) {
      onInvite(formData);
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        role: '',
        permissions: [],
        personalMessage: '',
      });
      onClose();
    }
  };

  const selectedRole = roles.find((r) => r.id === formData.role);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Overlay */}
      <View
        style={[
          tw`flex-1 justify-end`,
          {
            backgroundColor: 'rgba(0,0,0,0.3)',
          },
        ]}
      >
        {/* Modal Content */}
        <View
          style={[
            tw`bg-white rounded-t-lg`,
            {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              maxHeight: '90%',
            },
          ]}
        >
          {/* Header */}
          <View style={tw`flex-row items-center justify-between px-6 py-6`}>
            <View style={tw`flex-1`} />
            <Text
              style={[
                tw`text-base font-normal`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Invite Team Member
            </Text>
            <View style={tw`flex-1 items-end`}>
              <TouchableOpacity onPress={onClose}>
                <X size={24} color={colors.black} />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`px-6 pb-6 flex-1`}
          >
            {/* Member Information */}
            <View style={tw`mb-6`}>
              <Text
                style={[
                  tw`text-base font-bold mb-4`,
                  {
                    color: colors.purple,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Member Information
              </Text>

              {/* Full Name */}
              <View style={tw`mb-4`}>
                <Text
                  style={[
                    tw`text-sm font-bold mb-2`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Full Name
                </Text>
                <Input
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChangeText={(value) => handleInputChange('fullName', value)}
                  containerStyle={tw`px-0 mb-0`}
                />
              </View>

              {/* Email */}
              <View>
                <Text
                  style={[
                    tw`text-sm font-bold mb-2`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Email
                </Text>
                <Input
                  placeholder="Enter email address"
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  keyboardType="email-address"
                  containerStyle={tw`px-0 mb-0`}
                />
              </View>
            </View>

            {/* Role & Permission */}
            <View style={tw`mb-6`}>
              <Text
                style={[
                  tw`text-base font-bold mb-4`,
                  {
                    color: colors.purple,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Role & Permission
              </Text>

              {/* Role */}
              <View style={tw`mb-4`}>
                <Text
                  style={[
                    tw`text-sm font-bold mb-2`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Role
                </Text>
                <TouchableOpacity
                  onPress={() => setShowRoleDropdown(!showRoleDropdown)}
                  style={[
                    tw`flex-row items-center justify-between px-4 py-3 rounded-lg border`,
                    {
                      borderColor: 'rgba(0,0,0,0.1)',
                    },
                  ]}
                >
                  <Text
                    style={[
                      tw`text-sm`,
                      {
                        color: formData.role ? colors.black : colors.greyText,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    {formData.role ? selectedRole?.name : 'Choose Role'}
                  </Text>
                  <ChevronDown size={16} color={colors.greyText} />
                </TouchableOpacity>

                {/* Role Dropdown */}
                {showRoleDropdown && (
                  <View
                    style={[
                      tw`mt-2 rounded-lg border`,
                      {
                        backgroundColor: colors.white,
                        borderColor: 'rgba(0,0,0,0.1)',
                      },
                    ]}
                  >
                    {roles.map((role) => (
                      <TouchableOpacity
                        key={role.id}
                        onPress={() => handleRoleSelect(role.id)}
                        style={tw`px-4 py-3 border-b border-gray-100`}
                      >
                        <Text
                          style={[
                            tw`text-sm`,
                            {
                              color: colors.black,
                              fontFamily: 'Satoshi Variable',
                            },
                          ]}
                        >
                          {role.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Permissions */}
              <View>
                <Text
                  style={[
                    tw`text-sm font-bold mb-2`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Permissions
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setShowPermissionsDropdown(!showPermissionsDropdown)
                  }
                  style={[
                    tw`flex-row items-center justify-between px-4 py-3 rounded-lg border`,
                    {
                      borderColor: 'rgba(0,0,0,0.1)',
                    },
                  ]}
                >
                  <Text
                    style={[
                      tw`text-sm`,
                      {
                        color:
                          formData.permissions.length > 0
                            ? colors.black
                            : colors.greyText,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    {formData.permissions.length > 0
                      ? `${formData.permissions.length} permissions selected`
                      : 'Select Permissions'}
                  </Text>
                  <ChevronDown size={16} color={colors.greyText} />
                </TouchableOpacity>

                {/* Permissions Dropdown */}
                {showPermissionsDropdown && (
                  <View
                    style={[
                      tw`mt-2 rounded-lg border max-h-40`,
                      {
                        backgroundColor: colors.white,
                        borderColor: 'rgba(0,0,0,0.1)',
                      },
                    ]}
                  >
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {permissions.map((permission) => (
                        <TouchableOpacity
                          key={permission}
                          onPress={() => handlePermissionToggle(permission)}
                          style={tw`flex-row items-center px-4 py-3 border-b border-gray-100`}
                        >
                          <View
                            style={[
                              tw`w-4 h-4 rounded border mr-3 items-center justify-center`,
                              {
                                borderColor: colors.greyText,
                                backgroundColor: formData.permissions.includes(
                                  permission
                                )
                                  ? colors.complimentary
                                  : 'transparent',
                              },
                            ]}
                          >
                            {formData.permissions.includes(permission) && (
                              <Text style={tw`text-white text-xs`}>✓</Text>
                            )}
                          </View>
                          <Text
                            style={[
                              tw`text-sm flex-1`,
                              {
                                color: colors.black,
                                fontFamily: 'Satoshi Variable',
                              },
                            ]}
                          >
                            {permission}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>
            </View>

            {/* Invitation Message */}
            <View style={tw`mb-6`}>
              <Text
                style={[
                  tw`text-base font-bold mb-4`,
                  {
                    color: colors.purple,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Invitation Message
              </Text>
              <View>
                <Text
                  style={[
                    tw`text-sm font-bold mb-2`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Personal Message
                </Text>
                <Input
                  placeholder="Enter personal message (optional)"
                  value={formData.personalMessage}
                  onChangeText={(value) =>
                    handleInputChange('personalMessage', value)
                  }
                  multiline
                  numberOfLines={3}
                  containerStyle={tw`px-0 mb-0`}
                  style={tw`min-h-[71px]`}
                />
              </View>
            </View>

            {/* Invite Button */}
            <TouchableOpacity
              onPress={handleInvite}
              style={[
                tw`py-4 rounded-full`,
                {
                  backgroundColor: colors.complimentary,
                },
              ]}
            >
              <Text
                style={[
                  tw`text-sm text-center text-white`,
                  {
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Invite
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
