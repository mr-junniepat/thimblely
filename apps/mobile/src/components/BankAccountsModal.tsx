import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';
import { Bank, Plus } from 'lucide-react-native';
import BaseModal from './BaseModal';

interface BankAccount {
  id: string;
  name: string;
  accountNumber: string;
}

interface BankAccountsModalProps {
  visible: boolean;
  onClose: () => void;
}

const BankAccountsModal: React.FC<BankAccountsModalProps> = ({
  visible,
  onClose,
}) => {
  const colors = {
    black: '#111113',
    white: '#FFFFFF',
    greyText: '#68666F',
    complimentary: '#A30552',
    lightGrey: 'rgba(0,0,0,0.1)',
    lightComplimentary: 'rgba(163,5,82,0.09)',
    backgroundGrey: '#FAFAFA',
    purpleLight: 'rgba(107,35,116,0.08)',
  };

  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    {
      id: '1',
      name: 'First Bank of Nigeria',
      accountNumber: '3459028345',
    },
    {
      id: '2',
      name: 'Microfinance Bank',
      accountNumber: '5849324586',
    },
  ]);

  const handleRemoveAccount = (accountId: string) => {
    setBankAccounts((accounts) =>
      accounts.filter((account) => account.id !== accountId)
    );
  };

  const handleAddBankAccount = () => {
    console.log('Add new bank account');
    // Handle adding new bank account logic here
    onClose();
  };

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      onBack={onClose}
      title="Bank Accounts"
      height="90%"
      showBackButton={true}
      showCloseButton={false}
    >
      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        {/* Bank Accounts List */}
        <View style={tw`mb-6`}>
          {bankAccounts.map((account, index) => (
            <View
              key={account.id}
              style={[
                tw`flex-row items-center justify-between py-6`,
                index < bankAccounts.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: colors.lightGrey,
                },
              ]}
            >
              {/* Bank Account Info */}
              <View style={tw`flex-row items-center flex-1`}>
                {/* Bank Icon */}
                <View
                  style={[
                    tw`w-10 h-10 rounded-full items-center justify-center mr-4`,
                    {
                      backgroundColor: colors.purpleLight,
                    },
                  ]}
                >
                  <Bank size={24} color={colors.complimentary} />
                </View>

                {/* Account Details */}
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
                    {account.name}
                  </Text>
                  <Text
                    style={[
                      tw`text-xs`,
                      {
                        color: colors.greyText,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    {account.accountNumber}
                  </Text>
                </View>
              </View>

              {/* Remove Account Button */}
              <TouchableOpacity
                onPress={() => handleRemoveAccount(account.id)}
                style={[
                  tw`px-3 py-2 rounded-lg`,
                  {
                    backgroundColor: colors.backgroundGrey,
                  },
                ]}
              >
                <Text
                  style={[
                    tw`text-xs`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Remove account
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Add Bank Account Button */}
        <TouchableOpacity
          onPress={handleAddBankAccount}
          style={[
            tw`flex-row items-center justify-center px-6 py-3 rounded-full`,
            {
              backgroundColor: colors.lightComplimentary,
            },
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
            Add Bank Account
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </BaseModal>
  );
};

export default BankAccountsModal;
