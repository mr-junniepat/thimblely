import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useLazyQuery } from '@apollo/client';
import {
  ChevronLeft,
  Clock,
  FileText,
  Ruler,
  ChevronRight,
  BellOff,
} from 'lucide-react-native';
import { SearchBar } from '../../components';
import { useAuthContext } from '../../contexts/AuthContext';
import { GET_NOTIFICATIONS_QUERY } from '@thimblely/shared/lib/graphql/schemas/auth/notifications';

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

// Function to create welcome notification (called after signup)
export const createWelcomeNotification = async (
  userId: string,
  supabase: any
) => {
  const welcomeNotification = {
    user_id: userId,
    workspace_id: null,
    notification_type: 'system',
    data: {
      title: 'Welcome to Thimblely!',
      description:
        'Get started by exploring our features and completing your profile.',
      type: 'welcome',
      action_url: null,
    },
    is_read: false,
  };

  await supabase.from('notifications').insert([welcomeNotification]);
};

// Function to create support encouragement notification
export const createSupportNotification = async (
  userId: string,
  supabase: any
) => {
  // Create notification 3 days after signup
  const supportNotification = {
    user_id: userId,
    workspace_id: null,
    notification_type: 'system',
    data: {
      title: 'Need Help?',
      description:
        'Our support team is here to help you succeed. Contact us anytime!',
      type: 'support',
      action_url: 'HelpSupport',
    },
    is_read: false,
  };

  await supabase.from('notifications').insert([supportNotification]);
};

export default function NotificationSettingsScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const { user } = useAuthContext();

  // Fetch notifications from database
  const [fetchNotifications] = useLazyQuery(GET_NOTIFICATIONS_QUERY, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      if (data?.notificationsCollection?.edges) {
        const fetchedNotifications = data.notificationsCollection.edges.map(
          (edge: any) => {
            const node = edge.node;
            const data = node.data || {};

            return {
              id: node.id,
              type: data.type || 'activity',
              title: data.title || 'Notification',
              description: data.description || '',
              time: formatTimeAgo(node.created_at),
              is_read: node.is_read,
              hasBadge: !node.is_read,
              badgeText: !node.is_read ? '1' : undefined,
              metadata: data.metadata || {},
            };
          }
        );
        setNotifications(fetchedNotifications);
      }
    },
    onError: (error) => {
      console.error('Error fetching notifications:', error);
    },
  });

  useEffect(() => {
    if (user) {
      fetchNotifications({
        variables: { userId: user.id },
      });
    }
  }, [user]);

  // Format time ago helper
  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
    return `${Math.floor(diffDays / 365)}y ago`;
  };

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
      <View style={tw`px-6`}>
        <SearchBar
          placeholder="Search notifications"
          value={searchQuery}
          onChangeText={setSearchQuery}
          containerStyle={{ marginTop: 16 }}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={tw`px-6`}>
          {notifications.length === 0 ? (
            /* Empty State */
            <View style={tw`items-center justify-center py-20`}>
              <View
                style={[
                  tw`w-20 h-20 rounded-full items-center justify-center mb-4`,
                  {
                    backgroundColor: 'rgba(163,5,82,0.09)',
                  },
                ]}
              >
                <BellOff size={40} color={colors.complimentary} />
              </View>
              <Text
                style={[
                  tw`text-base font-bold mb-2`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                No Notifications
              </Text>
              <Text
                style={[
                  tw`text-sm text-center`,
                  {
                    color: colors.greyText,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                You're all caught up!{'\n'}
                New notifications will appear here.
              </Text>
            </View>
          ) : (
            notifications.map((notification, index) => {
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
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}
