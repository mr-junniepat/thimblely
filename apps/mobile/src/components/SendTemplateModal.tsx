import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import tw from 'twrnc';
import { X, Ruler } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { faker } from '@faker-js/faker';
import { SearchBar } from './index';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  white: '#FFFFFF',
  lightGrey: '#F5F5F7',
};

interface MeasurementTemplate {
  id: string;
  name: string;
  description: string;
  isDefault?: boolean;
}

interface SendTemplateModalProps {
  visible: boolean;
  onClose: () => void;
  onSendTemplate?: (templateId: string) => void;
  onCreateNew?: () => void;
}

// Mock measurement templates
const measurementTemplates: MeasurementTemplate[] = [
  {
    id: '1',
    name: 'Button-Shirt Template',
    description: 'Arm length, Arm width, Chest width, D...',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Template Name',
    description: 'Arm length, Arm width, Chest width, D...',
  },
  {
    id: '3',
    name: 'Template Name',
    description: 'Leg length, Leg width, Hip width, D...',
  },
  {
    id: '4',
    name: 'Template Name',
    description: 'Waist circumference, Thigh circumference...',
  },
];

export default function SendTemplateModal({
  visible,
  onClose,
  onSendTemplate,
  onCreateNew,
}: SendTemplateModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const filteredTemplates = measurementTemplates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendTemplate = () => {
    if (selectedTemplate && onSendTemplate) {
      onSendTemplate(selectedTemplate);
    }
    onClose();
  };

  const handleCreateNew = () => {
    if (onCreateNew) {
      onCreateNew();
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
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
              height: 662, // Exact Figma height
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
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
                  letterSpacing: -0.64,
                },
              ]}
            >
              Send Measurement Template
            </Text>
            <View style={tw`flex-1 items-end`}>
              <TouchableOpacity onPress={onClose}>
                <X size={24} color={colors.black} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          <View style={tw`px-6 mb-6`}>
            <SearchBar
              placeholder="Search templates"
              value={searchQuery}
              onChangeText={setSearchQuery}
              containerStyle={tw`px-0 mb-0`}
            />
          </View>

          {/* Templates List */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`px-6 pb-6`}
            style={tw`flex-1`}
          >
            <View style={tw`gap-4`}>
              {filteredTemplates.map((template) => (
                <TouchableOpacity
                  key={template.id}
                  onPress={() => setSelectedTemplate(template.id)}
                  style={[
                    tw`flex-row items-center p-3 rounded-lg`,
                    {
                      backgroundColor: colors.white,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.1,
                      shadowRadius: 10,
                      elevation: 4,
                      borderWidth: selectedTemplate === template.id ? 2 : 0,
                      borderColor: colors.complimentary,
                    },
                  ]}
                >
                  {/* Template Icon */}
                  <View
                    style={[
                      tw`w-[50px] h-[50px] rounded-full items-center justify-center mr-4`,
                      {
                        backgroundColor: colors.lightGrey,
                      },
                    ]}
                  >
                    <Ruler size={24} color={colors.greyText} />
                  </View>

                  {/* Template Info */}
                  <View style={tw`flex-1`}>
                    <View style={tw`flex-row items-center justify-between`}>
                      <Text
                        style={[
                          tw`text-sm font-medium`,
                          {
                            color: colors.black,
                            fontFamily: 'Satoshi Variable',
                          },
                        ]}
                      >
                        {template.name}
                      </Text>
                      {template.isDefault && (
                        <View
                          style={[
                            tw`px-3 py-1 rounded-full`,
                            {
                              backgroundColor: `${colors.complimentary}15`,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              tw`text-xs`,
                              {
                                color: colors.complimentary,
                                fontFamily: 'Satoshi Variable',
                              },
                            ]}
                          >
                            Default
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text
                      style={[
                        tw`text-xs mt-1`,
                        {
                          color: colors.greyText,
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      {template.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}

              {/* Create New Template Button */}
              <TouchableOpacity
                onPress={handleCreateNew}
                style={[
                  tw`py-4 px-4 rounded-[32px] items-center mt-4`,
                  {
                    backgroundColor: `${colors.complimentary}15`,
                  },
                ]}
              >
                <Text
                  style={[
                    tw`text-sm font-normal`,
                    {
                      color: colors.complimentary,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Create New Template
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Send Button */}
          <View style={tw`px-6 pb-6`}>
            <TouchableOpacity
              onPress={handleSendTemplate}
              disabled={!selectedTemplate}
              style={tw`mb-4`}
            >
              <LinearGradient
                colors={[colors.complimentary, '#56062D', colors.complimentary]}
                locations={[0, 0.496, 0.971]}
                style={[
                  tw`py-4 px-2 rounded-[32px] items-center`,
                  {
                    opacity: selectedTemplate ? 1 : 0.5,
                  },
                ]}
              >
                <Text
                  style={[
                    tw`text-sm font-normal`,
                    {
                      color: colors.white,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Send
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
