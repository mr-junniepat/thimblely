import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import tw from 'twrnc';
import { ChevronLeft, Save } from 'lucide-react-native';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  backgroundWhite: '#FAFAFA',
};

interface MeasurementField {
  id: string;
  label: string;
  value: string;
  unit: string;
  required: boolean;
}

interface MeasurementTemplate {
  id: string;
  name: string;
  fields: MeasurementField[];
}

// Mock measurement templates
const measurementTemplates: MeasurementTemplate[] = [
  {
    id: 'template_001',
    name: 'Basic Measurements',
    fields: [
      {
        id: 'chest',
        label: 'Chest',
        value: '',
        unit: 'inches',
        required: true,
      },
      {
        id: 'waist',
        label: 'Waist',
        value: '',
        unit: 'inches',
        required: true,
      },
      { id: 'hips', label: 'Hips', value: '', unit: 'inches', required: true },
      {
        id: 'shoulder',
        label: 'Shoulder',
        value: '',
        unit: 'inches',
        required: false,
      },
      {
        id: 'arm_length',
        label: 'Arm Length',
        value: '',
        unit: 'inches',
        required: true,
      },
      {
        id: 'inseam',
        label: 'Inseam',
        value: '',
        unit: 'inches',
        required: false,
      },
    ],
  },
  {
    id: 'template_002',
    name: 'Detailed Measurements',
    fields: [
      {
        id: 'chest',
        label: 'Chest',
        value: '',
        unit: 'inches',
        required: true,
      },
      {
        id: 'waist',
        label: 'Waist',
        value: '',
        unit: 'inches',
        required: true,
      },
      { id: 'hips', label: 'Hips', value: '', unit: 'inches', required: true },
      {
        id: 'shoulder',
        label: 'Shoulder',
        value: '',
        unit: 'inches',
        required: true,
      },
      {
        id: 'arm_length',
        label: 'Arm Length',
        value: '',
        unit: 'inches',
        required: true,
      },
      {
        id: 'inseam',
        label: 'Inseam',
        value: '',
        unit: 'inches',
        required: true,
      },
      {
        id: 'thigh',
        label: 'Thigh',
        value: '',
        unit: 'inches',
        required: false,
      },
      { id: 'knee', label: 'Knee', value: '', unit: 'inches', required: false },
      {
        id: 'ankle',
        label: 'Ankle',
        value: '',
        unit: 'inches',
        required: false,
      },
    ],
  },
];

export default function MeasurementFormScreen({ navigation, route }: any) {
  const { templateId } = route.params || {};
  const [measurements, setMeasurements] = useState<MeasurementField[]>([]);

  // Find the template or use default
  const template =
    measurementTemplates.find((t) => t.id === templateId) ||
    measurementTemplates[0];

  // Initialize measurements state
  React.useEffect(() => {
    setMeasurements(template.fields.map((field) => ({ ...field })));
  }, [templateId]);

  const updateMeasurement = (fieldId: string, value: string) => {
    setMeasurements((prev) =>
      prev.map((field) => (field.id === fieldId ? { ...field, value } : field))
    );
  };

  const handleSave = () => {
    console.log('Saving measurements:', measurements);
    // TODO: Implement save logic
    navigation.goBack();
  };

  const isFormValid = () => {
    return measurements.every(
      (field) => !field.required || field.value.trim() !== ''
    );
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Status Bar Space */}
      <View style={tw`h-12`} />

      {/* Header */}
      <View style={tw`px-6 py-4 flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center`}>
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
            {template.name}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleSave}
          disabled={!isFormValid()}
          style={[
            tw`px-4 py-2 rounded-full flex-row items-center`,
            {
              backgroundColor: isFormValid()
                ? colors.complimentary
                : colors.greyText,
            },
          ]}
        >
          <Save size={16} color="white" />
          <Text
            style={[
              tw`text-sm font-bold ml-2`,
              {
                color: 'white',
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={tw`px-6 mt-6`}>
          {/* Instructions */}
          <View style={tw`mb-6`}>
            <Text
              style={[
                tw`text-sm font-bold mb-2`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Measurement Instructions
            </Text>
            <Text
              style={[
                tw`text-sm mb-2`,
                {
                  color: colors.greyText,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Please fill in your measurements accurately. Use a measuring tape
              and measure over your undergarments.
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
              Fields marked with * are required.
            </Text>
          </View>

          {/* Measurement Fields - Compact Layout */}
          <View style={tw`gap-4`}>
            {measurements.map((field) => (
              <View
                key={field.id}
                style={[
                  tw`flex-row items-center justify-between py-4 px-4 rounded-lg border`,
                  {
                    backgroundColor: colors.backgroundWhite,
                    borderColor: 'rgba(0,0,0,0.1)',
                  },
                ]}
              >
                {/* Label */}
                <View style={tw`flex-1`}>
                  <Text
                    style={[
                      tw`text-sm font-medium`,
                      {
                        color: colors.black,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    {field.label}
                    {field.required && (
                      <Text style={{ color: colors.complimentary }}> *</Text>
                    )}
                  </Text>
                </View>

                {/* Input */}
                <View style={tw`flex-row items-center gap-2`}>
                  <TextInput
                    style={[
                      tw`text-right text-sm font-medium w-16`,
                      {
                        color: colors.black,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                    placeholder="0"
                    placeholderTextColor={colors.greyText}
                    value={field.value}
                    onChangeText={(value) => updateMeasurement(field.id, value)}
                    keyboardType="numeric"
                  />
                  <Text
                    style={[
                      tw`text-sm font-medium`,
                      {
                        color: colors.greyText,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    {field.unit}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Save Button */}
          <TouchableOpacity
            onPress={handleSave}
            disabled={!isFormValid()}
            style={[
              tw`py-4 px-6 rounded-full items-center mt-8`,
              {
                backgroundColor: isFormValid()
                  ? colors.complimentary
                  : colors.greyText,
                borderRadius: 32,
              },
            ]}
          >
            <Text
              style={[
                tw`text-base font-bold`,
                {
                  color: 'white',
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Save Measurements
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
