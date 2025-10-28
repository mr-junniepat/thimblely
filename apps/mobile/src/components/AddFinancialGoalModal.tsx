import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import tw from 'twrnc';
import { ChevronDown } from 'lucide-react-native';
import BaseModal from './BaseModal';

interface AddFinancialGoalModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddFinancialGoalModal: React.FC<AddFinancialGoalModalProps> = ({
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

  const [goalTitle, setGoalTitle] = useState('');
  const [goalType, setGoalType] = useState<'monthly' | 'yearly'>('monthly');
  const [targetAmount, setTargetAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Revenue');
  const [deadline, setDeadline] = useState('');

  const categories = [
    'Revenue',
    'Savings',
    'Equipment',
    'Marketing',
    'Expansion',
  ];

  const handleCreateGoal = () => {
    // Handle goal creation logic here
    console.log('Creating goal:', {
      goalTitle,
      goalType,
      targetAmount,
      selectedCategory,
      deadline,
    });
    onClose();
  };

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      onBack={onClose}
      title="Add Financial Goals"
      height="90%"
      showBackButton={true}
      showCloseButton={false}
    >
      {/* Goal Title */}
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
          Goal Title
        </Text>
        <TextInput
          style={[
            tw`border border-gray-200 rounded-lg px-4 py-3`,
            {
              borderColor: colors.lightGrey,
              fontFamily: 'Satoshi Variable',
            },
          ]}
          placeholder="Enter goal title"
          placeholderTextColor={colors.greyText}
          value={goalTitle}
          onChangeText={setGoalTitle}
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
            onPress={() => setGoalType('monthly')}
            style={[
              tw`flex-1 py-3 px-4 rounded-lg`,
              {
                backgroundColor:
                  goalType === 'monthly'
                    ? colors.lightComplimentary
                    : 'transparent',
                borderWidth: goalType === 'monthly' ? 0 : 1,
                borderColor: colors.lightGrey,
              },
            ]}
          >
            <Text
              style={[
                tw`text-sm text-center`,
                {
                  color:
                    goalType === 'monthly'
                      ? colors.complimentary
                      : colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Monthly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setGoalType('yearly')}
            style={[
              tw`flex-1 py-3 px-4 rounded-lg`,
              {
                backgroundColor:
                  goalType === 'yearly'
                    ? colors.lightComplimentary
                    : 'transparent',
                borderWidth: goalType === 'yearly' ? 0 : 1,
                borderColor: colors.lightGrey,
              },
            ]}
          >
            <Text
              style={[
                tw`text-sm text-center`,
                {
                  color:
                    goalType === 'yearly' ? colors.complimentary : colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Yearly
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

      {/* Deadline */}
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
          Deadline
        </Text>
        <TouchableOpacity
          style={[
            tw`border border-gray-200 rounded-lg px-4 py-3 flex-row items-center justify-between`,
            {
              borderColor: colors.lightGrey,
            },
          ]}
        >
          <Text
            style={[
              tw`text-sm`,
              {
                color: deadline ? colors.black : colors.greyText,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            {deadline || 'Select date'}
          </Text>
          <ChevronDown size={16} color={colors.greyText} />
        </TouchableOpacity>
      </View>

      {/* Create Goal Button */}
      <TouchableOpacity
        onPress={handleCreateGoal}
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
          Create Goal
        </Text>
      </TouchableOpacity>
    </BaseModal>
  );
};

export default AddFinancialGoalModal;
