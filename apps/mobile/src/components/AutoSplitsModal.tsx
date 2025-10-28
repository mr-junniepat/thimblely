import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import tw from 'twrnc';
import { X, Plus } from 'lucide-react-native';
import AddAutoSplitModal from './AddAutoSplitModal';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  white: '#FFFFFF',
  lightGrey: '#F5F5F7',
  blue: '#1A73E8',
};

interface Split {
  id: string;
  title: string;
  amount: string;
  category: string;
}

interface AutoSplitsModalProps {
  visible: boolean;
  onClose: () => void;
  onAddSplit?: () => void;
}

const AutoSplitsModal: React.FC<AutoSplitsModalProps> = ({
  visible,
  onClose,
  onAddSplit,
}) => {
  const [showAddSplitModal, setShowAddSplitModal] = useState(false);

  const handleAddNewSplit = () => {
    if (onAddSplit) {
      onAddSplit(); // Use parent handler if provided
    } else {
      onClose(); // Close the current modal first
      setShowAddSplitModal(true);
    }
  };

  const handleCloseAddSplitModal = () => {
    setShowAddSplitModal(false);
  };
  // Mock split data
  const splits: Split[] = [
    {
      id: '1',
      title: 'Split Title',
      amount: '$200,000',
      category: 'Emergency Fund',
    },
    {
      id: '2',
      title: 'Income Tax',
      amount: '20%',
      category: 'Taxes',
    },
  ];

  const renderSplitCard = (split: Split) => (
    <View
      key={split.id}
      style={[tw`p-3 rounded-lg mb-4`, { backgroundColor: colors.lightGrey }]}
    >
      <Text
        style={[
          tw`text-sm font-bold mb-3`,
          {
            color: colors.black,
            fontFamily: 'Satoshi Variable',
          },
        ]}
      >
        {split.title}
      </Text>
      <View style={tw`flex-row items-center gap-3`}>
        <Text
          style={[
            tw`text-base`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          {split.amount}
        </Text>
        <View
          style={[
            tw`px-3 py-1 rounded-full`,
            { backgroundColor: `${colors.blue}17` },
          ]}
        >
          <Text
            style={[
              tw`text-xs`,
              {
                color: colors.blue,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            {split.category}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <View
        style={[tw`flex-1 justify-end`, { backgroundColor: 'rgba(0,0,0,0.3)' }]}
      >
        {/* Modal Content */}
        <View style={[tw`bg-white rounded-t-lg`, { height: '35%' }]}>
          {/* Header */}
          <View style={tw`flex-row items-center justify-between px-6 py-6`}>
            <Text
              style={[
                tw`text-base font-normal`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Auto Splits
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color={colors.black} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView
            style={tw`flex-1 px-6`}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {splits.map(renderSplitCard)}

            {/* Add New Split Button */}
            <TouchableOpacity
              onPress={handleAddNewSplit}
              style={[
                tw`flex-row items-center justify-center px-6 py-3 rounded-full mb-6`,
                { backgroundColor: `${colors.complimentary}17` },
              ]}
            >
              <Plus size={16} color={colors.complimentary} />
              <Text
                style={[
                  tw`text-sm ml-2`,
                  {
                    color: colors.complimentary,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Add New Split
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>

      {/* Add Auto Split Modal */}
      <AddAutoSplitModal
        visible={showAddSplitModal}
        onClose={handleCloseAddSplitModal}
      />
    </Modal>
  );
};

export default AutoSplitsModal;
