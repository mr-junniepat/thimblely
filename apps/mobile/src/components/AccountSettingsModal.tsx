import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import {
  Lock,
  Shield,
  Bell,
  User,
  HelpCircle,
  LogOut,
} from 'lucide-react-native';
import BaseModal from './BaseModal';
import { useAuthContext } from '../contexts/AuthContext';
import Toast from './Toast';
import { useToast } from '../hooks';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  red: '#DC1E38',
};

interface AccountSettingsModalProps {
  visible: boolean;
  onClose: () => void;
  navigation?: any;
}

const menuItems = [
  {
    id: '1',
    title: 'Change Password',
    icon: Lock,
  },
  {
    id: '2',
    title: 'Workspace Security',
    icon: Shield,
  },
  {
    id: '3',
    title: 'Notification Settings',
    icon: Bell,
  },
  {
    id: '4',
    title: 'Profile Privacy',
    icon: User,
  },
  {
    id: '5',
    title: 'Help & Support',
    icon: HelpCircle,
  },
];

export default function AccountSettingsModal({
  visible,
  onClose,
  navigation,
}: AccountSettingsModalProps) {
  const { signOut } = useAuthContext();
  const { toast, showToast, hideToast } = useToast();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            const result = await signOut();
            if (result.success) {
              onClose();
              showToast('Logged out successfully', 'success');
              // Navigate to login screen
              if (navigation) {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Landing' }],
                });
              }
            } else {
              showToast('Logout failed. Please try again.', 'error');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      title="Account Settings"
      height={507}
    >
      {/* Menu Items */}
      <View style={tw`gap-8`}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={tw`flex-row items-center gap-3`}
            onPress={() => {
              if (item.id === '1' && navigation) {
                // Change Password
                onClose();
                navigation.navigate('ChangePassword');
              } else if (item.id === '2' && navigation) {
                // Workspace Security
                onClose();
                navigation.navigate('WorkspaceSecurity');
              } else if (item.id === '3' && navigation) {
                // Notification Settings
                onClose();
                navigation.navigate('NotificationSettings');
              } else if (item.id === '4' && navigation) {
                // Profile Privacy
                onClose();
                navigation.navigate('ProfilePrivacy');
              } else if (item.id === '5' && navigation) {
                // Help & Support
                onClose();
                navigation.navigate('HelpSupport');
              }
            }}
          >
            <View
              style={[
                tw`w-10 h-10 rounded items-center justify-center`,
                {
                  backgroundColor: 'rgba(163,5,82,0.09)',
                },
              ]}
            >
              <item.icon size={20} color={colors.complimentary} />
            </View>
            <Text
              style={[
                tw`text-sm font-medium`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <View style={tw`mt-8 mb-6`}>
        <TouchableOpacity
          style={[
            tw`flex-row items-center justify-center gap-2 py-3 rounded-full`,
            {
              backgroundColor: '#F5F5F7',
            },
          ]}
          onPress={handleLogout}
        >
          <Text
            style={[
              tw`text-sm font-normal`,
              {
                color: colors.red,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            Logout
          </Text>
          <LogOut size={20} color={colors.red} />
        </TouchableOpacity>
      </View>

      {/* Toast */}
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        position={toast.position}
        onHide={hideToast}
      />
    </BaseModal>
  );
}
