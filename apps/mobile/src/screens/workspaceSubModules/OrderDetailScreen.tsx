import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import tw from 'twrnc';
import { ArrowLeft, Trash2, Plus } from 'lucide-react-native';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  white: '#FFFFFF',
  lightGrey: '#F5F5F7',
  purple: '#682476',
  red: '#FF383C',
};

interface OrderDetailScreenProps {}

export default function OrderDetailScreen({}: OrderDetailScreenProps) {
  const navigation = useNavigation();
  const route = useRoute();

  // Mock order data - in real app, this would come from route params or API
  const orderData = {
    id: '002',
    status: 'Order Processing',
    items: [
      {
        name: 'Quality Shoe Sewing Leather',
        quantity: 2,
        price: 200000,
      },
    ],
    customer: {
      name: 'Januarius Matthew',
      email: 'no email',
      phone: '+234 8043558374',
    },
    orderDetails: {
      dueDate: '20th Oct 2025',
      priority: 'High',
      notes: 'notes here...',
    },
    payment: {
      paid: 20000,
      total: 200000,
      percentage: 10,
    },
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleDeleteOrder = () => {
    // TODO: Implement delete order functionality
    console.log('Delete order:', orderData.id);
  };

  const handleAddPayment = () => {
    // TODO: Implement add payment functionality
    console.log('Add payment for order:', orderData.id);
  };

  const handleUpdateStatus = () => {
    // TODO: Implement update status functionality
    console.log('Update status for order:', orderData.id);
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`h-12`} />
      {/* Header */}
      <View style={tw`px-6 py-6`}>
        <View style={tw`flex-row items-center justify-between`}>
          <TouchableOpacity onPress={handleBack}>
            <ArrowLeft size={24} color={colors.black} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDeleteOrder}
            style={[
              tw`flex-row items-center px-4 py-3 rounded-full`,
              {
                backgroundColor: colors.lightGrey,
              },
            ]}
          >
            <Trash2 size={16} color={colors.red} />
            <Text
              style={[
                tw`text-xs ml-2`,
                {
                  color: colors.red,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Delete Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Status Header */}
      <View style={tw`px-6 py-4 bg-white`}>
        <Text
          style={[
            tw`text-2xl font-bold mb-4`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          Order Number : #{orderData.id}
        </Text>

        <View style={tw`flex-row items-center`}>
          <Text
            style={[
              tw`text-sm mr-2`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            Status :
          </Text>
          <View style={tw`flex-row items-center`}>
            <View
              style={[
                tw`w-2.5 h-2.5 rounded-full mr-2`,
                {
                  backgroundColor: colors.purple,
                },
              ]}
            />
            <Text
              style={[
                tw`text-sm font-bold`,
                {
                  color: colors.purple,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              {orderData.status}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView style={tw`flex-1 px-6`} showsVerticalScrollIndicator={false}>
        {/* Divider */}
        <View
          style={[
            tw`h-px w-full mb-6`,
            {
              backgroundColor: colors.lightGrey,
            },
          ]}
        />

        {/* Order Items */}
        <View style={tw`mb-6`}>
          <Text
            style={[
              tw`text-base font-bold mb-4`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
                letterSpacing: -0.64,
              },
            ]}
          >
            Order Items
          </Text>
          {orderData.items.map((item, index) => (
            <Text
              key={index}
              style={[
                tw`text-sm font-medium`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              {item.name} x {item.quantity}
            </Text>
          ))}
        </View>

        {/* Divider */}
        <View
          style={[
            tw`h-px w-full mb-6`,
            {
              backgroundColor: colors.lightGrey,
            },
          ]}
        />

        {/* Customer */}
        <View style={tw`mb-6`}>
          <Text
            style={[
              tw`text-base font-bold mb-4`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
                letterSpacing: -0.64,
              },
            ]}
          >
            Customer
          </Text>
          <View style={tw`gap-4`}>
            <View style={tw`flex-row`}>
              <Text
                style={[
                  tw`text-sm`,
                  {
                    color: colors.greyText,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Name :
              </Text>
              <Text
                style={[
                  tw`text-sm font-medium ml-1`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {orderData.customer.name}
              </Text>
            </View>
            <View style={tw`flex-row`}>
              <Text
                style={[
                  tw`text-sm`,
                  {
                    color: colors.greyText,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Email :
              </Text>
              <Text
                style={[
                  tw`text-sm font-medium ml-1`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {orderData.customer.email}
              </Text>
            </View>
            <View style={tw`flex-row`}>
              <Text
                style={[
                  tw`text-sm`,
                  {
                    color: colors.greyText,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Phone Number :
              </Text>
              <Text
                style={[
                  tw`text-sm font-medium ml-1`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {orderData.customer.phone}
              </Text>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View
          style={[
            tw`h-px w-full mb-6`,
            {
              backgroundColor: colors.lightGrey,
            },
          ]}
        />

        {/* Order Details */}
        <View style={tw`mb-6`}>
          <Text
            style={[
              tw`text-base font-bold mb-4`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
                letterSpacing: -0.64,
              },
            ]}
          >
            Order Details
          </Text>
          <View style={tw`gap-4 mb-6`}>
            <View style={tw`flex-row`}>
              <Text
                style={[
                  tw`text-sm`,
                  {
                    color: colors.greyText,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Due Date :
              </Text>
              <Text
                style={[
                  tw`text-sm font-medium ml-1`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {orderData.orderDetails.dueDate}
              </Text>
            </View>
            <View style={tw`flex-row`}>
              <Text
                style={[
                  tw`text-sm`,
                  {
                    color: colors.greyText,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Priority :
              </Text>
              <Text
                style={[
                  tw`text-sm font-medium ml-1`,
                  {
                    color: colors.red,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {orderData.orderDetails.priority}
              </Text>
            </View>
            <View style={tw`flex-row`}>
              <Text
                style={[
                  tw`text-sm`,
                  {
                    color: colors.greyText,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Notes :
              </Text>
              <Text
                style={[
                  tw`text-sm font-medium ml-1`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {orderData.orderDetails.notes}
              </Text>
            </View>
          </View>

          {/* Payment Progress */}
          <View
            style={[
              tw`p-3 rounded`,
              {
                backgroundColor: colors.lightGrey,
              },
            ]}
          >
            <Text
              style={[
                tw`text-sm mb-4`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Amount Paid
            </Text>

            {/* Progress Bar */}
            <View
              style={[
                tw`h-2 rounded-full mb-4`,
                {
                  backgroundColor: '#D9D9D9',
                },
              ]}
            >
              <View
                style={[
                  tw`h-2 rounded-full`,
                  {
                    backgroundColor: colors.purple,
                    width: `${orderData.payment.percentage}%`,
                  },
                ]}
              />
            </View>

            {/* Payment Info */}
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text
                style={[
                  tw`text-sm`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                ${orderData.payment.paid.toLocaleString()} paid of{' '}
                <Text
                  style={[
                    tw`font-bold`,
                    {
                      color: colors.purple,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  ${orderData.payment.total.toLocaleString()}
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
                {orderData.payment.percentage}%
              </Text>
            </View>

            {/* Add Payment Button */}
            <TouchableOpacity
              onPress={handleAddPayment}
              style={[
                tw`flex-row items-center justify-center p-3 rounded-full`,
                {
                  backgroundColor: colors.white,
                },
              ]}
            >
              <Plus size={16} color={colors.complimentary} />
              <Text
                style={[
                  tw`text-sm font-bold ml-2`,
                  {
                    color: colors.complimentary,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Add Payment
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={tw`px-6 pb-6`}>
        <TouchableOpacity
          onPress={handleUpdateStatus}
          style={[
            tw`w-full py-4 rounded-full items-center`,
            {
              backgroundColor: colors.complimentary,
            },
          ]}
        >
          <Text
            style={[
              tw`text-sm`,
              {
                color: colors.white,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            Update Order Status
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
