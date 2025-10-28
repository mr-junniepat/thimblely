import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import tw from 'twrnc';
import { X, Plus } from 'lucide-react-native';
import AddFinancialGoalModal from './AddFinancialGoalModal';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  complimentaryDark: '#56062D',
  black: '#111113',
  greyText: '#68666F',
  white: '#FFFFFF',
  lightGrey: '#F5F5F7',
  blue: '#1A73E8',
  grey: '#D9D9D9',
};

interface Goal {
  id: string;
  title: string;
  category: string;
  currentAmount: number;
  targetAmount: number;
  percentage: number;
}

interface FinancialGoalsModalProps {
  visible: boolean;
  onClose: () => void;
  onAddGoal?: () => void;
}

const FinancialGoalsModal: React.FC<FinancialGoalsModalProps> = ({
  visible,
  onClose,
  onAddGoal,
}) => {
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);

  const handleAddNewGoal = () => {
    if (onAddGoal) {
      onAddGoal(); // Use parent handler if provided
    } else {
      onClose(); // Close the current modal first
      setShowAddGoalModal(true);
    }
  };

  const handleCloseAddGoalModal = () => {
    setShowAddGoalModal(false);
  };
  // Mock goal data
  const goals: Goal[] = [
    {
      id: '1',
      title: 'Goal Title/Purpose',
      category: 'Equipment',
      currentAmount: 220000,
      targetAmount: 2000000,
      percentage: 10,
    },
    {
      id: '2',
      title: 'Goal Title/Purpose',
      category: 'Equipment',
      currentAmount: 220000,
      targetAmount: 2000000,
      percentage: 10,
    },
  ];

  const formatAmount = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  const renderGoalCard = (goal: Goal) => (
    <View
      key={goal.id}
      style={[tw`p-3 rounded-lg mb-4`, { backgroundColor: colors.lightGrey }]}
    >
      <View style={tw`flex-row items-center justify-between mb-4`}>
        <Text
          style={[
            tw`text-sm font-medium`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          {goal.title}
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
            {goal.category}
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={tw`mb-4`}>
        <View style={[tw`h-2 rounded-full`, { backgroundColor: colors.grey }]}>
          <View
            style={[
              tw`h-2 rounded-full`,
              {
                width: `${goal.percentage}%`,
                backgroundColor: colors.complimentary,
              },
            ]}
          />
        </View>
      </View>

      {/* Amount and Percentage */}
      <View style={tw`flex-row items-center justify-between`}>
        <Text
          style={[
            tw`text-xs font-bold`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          <Text style={{ color: colors.complimentary }}>
            {formatAmount(goal.currentAmount)}
          </Text>
          <Text style={{ color: colors.black }}>
            {' '}
            / {formatAmount(goal.targetAmount)}
          </Text>
        </Text>
        <Text
          style={[
            tw`text-xs`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          {goal.percentage}%
        </Text>
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
        <View style={[tw`bg-white rounded-t-lg`, { height: '40%' }]}>
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
              Financial Goals
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
            {goals.map(renderGoalCard)}

            {/* Add New Goal Button */}
            <TouchableOpacity
              onPress={handleAddNewGoal}
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
                Add New Goal
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>

      {/* Add Financial Goal Modal */}
      <AddFinancialGoalModal
        visible={showAddGoalModal}
        onClose={handleCloseAddGoalModal}
      />
    </Modal>
  );
};

export default FinancialGoalsModal;
