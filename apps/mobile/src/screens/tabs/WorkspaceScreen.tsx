import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { ModuleCard } from '../../components';
import {
  Calendar,
  Settings,
  Package,
  ShoppingCart,
  DollarSign,
  Headphones,
  Mic,
  BarChart,
  CheckCircle,
  Briefcase,
  Users2,
  Zap,
} from 'lucide-react-native';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  primary: '#155DFC',
  complimentaryDark: '#8B0438',
  primaryLight: '#4A90E2',
  black: '#111113',
  greyText: '#68666F',
  green: '#34C759',
  blue: '#1A73E8',
  red: '#CF1B2B',
  darkGreen: '#354D0C',
  darkPurple: '#320C68',
  purple: '#7E3BED',
  purpleLight: '#7344C1',
};

// Workspace modules data
const workspaceModules = [
  {
    id: '1',
    title: 'Calendar',
    description: 'Schedule meetings, events and deadlines',
    icon: Calendar,
    iconBg: 'rgba(207,27,43,0.09)',
    iconColor: '#CF1B2B',
    status: '3 events today',
    statusColor: '#CF1B2B',
  },
  {
    id: '2',
    title: 'CRM',
    description: 'Manage client and customer relationship',
    icon: Headphones,
    iconBg: 'rgba(26,115,232,0.09)',
    iconColor: '#1A73E8',
    status: '2 active clients',
    statusColor: '#1A73E8',
  },
  {
    id: '3',
    title: 'Finance',
    description: 'Track expenses, revenue and financial reports',
    icon: DollarSign,
    iconBg: 'rgba(52,199,89,0.09)',
    iconColor: '#34C759',
    status: '$0.0k this month',
    statusColor: '#34C759',
  },
  {
    id: '4',
    title: 'Inventory',
    description: 'Manage stock levels and product catalog',
    icon: Package,
    iconBg: 'rgba(53,77,12,0.09)',
    iconColor: '#354D0C',
    status: '256 items in stock',
    statusColor: '#354D0C',
  },
  {
    id: '5',
    title: 'Orders',
    description: 'Track and manage customers orders',
    icon: ShoppingCart,
    iconBg: 'rgba(50,12,104,0.09)',
    iconColor: '#320C68',
    status: '0 pending orders',
    statusColor: '#320C68',
  },
  {
    id: '6',
    title: 'Team Management',
    description: 'Manage team members & roles',
    icon: Users2,
    iconBg: 'rgba(126,59,237,0.09)',
    iconColor: '#7E3BED',
    status: '2 team members',
    statusColor: '#7E3BED',
  },
];

// AI Features data
const aiFeatures = [
  {
    id: '1',
    title: 'Smart Order Processing',
    description: 'Automatically categorize and process orders',
    icon: Zap,
    enabled: true,
  },
  {
    id: '2',
    title: 'Voice Commands',
    description: 'Control your workspace with your voice',
    icon: Mic,
    enabled: false,
  },
  {
    id: '3',
    title: 'Predictive Analysis',
    description: 'Forecast trends and sales patterns',
    icon: BarChart,
    enabled: true,
  },
  {
    id: '4',
    title: 'Auto Invoice Generation',
    description: 'Generate professional invoices automatically',
    icon: CheckCircle,
    enabled: true,
  },
];

// Communication data
const communicationItems = [
  {
    id: '1',
    title: 'WhatsApp Business',
    description: 'Connect to receive orders via WhatsApp',
    image: 'https://via.placeholder.com/50x50/25D366/FFFFFF?text=WA',
    action: 'Setup',
  },
  {
    id: '2',
    title: 'Telegram Bot',
    description: 'Setup bot for automated customer service',
    image: 'https://via.placeholder.com/50x50/0088CC/FFFFFF?text=TG',
    action: 'Setup',
  },
];

// Recent activity data
const recentActivity = [
  {
    id: '1',
    title: 'New Client Added',
    description: 'Emma Thompson joined',
    icon: Users2,
    time: '42 days ago',
    timeColor: '#34C759',
  },
  {
    id: '2',
    title: 'Telegram Bot',
    description: 'Michael John joined',
    icon: Users2,
    time: '45 days ago',
    timeColor: '#34C759',
  },
];

