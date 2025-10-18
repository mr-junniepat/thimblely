import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import { ChevronLeft, Mail, Phone, Building, Ruler } from 'lucide-react-native';
import { faker } from '@faker-js/faker';
import { SendTemplateModal, MeasurementDetailsModal } from '../../components';

// Import background SVG
const bgClientSvg = require('@thimblely/shared/images/bgclient.svg');

// Import colors directly
const colors = {
  complimentary: '#A30552',
  purpleSecond: '#682476',
  black: '#111113',
  greyText: '#68666F',
  backgroundWhite: '#FAFAFA',
  success: '#34C759',
  warning: '#FBBC04',
  error: '#FF383C',
  lightGrey: '#F5F5F7',
};

interface ClientDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  avatar: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Active' | 'Prospect' | 'Inactive';
  orders: number;
  revenue: string;
  measurements: {
    id: string;
    name: string;
    description: string;
  }[];
}

// Mock data
const clientDetail: ClientDetail = {
  id: '1',
  name: 'Sola David',
  email: 'marcussews@stitchmeister.com',
  phone: '+2348945883745',
  company: 'JumpLLC',
  avatar: faker.image.avatar(),
  priority: 'High',
  status: 'Active',
  orders: 2,
  revenue: '$40.0k',
  measurements: [
    {
      id: '1',
      name: 'Button-Shirt Template',
      description: 'Arm length: 24 - Arm width: 30 - Chest...',
    },
    {
      id: '2',
      name: 'Template Name',
      description: 'Arm length: 24 - Arm width: 30 - Chest...',
    },
  ],
};

