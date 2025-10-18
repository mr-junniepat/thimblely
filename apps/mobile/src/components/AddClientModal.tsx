import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import tw from 'twrnc';
import { X } from 'lucide-react-native';
import { Input } from './index';
import { LinearGradient } from 'expo-linear-gradient';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  white: '#FFFFFF',
};

interface ClientForm {
  name: string;
  email: string;
  phone: string;
  company: string;
}

interface AddClientModalProps {
  visible: boolean;
  onClose: () => void;
  onAddClient?: (client: ClientForm) => void;
}

export default function AddClientModal({
  visible,
  onClose,
  onAddClient,
}: AddClientModalProps) {
  const [formData, setFormData] = useState<ClientForm>({
    name: '',
    email: '',
    phone: '',
    company: '',
  });

  const handleInputChange = (field: keyof ClientForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddClient = () => {
    if (onAddClient) {
      onAddClient(formData);
    }
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
    });
    onClose();
  };

  const isFormValid = formData.name && formData.email && formData.phone;

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
              height: 555, // Exact Figma height
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
                },
              ]}
            >
              Add Client
            </Text>
            <View style={tw`flex-1 items-end`}>
              <TouchableOpacity onPress={onClose}>
                <X size={24} color={colors.black} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Content */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`px-6 pb-6`}
            style={tw`flex-1`}
          >
            <View style={tw`gap-6`}>
              {/* Client Name */}
              <View style={tw`gap-2`}>
                <Text
                  style={[
                    tw`text-sm font-bold`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Client Name
                </Text>
                <Input
                  placeholder="Enter name"
                  value={formData.name}
                  onChangeText={(text) => handleInputChange('name', text)}
                  containerStyle={tw`mb-0`}
                  height={51}
                />
              </View>

              {/* Email */}
              <View style={tw`gap-2`}>
                <Text
                  style={[
                    tw`text-sm font-bold`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Email
                </Text>
                <Input
                  placeholder="Enter email"
                  value={formData.email}
                  onChangeText={(text) => handleInputChange('email', text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  containerStyle={tw`mb-0`}
                  height={51}
                />
              </View>

              {/* Phone Number */}
              <View style={tw`gap-2`}>
                <Text
                  style={[
                    tw`text-sm font-bold`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Phone Number
                </Text>
                <Input
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChangeText={(text) => handleInputChange('phone', text)}
                  keyboardType="phone-pad"
                  containerStyle={tw`mb-0`}
                  height={51}
                />
              </View>

              {/* Company */}
              <View style={tw`gap-2`}>
                <Text
                  style={[
                    tw`text-sm font-bold`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Company
                </Text>
                <Input
                  placeholder="Enter company name"
                  value={formData.company}
                  onChangeText={(text) => handleInputChange('company', text)}
                  containerStyle={tw`mb-0`}
                  height={51}
                />
              </View>

              {/* Add Client Button */}
              <TouchableOpacity
                onPress={handleAddClient}
                disabled={!isFormValid}
                style={tw`mt-6`}
              >
                <LinearGradient
                  colors={[
                    colors.complimentary,
                    '#56062D',
                    colors.complimentary,
                  ]}
                  locations={[0, 0.496, 0.971]}
                  style={[
                    tw`py-4 px-2 rounded-[32px] items-center`,
                    {
                      opacity: isFormValid ? 1 : 0.5,
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
                    Add Client
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
