import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import {
  ChevronLeft,
  Clock,
  FileText,
  Ruler,
  ChevronRight,
} from 'lucide-react-native';
import { SearchBar } from '../../components';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  backgroundWhite: '#FAFAFA',
  red: '#DC1E38',
  purple: '#6B2374',
};

interface NotificationItem {
  id: string;
  type: 'activity' | 'invoice' | 'measurement';
  title: string;
  description: string;
  time: string;
  hasBadge?: boolean;
  badgeText?: string;
  metadata?: {
    templateId?: string;
  };
}

const notifications: NotificationItem[] = [
  {
    id: '1',
    type: 'activity',
    title: 'Activity',
    description: 'Emma Stone liked your post, Patrick Igwe follow...',
    time: '',
    hasBadge: true,
    badgeText: '99+',
  },
  {
    id: '2',
    type: 'invoice',
    title: 'Patrick Igwe sent you an Invoice',
    description: 'Just now',
    time: 'Just now',
  },
  {
    id: '3',
    type: 'measurement',
    title: 'Gerrard Agwu sent a measurement template',
    description: '2 weeks ago',
    time: '2 weeks ago',
    metadata: {
      templateId: 'template_001',
    },
  },
  {
    id: '4',
    type: 'measurement',
    title: 'Gerrard Agwu sent a measurement template',
    description: '2 months ago',
    time: '2 months ago',
    metadata: {
      templateId: 'template_002',
    },
  },
];

export default function NotificationSettingsScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');

  const getIconForType = (type: string) => {
    switch (type) {
      case 'activity':
        return Clock;
      case 'invoice':
        return FileText;
      case 'measurement':
        return Ruler;
      default:
        return Clock;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'activity':
        return colors.complimentary;
      case 'invoice':
        return colors.purple;
      case 'measurement':
        return colors.purple;
      default:
        return colors.complimentary;
    }
  };

  const getIconBackground = (type: string) => {
    switch (type) {
      case 'activity':
        return 'rgba(163,5,82,0.09)';
      case 'invoice':
        return 'rgba(107,35,116,0.08)';
      case 'measurement':
        return 'rgba(107,35,116,0.08)';
      default:
        return 'rgba(163,5,82,0.09)';
    }
  };

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
          NOTIFICATIONS
        </Text>
      </View>

      {/* Search Bar */}
      <SearchBar
        placeholder="Search notifications"
        value={searchQuery}
        onChangeText={setSearchQuery}
        containerStyle={{ marginTop: 16 }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={tw`px-6`}>
          {notifications.map((notification, index) => {
            const IconComponent = getIconForType(notification.type);
            const iconColor = getIconColor(notification.type);
            const iconBackground = getIconBackground(notification.type);

            return (
              <TouchableOpacity
                key={notification.id}
                style={[
                  tw`flex-row items-center py-6`,
                  index < notifications.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(0,0,0,0.05)',
                  },
                ]}
                onPress={() => {
                  if (notification.type === 'activity') {
                    navigation.navigate('Activity');
                  } else if (
                    notification.type === 'measurement' &&
                    notification.metadata?.templateId
                  ) {
                    navigation.navigate('MeasurementForm', {
                      templateId: notification.metadata.templateId,
                    });
                  } else {
                    console.log('Navigate to:', notification.type);
                  }
                }}
              >
                {/* Icon */}
                <View
                  style={[
                    tw`w-10 h-10 rounded-full items-center justify-center mr-3`,
                    {
                      backgroundColor: iconBackground,
                    },
                  ]}
                >
                  <IconComponent size={20} color={iconColor} />
                </View>

                {/* Content */}
                <View style={tw`flex-1`}>
                  <Text
                    style={[
                      tw`text-sm font-bold mb-1`,
                      {
                        color: colors.black,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    {notification.title}
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
                    {notification.description}
                  </Text>
                </View>

                {/* Badge or Arrow */}
                {notification.hasBadge ? (
                  <View
                    style={[
                      tw`w-8 h-8 rounded-full items-center justify-center`,
                      {
                        backgroundColor: colors.red,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        tw`text-xs font-bold`,
                        {
                          color: 'white',
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      {notification.badgeText}
                    </Text>
                  </View>
                ) : (
                  <ChevronRight size={20} color={colors.black} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
