import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Calendar, ChevronDown, Plus } from 'lucide-react-native';

interface CreateInvoiceScreenProps {}

const CreateInvoiceScreen: React.FC<CreateInvoiceScreenProps> = () => {
  const navigation = useNavigation();
  const colors = {
    black: '#111113',
    white: '#FFFFFF',
    greyText: '#68666F',
    complimentary: '#A30552',
    lightGrey: 'rgba(0,0,0,0.1)',
    lightComplimentary: 'rgba(163,5,82,0.1)',
    backgroundGrey: '#FAFAFA',
  };

  const [invoiceDetails, setInvoiceDetails] = useState({
    billsFrom: '',
    billsTo: '',
    recipientEmail: '',
    billTitle: '',
    issuedOn: '',
    dueOn: '',
    currency: 'US Dollar ($)',
  });

  const [invoiceItems, setInvoiceItems] = useState([
    {
      id: 1,
      name: 'Tailored Suit',
      quantity: 1,
      amount: '$200,000',
    },
  ]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddNewItem = () => {
    const newItem = {
      id: invoiceItems.length + 1,
      name: '',
      quantity: 1,
      amount: '',
    };
    setInvoiceItems([...invoiceItems, newItem]);
  };

  const handleUpdateItem = (id: number, field: string, value: string) => {
    setInvoiceItems((items) =>
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleRemoveItem = (id: number) => {
    setInvoiceItems((items) => items.filter((item) => item.id !== id));
  };

  const handleSendInvoice = () => {
    console.log('Sending invoice:', {
      invoiceDetails,
      invoiceItems,
    });
    // Handle invoice sending logic here
    navigation.goBack();
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Status Bar Space */}
      <View style={tw`h-11 bg-white`} />

      {/* Header */}
      <View style={tw`flex-row items-center justify-between px-6 py-4`}>
        <TouchableOpacity onPress={handleBack}>
          <ChevronLeft size={24} color={colors.black} />
        </TouchableOpacity>
        <Text
          style={[
            tw`text-base font-bold`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          Create Invoice
        </Text>
        <View style={tw`w-6`} />
      </View>

      <ScrollView style={tw`flex-1 px-6`} showsVerticalScrollIndicator={false}>
        {/* Invoice Details Section */}
        <View style={tw`mb-8`}>
          <Text
            style={[
              tw`text-base font-bold mb-6`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            Invoice Details
          </Text>

          {/* Bills From & Bills To */}
          <View style={tw`flex-row gap-4 mb-6`}>
            <View style={tw`flex-1`}>
              <Text
                style={[
                  tw`text-sm font-medium mb-2`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Bills From
              </Text>
              <TextInput
                style={[
                  tw`border border-gray-200 rounded-lg px-4 py-3`,
                  {
                    borderColor: colors.lightGrey,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
                placeholder="Enter your name"
                placeholderTextColor={colors.greyText}
                value={invoiceDetails.billsFrom}
                onChangeText={(text) =>
                  setInvoiceDetails({ ...invoiceDetails, billsFrom: text })
                }
              />
            </View>
            <View style={tw`flex-1`}>
              <Text
                style={[
                  tw`text-sm font-medium mb-2`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Bills To
              </Text>
              <TextInput
                style={[
                  tw`border border-gray-200 rounded-lg px-4 py-3`,
                  {
                    borderColor: colors.lightGrey,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
                placeholder="Enter customer name"
                placeholderTextColor={colors.greyText}
                value={invoiceDetails.billsTo}
                onChangeText={(text) =>
                  setInvoiceDetails({ ...invoiceDetails, billsTo: text })
                }
              />
            </View>
          </View>

          {/* Recipient Email */}
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
              Recipient Email
            </Text>
            <TextInput
              style={[
                tw`border border-gray-200 rounded-lg px-4 py-3`,
                {
                  borderColor: colors.lightGrey,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
              placeholder="Enter customer phone number"
              placeholderTextColor={colors.greyText}
              value={invoiceDetails.recipientEmail}
              onChangeText={(text) =>
                setInvoiceDetails({ ...invoiceDetails, recipientEmail: text })
              }
              keyboardType="email-address"
            />
          </View>

          {/* Bill Title/Project Description */}
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
              Bill Title/Project Description
            </Text>
            <TextInput
              style={[
                tw`border border-gray-200 rounded-lg px-4 py-3`,
                {
                  borderColor: colors.lightGrey,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
              placeholder="Enter customer phone number"
              placeholderTextColor={colors.greyText}
              value={invoiceDetails.billTitle}
              onChangeText={(text) =>
                setInvoiceDetails({ ...invoiceDetails, billTitle: text })
              }
            />
          </View>

          {/* Issued On & Due On */}
          <View style={tw`flex-row gap-4`}>
            <View style={tw`flex-1`}>
              <Text
                style={[
                  tw`text-sm font-medium mb-2`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Issued on
              </Text>
              <TouchableOpacity
                style={[
                  tw`border border-gray-200 rounded-lg px-4 py-3 flex-row items-center`,
                  {
                    borderColor: colors.lightGrey,
                  },
                ]}
                onPress={() => console.log('Open date picker for issued date')}
              >
                <Calendar size={19} color={colors.greyText} />
              </TouchableOpacity>
            </View>
            <View style={tw`flex-1`}>
              <Text
                style={[
                  tw`text-sm font-medium mb-2`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Due on
              </Text>
              <TouchableOpacity
                style={[
                  tw`border border-gray-200 rounded-lg px-4 py-3 flex-row items-center`,
                  {
                    borderColor: colors.lightGrey,
                  },
                ]}
                onPress={() => console.log('Open date picker for due date')}
              >
                <Calendar size={19} color={colors.greyText} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Invoice Items Section */}
        <View style={tw`mb-8`}>
          <Text
            style={[
              tw`text-base font-bold mb-6`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            Invoice Items
          </Text>

          {/* Currency */}
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
              Currency
            </Text>
            <TouchableOpacity
              style={[
                tw`border border-gray-200 rounded-lg px-4 py-3 flex-row items-center justify-between`,
                {
                  borderColor: colors.lightGrey,
                },
              ]}
              onPress={() => console.log('Open currency picker')}
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
                {invoiceDetails.currency}
              </Text>
              <ChevronDown size={16} color={colors.greyText} />
            </TouchableOpacity>
          </View>

          {/* Invoice Items */}
          <View style={tw`rounded-lg border border-gray-200 p-4`}>
            {/* Existing Items */}
            {invoiceItems.map((item, index) => (
              <View key={item.id} style={tw`flex-row gap-2 mb-4`}>
                <TextInput
                  style={[
                    tw`flex-1 border border-gray-200 rounded-lg px-3 py-4`,
                    {
                      borderColor: colors.lightGrey,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                  placeholder="Item Name"
                  placeholderTextColor={colors.greyText}
                  value={item.name}
                  onChangeText={(text) =>
                    handleUpdateItem(item.id, 'name', text)
                  }
                />
                <TextInput
                  style={[
                    tw`w-[70px] border border-gray-200 rounded-lg px-3 py-4 text-center`,
                    {
                      borderColor: colors.lightGrey,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                  placeholder="Count"
                  placeholderTextColor={colors.greyText}
                  value={item.quantity.toString()}
                  onChangeText={(text) =>
                    handleUpdateItem(item.id, 'quantity', text)
                  }
                  keyboardType="numeric"
                />
                <TextInput
                  style={[
                    tw`w-[111px] border border-gray-200 rounded-lg px-3 py-4`,
                    {
                      borderColor: colors.lightGrey,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                  placeholder="$ Amount"
                  placeholderTextColor={colors.greyText}
                  value={item.amount}
                  onChangeText={(text) =>
                    handleUpdateItem(item.id, 'amount', text)
                  }
                  keyboardType="numeric"
                />
              </View>
            ))}

            {/* Add New Item Button */}
            <TouchableOpacity
              onPress={handleAddNewItem}
              style={[
                tw`bg-gray-50 rounded-lg px-3 py-4 flex-row items-center justify-center`,
                {
                  backgroundColor: colors.backgroundGrey,
                },
              ]}
            >
              <Plus size={16} color={colors.complimentary} />
              <Text
                style={[
                  tw`text-xs font-bold ml-2`,
                  {
                    color: colors.complimentary,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Add new item
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Spacing for Button */}
        <View style={tw`h-20`} />
      </ScrollView>

      {/* Send Invoice Button */}
      <View style={tw`px-6 pb-8`}>
        <TouchableOpacity
          onPress={handleSendInvoice}
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
            Send Invoice
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateInvoiceScreen;