export default function WorkspaceScreen() {
  const navigation = useNavigation();
  const [aiFeatureStates, setAiFeatureStates] = useState(
    aiFeatures.reduce((acc, feature) => {
      acc[feature.id] = feature.enabled;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggleAiFeature = (featureId: string) => {
    setAiFeatureStates((prev) => ({
      ...prev,
      [featureId]: !prev[featureId],
    }));
  };

  const handleModulePress = (moduleId: string) => {
    switch (moduleId) {
      case '1': // Calendar
        navigation.navigate('Calendar' as never);
        break;
      default:
        // Handle other modules as needed
        break;
    }
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Status Bar Space */}
      <View style={tw`h-12`} />

      {/* Header */}
      <View style={tw`px-6 py-4 flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center gap-2`}>
          <Text
            style={[
              tw`text-4xl font-normal`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
                letterSpacing: -1.6,
              },
            ]}
          >
            Workspace
          </Text>
          <View
            style={[
              tw`px-3 py-1 rounded-full`,
              {
                backgroundColor: 'rgba(126,59,237,0.1)',
              },
            ]}
          >
            <Text
              style={[
                tw`text-xs font-normal`,
                {
                  color: colors.purple,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Owner
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Settings size={24} color={colors.greyText} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Welcome Back Section */}
        <View
          style={[
            tw`mx-6 mb-8 p-4 rounded-lg`,
            {
              backgroundColor: '#F5F5F7',
            },
          ]}
        >
          <Text
            style={[
              tw`text-sm font-bold mb-3`,
              {
                color: colors.complimentary,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            Welcome Back Patrick 👋
          </Text>
          <Text
            style={[
              tw`text-xs font-normal mb-3`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            Here's what's happening in your workspace today
          </Text>
          <View style={tw`flex-row items-center gap-2`}>
            <View
              style={[
                tw`w-2 h-2 rounded-full`,
                {
                  backgroundColor: colors.complimentary,
                },
              ]}
            />
            <Text
              style={[
                tw`text-xs font-normal`,
                {
                  color: colors.greyText,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Owner
            </Text>
            <Text
              style={[
                tw`text-xs font-normal ml-4`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              7 modules available
            </Text>
          </View>
        </View>

        {/* Workspace Overview */}
        <View style={tw`mx-6 mb-8`}>
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
            Workspace Overview
          </Text>
          <View style={tw`flex-row gap-3`}>
            <View
              style={[
                tw`flex-1 bg-white p-4 rounded-lg flex-row items-center gap-4`,
                {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 10,
                  elevation: 4,
                },
              ]}
            >
              <Briefcase size={24} color={colors.greyText} />
              <View style={tw`flex-1`}>
                <Text
                  style={[
                    tw`text-xs font-normal mb-1`,
                    {
                      color: colors.greyText,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Active Projects
                </Text>
                <View style={tw`flex-row items-end gap-1`}>
                  <Text
                    style={[
                      tw`text-base font-bold`,
                      {
                        color: colors.black,
                        fontFamily: 'Satoshi Variable',
                        letterSpacing: -0.64,
                      },
                    ]}
                  >
                    0
                  </Text>
                  <Text
                    style={[
                      tw`text-xs font-normal`,
                      {
                        color: colors.blue,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    +0%
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={[
                tw`flex-1 bg-white p-4 rounded-lg flex-row items-center gap-4`,
                {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 10,
                  elevation: 4,
                },
              ]}
            >
              <Users2 size={24} color={colors.greyText} />
              <View style={tw`flex-1`}>
                <Text
                  style={[
                    tw`text-xs font-normal mb-1`,
                    {
                      color: colors.greyText,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Team Members
                </Text>
                <View style={tw`flex-row items-end gap-1`}>
                  <Text
                    style={[
                      tw`text-base font-bold`,
                      {
                        color: colors.black,
                        fontFamily: 'Satoshi Variable',
                        letterSpacing: -0.64,
                      },
                    ]}
                  >
                    0
                  </Text>
                  <Text
                    style={[
                      tw`text-xs font-normal`,
                      {
                        color: colors.blue,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    +0
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Workspace Modules */}
        <View style={tw`mx-6 mb-8`}>
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
            Workspace Modules (7)
          </Text>
          <View style={tw`gap-6`}>
            {/* First row */}
            <View style={tw`flex-row gap-3`}>
              {workspaceModules.slice(0, 2).map((module) => (
                <ModuleCard
                  key={module.id}
                  title={module.title}
                  description={module.description}
                  icon={module.icon}
                  iconBg={module.iconBg}
                  iconColor={module.iconColor}
                  status={module.status}
                  statusColor={module.statusColor}
                  onPress={() => handleModulePress(module.id)}
                />
              ))}
            </View>
            {/* Second row */}
            <View style={tw`flex-row gap-3`}>
              {workspaceModules.slice(2, 4).map((module) => (
                <ModuleCard
                  key={module.id}
                  title={module.title}
                  description={module.description}
                  icon={module.icon}
                  iconBg={module.iconBg}
                  iconColor={module.iconColor}
                  status={module.status}
                  statusColor={module.statusColor}
                  onPress={() => handleModulePress(module.id)}
                />
              ))}
            </View>
            {/* Third row */}
            <View style={tw`flex-row gap-3`}>
              {workspaceModules.slice(4, 6).map((module) => (
                <ModuleCard
                  key={module.id}
                  title={module.title}
                  description={module.description}
                  icon={module.icon}
                  iconBg={module.iconBg}
                  iconColor={module.iconColor}
                  status={module.status}
                  statusColor={module.statusColor}
                  onPress={() => handleModulePress(module.id)}
                />
              ))}
            </View>
          </View>
        </View>

        {/* AI-Powered Features */}
        <View style={tw`mx-6 mb-8`}>
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
            AI-Powered Features
          </Text>
          <View style={tw`gap-6`}>
            {aiFeatures.map((feature, index) => (
              <View
                key={feature.id}
                style={[
                  tw`flex-row items-center justify-between pb-6`,
                  index < aiFeatures.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(0,0,0,0.05)',
                  },
                ]}
              >
                <View style={tw`flex-row items-center gap-4 flex-1`}>
                  <View
                    style={[
                      tw`w-12 h-12 rounded-full items-center justify-center`,
                      {
                        backgroundColor: '#F5F5F7',
                      },
                    ]}
                  >
                    <feature.icon size={24} color={colors.greyText} />
                  </View>
                  <View style={tw`flex-1`}>
                    <Text
                      style={[
                        tw`text-sm font-normal mb-1`,
                        {
                          color: colors.black,
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      {feature.title}
                    </Text>
                    <Text
                      style={[
                        tw`text-xs font-normal`,
                        {
                          color: colors.greyText,
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      {feature.description}
                    </Text>
                  </View>
                </View>
                <Switch
                  value={aiFeatureStates[feature.id]}
                  onValueChange={() => toggleAiFeature(feature.id)}
                  trackColor={{
                    false: '#D9D9D9',
                    true: colors.complimentary,
                  }}
                  thumbColor={
                    aiFeatureStates[feature.id] ? '#FFFFFF' : '#FFFFFF'
                  }
                />
              </View>
            ))}
          </View>
        </View>

        {/* Communication */}
        <View style={tw`mx-6 mb-8`}>
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
            Communication
          </Text>
          <View style={tw`gap-6`}>
            {communicationItems.map((item, index) => (
              <View
                key={item.id}
                style={[
                  tw`flex-row items-center justify-between pb-6`,
                  index < communicationItems.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(0,0,0,0.05)',
                  },
                ]}
              >
                <View style={tw`flex-row items-center gap-4 flex-1`}>
                  <Image
                    source={{ uri: item.image }}
                    style={tw`w-12 h-12 rounded-full`}
                    resizeMode="cover"
                  />
                  <View style={tw`flex-1`}>
                    <Text
                      style={[
                        tw`text-sm font-normal mb-1`,
                        {
                          color: colors.black,
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={[
                        tw`text-xs font-normal`,
                        {
                          color: colors.greyText,
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      {item.description}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={[
                    tw`px-4 py-2 rounded-full`,
                    {
                      backgroundColor: '#F5F5F7',
                    },
                  ]}
                >
                  <Text
                    style={[
                      tw`text-xs font-normal`,
                      {
                        color: colors.complimentary,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    {item.action}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={tw`mx-6 mb-8`}>
          <View style={tw`flex-row items-center justify-between mb-6`}>
            <Text
              style={[
                tw`text-base font-bold`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                  letterSpacing: -0.64,
                },
              ]}
            >
              Recent Activity
            </Text>
            <TouchableOpacity>
              <Text
                style={[
                  tw`text-sm font-normal`,
                  {
                    color: colors.complimentary,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                View all
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tw`gap-6`}>
            {recentActivity.map((activity, index) => (
              <View
                key={activity.id}
                style={[
                  tw`flex-row items-center justify-between pb-6`,
                  index < recentActivity.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(0,0,0,0.05)',
                  },
                ]}
              >
                <View style={tw`flex-row items-center gap-4 flex-1`}>
                  <View
                    style={[
                      tw`w-12 h-12 rounded-full items-center justify-center`,
                      {
                        backgroundColor: '#F5F5F7',
                      },
                    ]}
                  >
                    <activity.icon size={32} color={colors.greyText} />
                  </View>
                  <View style={tw`flex-1`}>
                    <Text
                      style={[
                        tw`text-sm font-normal mb-1`,
                        {
                          color: colors.black,
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      {activity.title}
                    </Text>
                    <Text
                      style={[
                        tw`text-xs font-normal`,
                        {
                          color: colors.greyText,
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      {activity.description}
                    </Text>
                  </View>
                </View>
                <View style={[tw`px-4 py-2 rounded-full`]}>
                  <Text
                    style={[
                      tw`text-xs font-normal`,
                      {
                        color: activity.timeColor,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    {activity.time}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
