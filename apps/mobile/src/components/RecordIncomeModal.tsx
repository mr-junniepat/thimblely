import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import tw from 'twrnc';
import { X } from 'lucide-react-native';
import BaseModal from './BaseModal';

interface RecordIncomeModalProps {
  visible: boolean;
  onClose: () => void;
}

const RecordIncomeModal: React.FC<RecordIncomeModalProps> = ({
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

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Sales Revenue');

  const categories = ['Sales Revenue', 'Service Revenue', 'Other Income'];

  const handleRecordIncome = () => {
    // Handle income recording logic here
    console.log('Recording income:', {
      amount,
      description,
      selectedCategory,
    });
    onClose();
  };

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      onBack={onClose}
      title="Record Income"
      height="90%"
      showBackButton={false}
      showCloseButton={true}
    >
      {/* Amount */}
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
          Amount ($)
        </Text>
        <TextInput
          style={[
            tw`border border-gray-200 rounded-lg px-4 py-3`,
            {
              borderColor: colors.lightGrey,
              fontFamily: 'Satoshi Variable',
            },
          ]}
          placeholder="Enter amount"
          placeholderTextColor={colors.greyText}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
      </View>

      {/* Description */}
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
          Description
        </Text>
        <TextInput
          style={[
            tw`border border-gray-200 rounded-lg px-4 py-3`,
            {
              borderColor: colors.lightGrey,
              fontFamily: 'Satoshi Variable',
            },
          ]}
          placeholder="Enter description"
          placeholderTextColor={colors.greyText}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
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
        <View style={tw`flex-row gap-2`}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                tw`flex-1 py-3 px-4 rounded-lg`,
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
                  tw`text-sm text-center`,
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

      {/* Record Income Button */}
      <TouchableOpacity
        onPress={handleRecordIncome}
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
          Record Income
        </Text>
      </TouchableOpacity>
    </BaseModal>
  );
};

export default RecordIncomeModal;
