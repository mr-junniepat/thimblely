import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import tw from 'twrnc';
import BaseModal from './BaseModal';

interface AddAutoSplitModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddAutoSplitModal: React.FC<AddAutoSplitModalProps> = ({
  visible,
  onClose,
}) => {
  const colors = {
    black: '#111113',
    white: '#FFFFFF',
    greyText: '#68666F',
    complimentary: '#A30552',
    lightGrey: 'rgba(0,0,0,0.1)',
    lightComplimentary: 'rgba(163,5,82,0.1)',
    overlay: 'rgba(0,0,0,0.3)',
  };

  const [splitName, setSplitName] = useState('');
  const [goalType, setGoalType] = useState<'percentage' | 'fixed'>(
    'percentage'
  );
  const [targetAmount, setTargetAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Giving');

  const categories = [
    'Giving',
    'Savings',
    'Taxes',
    'Emergency Fund',
    'Investment',
  ];

  const handleCreateSplit = () => {
    // Handle split creation logic here
    console.log('Creating split:', {
      splitName,
      goalType,
      targetAmount,
      selectedCategory,
    });
    onClose();
  };

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      onBack={onClose}
      title="Add Auto Split"
      height="90%"
      showBackButton={true}
      showCloseButton={false}
    >
      {/* Split Name */}
      <View style={tw`mb-6`}>
        <Text
          style={[
            tw`text-sm font-medium mb-2`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          Split Name
        </Text>
        <TextInput
          style={[
            tw`border border-gray-200 rounded-lg px-4 py-3`,
            {
              borderColor: colors.lightGrey,
              fontFamily: 'Satoshi Variable',
            },
          ]}
          placeholder="Enter split name"
          placeholderTextColor={colors.greyText}
          value={splitName}
          onChangeText={setSplitName}
        />
      </View>

      {/* Goal Type */}
      <View style={tw`mb-6`}>
        <Text
          style={[
            tw`text-sm font-medium mb-2`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          Goal Type
        </Text>
        <View style={tw`flex-row gap-2`}>
          <TouchableOpacity
            onPress={() => setGoalType('percentage')}
            style={[
              tw`flex-1 py-3 px-4 rounded-lg`,
              {
                backgroundColor:
                  goalType === 'percentage'
                    ? colors.lightComplimentary
                    : 'transparent',
                borderWidth: goalType === 'percentage' ? 0 : 1,
                borderColor: colors.lightGrey,
              },
            ]}
          >
            <Text
              style={[
                tw`text-sm text-center`,
                {
                  color:
                    goalType === 'percentage'
                      ? colors.complimentary
                      : colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Percentage
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setGoalType('fixed')}
            style={[
              tw`flex-1 py-3 px-4 rounded-lg`,
              {
                backgroundColor:
                  goalType === 'fixed'
                    ? colors.lightComplimentary
                    : 'transparent',
                borderWidth: goalType === 'fixed' ? 0 : 1,
                borderColor: colors.lightGrey,
              },
            ]}
          >
            <Text
              style={[
                tw`text-sm text-center`,
                {
                  color:
                    goalType === 'fixed' ? colors.complimentary : colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Fixed Amount
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Target Amount */}
      <View style={tw`mb-6`}>
        <Text
          style={[
            tw`text-sm font-medium mb-2`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          Target Amount ($)
        </Text>
        <TextInput
          style={[
            tw`border border-gray-200 rounded-lg px-4 py-3`,
            {
              borderColor: colors.lightGrey,
              fontFamily: 'Satoshi Variable',
            },
          ]}
          placeholder="Enter target amount"
          placeholderTextColor={colors.greyText}
          value={targetAmount}
          onChangeText={setTargetAmount}
          keyboardType="numeric"
        />
      </View>

      {/* Category */}
      <View style={tw`mb-6`}>
        <Text
          style={[
            tw`text-sm font-medium mb-3`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          Category
        </Text>
        <View style={tw`flex-row flex-wrap gap-2`}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                tw`py-3 px-4 rounded-lg`,
                {
                  backgroundColor:
                    selectedCategory === category
                      ? colors.lightComplimentary
                      : 'transparent',
                  borderWidth: selectedCategory === category ? 0 : 1,
                  borderColor: colors.lightGrey,
                },
              ]}
            >
              <Text
                style={[
                  tw`text-sm`,
                  {
                    color:
                      selectedCategory === category
                        ? colors.complimentary
                        : colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Create Split Button */}
      <TouchableOpacity
        onPress={handleCreateSplit}
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
          Create Split
        </Text>
      </TouchableOpacity>
    </BaseModal>
  );
};

export default AddAutoSplitModal;
