import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import {
  ChevronLeft,
  Plus,
  Building2,
  FileText,
  ArrowUpRight,
  ArrowDownLeft,
  X,
} from 'lucide-react-native';
import {
  FinancialGoalsModal,
  AddFinancialGoalModal,
  MetricCard,
  PlanningCard,
  SectionHeader,
  FloatingButton,
  FloatingActionMenu,
  AutoSplitsModal,
  AddAutoSplitModal,
  RecordIncomeModal,
  RecordExpenseModal,
  BankAccountsModal,
} from '../../components';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  white: '#FFFFFF',
  lightGrey: '#F5F5F7',
  green: '#34C759',
  red: '#FF383C',
  blue: '#1A73E8',
  purple: '#7E3BED',
  purpleLight: '#7344C1',
};

const FinanceScreen: React.FC = () => {
  const navigation = useNavigation();
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [showAutoSplitsModal, setShowAutoSplitsModal] = useState(false);
  const [showAddSplitModal, setShowAddSplitModal] = useState(false);
  const [showRecordIncomeModal, setShowRecordIncomeModal] = useState(false);
  const [showRecordExpenseModal, setShowRecordExpenseModal] = useState(false);
  const [showBankAccountsModal, setShowBankAccountsModal] = useState(false);
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleGoalsPress = () => {
    setShowGoalsModal(true);
  };

  const handleCloseGoalsModal = () => {
    setShowGoalsModal(false);
  };

  const handleAddGoalPress = () => {
    setShowGoalsModal(false); // Close goals modal first
    setShowAddGoalModal(true);
  };

  const handleCloseAddGoalModal = () => {
    setShowAddGoalModal(false);
  };

  const handleAutoSplitsPress = () => {
    setShowAutoSplitsModal(true);
  };

  const handleCloseAutoSplitsModal = () => {
    setShowAutoSplitsModal(false);
  };

  const handleAddSplitPress = () => {
    setShowAutoSplitsModal(false); // Close auto splits modal first
    setShowAddSplitModal(true);
  };

  const handleCloseAddSplitModal = () => {
    setShowAddSplitModal(false);
  };

  const handleRecordIncomePress = () => {
    setShowFloatingMenu(false); // Close floating menu first
    setShowRecordIncomeModal(true);
  };

  const handleCloseRecordIncomeModal = () => {
    setShowRecordIncomeModal(false);
  };

  const handleRecordExpensePress = () => {
    setShowFloatingMenu(false); // Close floating menu first
    setShowRecordExpenseModal(true);
  };

  const handleCloseRecordExpenseModal = () => {
    setShowRecordExpenseModal(false);
  };

  const handleCreateInvoicePress = () => {
    setShowFloatingMenu(false); // Close floating menu first
    navigation.navigate('CreateInvoice' as never);
  };

  const handleBankAccountsPress = () => {
    setShowFloatingMenu(false); // Close floating menu first
    setShowBankAccountsModal(true);
  };

  const handleCloseBankAccountsModal = () => {
    setShowBankAccountsModal(false);
  };

  const handleFloatingButtonPress = () => {
    setShowFloatingMenu(true);
  };

  const handleCloseFloatingMenu = () => {
    setShowFloatingMenu(false);
  };

  // Define floating action menu items
  const floatingActions = [
    {
      id: 'bank-accounts',
      icon: Building2,
      label: 'Bank Accounts',
      iconColor: '#1A73E8',
      iconBackgroundColor: 'rgba(26,115,232,0.2)',
      onPress: handleBankAccountsPress,
    },
    {
      id: 'create-invoice',
      icon: FileText,
      label: 'Create Invoice',
      iconColor: '#6B2374',
      iconBackgroundColor: 'rgba(107,35,116,0.08)',
      onPress: handleCreateInvoicePress,
    },
    {
      id: 'record-expense',
      icon: ArrowUpRight,
      label: 'Record Expense',
      iconColor: '#FF383C',
      iconBackgroundColor: 'rgba(255,56,60,0.2)',
      onPress: handleRecordExpensePress,
    },
    {
      id: 'record-income',
      icon: ArrowDownLeft,
      label: 'Record Income',
      iconColor: '#34C759',
      iconBackgroundColor: 'rgba(52,199,89,0.2)',
      onPress: handleRecordIncomePress,
    },
  ];

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Status Bar Space */}
      <View style={tw`h-12`} />

      {/* Header */}
      <View style={tw`px-6 py-4 flex-row items-center`}>
        <TouchableOpacity onPress={handleBack}>
          <ChevronLeft size={24} color={colors.black} />
        </TouchableOpacity>
        <Text
          style={[
            tw`text-base font-bold ml-5`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          FINANCE CFO
        </Text>
      </View>

      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        {/* Main Content Container */}
        <View style={tw`px-6`}>
          {/* Key Metrics Section */}
          <View
            style={[
              tw`p-4 rounded-lg mb-8`,
              {
                backgroundColor: colors.white,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 4,
              },
            ]}
          >
            <SectionHeader
              title="Key Metrics"
              actionText="View all"
              actionColor={colors.complimentary}
            />

            <View style={tw`flex-row justify-between`}>
              <MetricCard
                iconColor={colors.green}
                label="Monthly Revenue"
                value="$0"
                description="vs last month"
              />
              <MetricCard
                iconColor={colors.blue}
                label="Available Cash"
                value="$0"
                description="Across 0 accounts"
              />
            </View>
          </View>

          {/* This Month Overview */}
          <View style={tw`rounded-lg overflow-hidden mb-8`}>
            <View style={[tw`p-4`, { backgroundColor: colors.lightGrey }]}>
              <SectionHeader
                title="This Month Overview"
                actionText="Select Month"
                actionColor={colors.complimentary}
              />

              <View style={tw`flex-row justify-between`}>
                <MetricCard
                  iconColor={colors.green}
                  label="Income"
                  value="$0"
                  description="0 transactions"
                />
                <MetricCard
                  iconColor={colors.red}
                  label="Expenses"
                  value="$0"
                  description="0 transactions"
                />
              </View>
            </View>

            {/* Net Profit */}
            <View
              style={[
                tw`px-2 py-3 items-center`,
                { backgroundColor: colors.black },
              ]}
            >
              <Text
                style={[
                  tw`text-xs text-center`,
                  {
                    color: colors.white,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Net Profit : $0
              </Text>
            </View>
          </View>

          {/* Financial Planning Section */}
          <View style={tw`mb-6`}>
            <Text
              style={[
                tw`text-base font-bold mb-6`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Financial Planning
            </Text>

            <View style={tw`flex-row gap-3`}>
              <PlanningCard
                iconColor={colors.blue}
                backgroundColor={`${colors.blue}17`}
                title="Goals"
                description="Track Progress"
                status="2 active"
                statusColor={colors.blue}
                onPress={handleGoalsPress}
              />
              <PlanningCard
                iconColor={colors.purple}
                backgroundColor={`${colors.purple}17`}
                title="Auto Splits"
                description="Automate Savings"
                status="0 active"
                statusColor={colors.purple}
                onPress={handleAutoSplitsPress}
              />
            </View>
          </View>

          {/* Recent Activity Section */}
          <SectionHeader
            title="Recent Activity"
            actionText="View All"
            actionColor={colors.complimentary}
          />
        </View>
      </ScrollView>

      <FloatingButton
        icon={showFloatingMenu ? X : Plus}
        iconColor={showFloatingMenu ? colors.complimentary : colors.white}
        backgroundColor={showFloatingMenu ? colors.white : colors.complimentary}
        borderColor={showFloatingMenu ? '#CACFD8' : undefined}
        borderWidth={showFloatingMenu ? 1 : undefined}
        onPress={
          showFloatingMenu ? handleCloseFloatingMenu : handleFloatingButtonPress
        }
      />

      {/* Floating Action Menu */}
      <FloatingActionMenu
        visible={showFloatingMenu}
        onClose={handleCloseFloatingMenu}
        actions={floatingActions}
      />

      {/* Financial Goals Modal */}
      <FinancialGoalsModal
        visible={showGoalsModal}
        onClose={handleCloseGoalsModal}
        onAddGoal={handleAddGoalPress}
      />

      {/* Add Financial Goal Modal */}
      <AddFinancialGoalModal
        visible={showAddGoalModal}
        onClose={handleCloseAddGoalModal}
      />

      {/* Auto Splits Modal */}
      <AutoSplitsModal
        visible={showAutoSplitsModal}
        onClose={handleCloseAutoSplitsModal}
        onAddSplit={handleAddSplitPress}
      />

      {/* Add Auto Split Modal */}
      <AddAutoSplitModal
        visible={showAddSplitModal}
        onClose={handleCloseAddSplitModal}
      />

      {/* Record Income Modal */}
      <RecordIncomeModal
        visible={showRecordIncomeModal}
        onClose={handleCloseRecordIncomeModal}
      />

      {/* Record Expense Modal */}
      <RecordExpenseModal
        visible={showRecordExpenseModal}
        onClose={handleCloseRecordExpenseModal}
      />

      {/* Bank Accounts Modal */}
      <BankAccountsModal
        visible={showBankAccountsModal}
        onClose={handleCloseBankAccountsModal}
      />
    </View>
  );
};

export default FinanceScreen;
