import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import tw from 'twrnc';
import { X } from 'lucide-react-native';
import { faker } from '@faker-js/faker';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  white: '#FFFFFF',
  lightGrey: '#F5F5F7',
};

interface MeasurementField {
  id: string;
  label: string;
  value: string;
}

interface MeasurementDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  templateName?: string;
  measurements?: MeasurementField[];
  onSave?: (measurements: MeasurementField[]) => void;
}

// Mock measurement data for Button-Shirt Template
const defaultMeasurements: MeasurementField[] = [
  { id: '1', label: 'Arm Length', value: '24' },
  { id: '2', label: 'Arm Width', value: '30' },
  { id: '3', label: 'Neck Width', value: '70' },
  { id: '4', label: 'Body Width', value: '70' },
  { id: '5', label: 'Leg Length', value: '32' },
  { id: '6', label: 'Leg Width', value: '20' },
  { id: '7', label: 'Shoulder Width', value: '50' },
  { id: '8', label: 'Hip Width', value: '60' },
  { id: '9', label: 'Wrist Width', value: '15' },
  { id: '10', label: 'Ankle Width', value: '12' },
];

export default function MeasurementDetailsModal({
  visible,
  onClose,
  templateName = 'Button-Shirt Template',
  measurements = defaultMeasurements,
  onSave,
}: MeasurementDetailsModalProps) {
  const [measurementValues, setMeasurementValues] =
    useState<MeasurementField[]>(measurements);

  const handleValueChange = (id: string, value: string) => {
    setMeasurementValues((prev) =>
      prev.map((measurement) =>
        measurement.id === id ? { ...measurement, value } : measurement
      )
    );
  };

  const handleSave = () => {
    if (onSave) {
      onSave(measurementValues);
    }
    onClose();
  };

  const renderMeasurementField = (
    measurement: MeasurementField,
    index: number
  ) => {
    const isLeftColumn = index % 2 === 0;

    return (
      <View
        key={measurement.id}
        style={[tw`flex-1`, isLeftColumn ? tw`mr-2.5` : tw`ml-2.5`]}
      >
        <Text
          style={[
            tw`text-xs font-bold mb-2`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          {measurement.label}
        </Text>
        <View
          style={[
            tw`px-4 py-3 rounded-lg border`,
            {
              borderColor: 'rgba(0,0,0,0.1)',
              backgroundColor: colors.white,
            },
          ]}
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
            {measurement.value}
          </Text>
        </View>
      </View>
    );
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
              height: 595, // Exact Figma height
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
              {templateName}
            </Text>
            <View style={tw`flex-1 items-end`}>
              <TouchableOpacity onPress={onClose}>
                <X size={24} color={colors.black} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Measurements Grid */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`px-6 pb-6`}
            style={tw`flex-1`}
          >
            <View style={tw`gap-5`}>
              {/* Render measurements in pairs */}
              {Array.from(
                { length: Math.ceil(measurementValues.length / 2) },
                (_, rowIndex) => (
                  <View key={rowIndex} style={tw`flex-row`}>
                    {measurementValues
                      .slice(rowIndex * 2, rowIndex * 2 + 2)
                      .map((measurement, colIndex) =>
                        renderMeasurementField(
                          measurement,
                          rowIndex * 2 + colIndex
                        )
                      )}
                  </View>
                )
              )}
            </View>
          </ScrollView>

          {/* Save Button */}
          <View style={tw`px-6 pb-6`}>
            <TouchableOpacity
              onPress={handleSave}
              style={[
                tw`py-4 px-4 rounded-[32px] items-center`,
                {
                  backgroundColor: colors.lightGrey,
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
                Save Measurements
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