export default function ClientDetailScreen({ navigation, route }: any) {
  const { clientId } = route.params || {};
  const [client] = useState(clientDetail);
  const [showSendTemplateModal, setShowSendTemplateModal] = useState(false);
  const [showMeasurementDetailsModal, setShowMeasurementDetailsModal] =
    useState(false);
  const [selectedMeasurement, setSelectedMeasurement] = useState<any>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return colors.error;
      case 'Medium':
        return colors.warning;
      case 'Low':
        return colors.success;
      default:
        return colors.greyText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return colors.success;
      case 'Prospect':
        return colors.warning;
      case 'Inactive':
        return colors.greyText;
      default:
        return colors.greyText;
    }
  };

  const handleSendTemplate = useCallback(
    (templateId: string) => {
      // TODO: Implement send template logic
      console.log('Sending template:', templateId, 'to client:', client.id);
      setShowSendTemplateModal(false);
    },
    [client.id]
  );

  const handleCreateNewTemplate = useCallback(() => {
    // TODO: Navigate to create new template screen
    console.log('Creating new template for client:', client.id);
    setShowSendTemplateModal(false);
  }, [client.id]);

  const handleMeasurementPress = useCallback((measurement: any) => {
    setSelectedMeasurement(measurement);
    setShowMeasurementDetailsModal(true);
  }, []);

  const handleSaveMeasurements = useCallback(
    (measurements: any[]) => {
      // TODO: Implement save measurements logic
      console.log(
        'Saving measurements:',
        measurements,
        'for client:',
        client.id
      );
      setShowMeasurementDetailsModal(false);
    },
    [client.id]
  );

  const renderMeasurementCard = useCallback(
    ({ item }: { item: { id: string; name: string; description: string } }) => (
      <TouchableOpacity
        onPress={() => handleMeasurementPress(item)}
        style={[
          tw`flex-row items-center p-3 rounded-lg shadow-sm`,
          {
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 2,
          },
        ]}
      >
        <View
          style={[
            tw`w-12 h-12 items-center justify-center rounded-full`,
            {
              backgroundColor: colors.lightGrey,
            },
          ]}
        >
          <Ruler size={24} color={colors.black} />
        </View>
        <View style={tw`flex-1 ml-4`}>
          <Text
            style={[
              tw`text-sm font-bold`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            {item.name}
          </Text>
          <Text
            style={[
              tw`text-xs mt-1`,
              {
                color: colors.greyText,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [handleMeasurementPress]
  );

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header - No Gradient */}
      <View
        style={[
          tw`h-64 pt-12`,
          {
            backgroundColor: colors.purpleSecond,
          },
        ]}
      >
        {/* Background SVG */}
        <Image
          source={bgClientSvg}
          style={[
            tw`absolute inset-0`,
            {
              opacity: 0.1,
              resizeMode: 'cover',
            },
          ]}
        />
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`absolute top-16 left-6 z-20`}
        >
          <ChevronLeft size={24} color="white" />
        </TouchableOpacity>

        {/* Client Profile */}
        <View style={tw`flex-1 items-center justify-center pt-8`}>
          {/* Avatar */}
          <View style={tw`items-center mb-4`}>
            <View
              style={[
                tw`w-20 h-20 rounded-full items-center justify-center`,
                {
                  backgroundColor: 'white',
                },
              ]}
            >
              <Text
                style={[
                  tw`text-2xl font-bold`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {client.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </Text>
            </View>
          </View>

          {/* Name and Priority */}
          <View style={tw`items-center`}>
            <Text
              style={[
                tw`text-2xl font-bold text-white mb-1`,
                {
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              {client.name}
            </Text>
            <View
              style={[
                tw`px-3 py-1 rounded-full`,
                {
                  backgroundColor: 'white',
                },
              ]}
            >
              <Text
                style={[
                  tw`text-sm`,
                  {
                    color: getPriorityColor(client.priority),
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {client.priority} Priority
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Statistics Section */}
        <View style={tw`px-6 py-6`}>
          <Text
            style={[
              tw`text-base font-bold mb-4`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            Statistics
          </Text>
          <View style={tw`flex-row items-center justify-between`}>
            {/* Orders */}
            <View style={tw`items-center`}>
              <Text
                style={[
                  tw`text-base text-center`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {client.orders}
              </Text>
              <Text
                style={[
                  tw`text-sm`,
                  {
                    color: colors.greyText,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Orders
              </Text>
            </View>

            {/* Revenue */}
            <View style={tw`items-center`}>
              <Text
                style={[
                  tw`text-base text-center`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {client.revenue}
              </Text>
              <Text
                style={[
                  tw`text-sm`,
                  {
                    color: colors.greyText,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Revenue
              </Text>
            </View>

            {/* Status */}
            <View style={tw`items-center`}>
              <Text
                style={[
                  tw`text-base text-center font-bold`,
                  {
                    color: getStatusColor(client.status),
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {client.status}
              </Text>
              <Text
                style={[
                  tw`text-sm`,
                  {
                    color: colors.greyText,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Status
              </Text>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View
          style={[
            tw`h-px`,
            {
              backgroundColor: 'rgba(0,0,0,0.1)',
            },
          ]}
        />

        {/* Client Details Section */}
        <View style={tw`px-6 py-6`}>
          <Text
            style={[
              tw`text-base font-bold mb-4`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            Client Details
          </Text>

          <View style={tw`gap-6`}>
            {/* Email */}
            <View style={tw`flex-row items-center`}>
              <View
                style={[
                  tw`w-10 h-10 items-center justify-center rounded-lg`,
                  {
                    backgroundColor: 'rgba(0,0,0,0.09)',
                  },
                ]}
              >
                <Mail size={16} color={colors.black} />
              </View>
              <View style={tw`ml-3`}>
                <Text
                  style={[
                    tw`text-xs`,
                    {
                      color: colors.greyText,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  EMAIL
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
                  {client.email}
                </Text>
              </View>
            </View>

            {/* Phone */}
            <View style={tw`flex-row items-center`}>
              <View
                style={[
                  tw`w-10 h-10 items-center justify-center rounded-lg`,
                  {
                    backgroundColor: 'rgba(0,0,0,0.09)',
                  },
                ]}
              >
                <Phone size={16} color={colors.black} />
              </View>
              <View style={tw`ml-3`}>
                <Text
                  style={[
                    tw`text-xs`,
                    {
                      color: colors.greyText,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  PHONE
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
                  {client.phone}
                </Text>
              </View>
            </View>

            {/* Company */}
            <View style={tw`flex-row items-center`}>
              <View
                style={[
                  tw`w-10 h-10 items-center justify-center rounded-lg`,
                  {
                    backgroundColor: 'rgba(0,0,0,0.09)',
                  },
                ]}
              >
                <Building size={16} color={colors.black} />
              </View>
              <View style={tw`ml-3`}>
                <Text
                  style={[
                    tw`text-xs`,
                    {
                      color: colors.greyText,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  COMPANY
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
                  {client.company}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View
          style={[
            tw`h-px`,
            {
              backgroundColor: 'rgba(0,0,0,0.1)',
            },
          ]}
        />

        {/* Measurements Section */}
        <View style={tw`px-6 py-6`}>
          <Text
            style={[
              tw`text-base font-bold mb-4`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            Measurements
          </Text>

          <View style={tw`gap-4 mb-4`}>
            {client.measurements.map((measurement) => (
              <View key={measurement.id}>
                {renderMeasurementCard({ item: measurement })}
              </View>
            ))}
          </View>

          {/* Send Template Button */}
          <TouchableOpacity
            onPress={() => setShowSendTemplateModal(true)}
            style={[
              tw`py-4 px-6 rounded-full items-center`,
              {
                backgroundColor: `${colors.complimentary}15`,
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
              Send template
            </Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View
          style={[
            tw`h-px`,
            {
              backgroundColor: 'rgba(0,0,0,0.1)',
            },
          ]}
        />

        {/* Client History Section */}
        <View style={tw`px-6 py-6`}>
          <Text
            style={[
              tw`text-base font-bold`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            Client History
          </Text>
        </View>
      </ScrollView>

      {/* Send Template Modal */}
      <SendTemplateModal
        visible={showSendTemplateModal}
        onClose={() => setShowSendTemplateModal(false)}
        onSendTemplate={handleSendTemplate}
        onCreateNew={handleCreateNewTemplate}
      />

      {/* Measurement Details Modal */}
      <MeasurementDetailsModal
        visible={showMeasurementDetailsModal}
        onClose={() => setShowMeasurementDetailsModal(false)}
        templateName={selectedMeasurement?.name}
        onSave={handleSaveMeasurements}
      />
    </View>
  );
}
