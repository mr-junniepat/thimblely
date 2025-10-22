import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeft, Edit } from 'lucide-react-native';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  white: '#FFFFFF',
  lightGrey: '#F5F5F7',
  green: '#34C759',
  red: '#FF383C',
};

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  description: string;
  category: string;
  currentStock: number;
  minStockLevel: number;
  maxStockLevel: number;
  unitOfMeasure: string;
  costPrice: number;
  sellingPrice: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  lastUpdated: string;
  updatedBy: string;
}

interface StockActivity {
  id: string;
  type: 'in' | 'out';
  quantity: number;
  reason: string;
  date: string;
}

const mockItem: InventoryItem = {
  id: '1',
  name: 'Quality Shoe Sewing Leather',
  sku: 'ITEM-002',
  description: 'Description of product...',
  category: 'Materials',
  currentStock: 30,
  minStockLevel: 10,
  maxStockLevel: 80,
  unitOfMeasure: 'Meters',
  costPrice: 30000,
  sellingPrice: 60000,
  status: 'low-stock',
  lastUpdated: '23rd Sept 2025',
  updatedBy: 'Owner',
};

const mockStockActivity: StockActivity[] = [
  {
    id: '1',
    type: 'in',
    quantity: 20,
    reason: 'Purchase',
    date: '20th sept 2025',
  },
  {
    id: '2',
    type: 'out',
    quantity: 5,
    reason: 'Order Fulfillment',
    date: '9th sept 2025',
  },
];

export default function InventoryItemDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const item = route.params?.item || mockItem;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEdit = () => {
    // TODO: Navigate to edit screen
    console.log('Edit item:', item.id);
  };

  const handleRecordStockOut = () => {
    // TODO: Open stock out modal
    console.log('Record stock out for:', item.id);
  };

  const handleRecordStockIn = () => {
    // TODO: Open stock in modal
    console.log('Record stock in for:', item.id);
  };

  const renderStockActivity = (activity: StockActivity) => {
    const isStockIn = activity.type === 'in';
    const color = isStockIn ? colors.green : colors.red;
    const sign = isStockIn ? '+' : '-';

    return (
      <View key={activity.id}>
        <View style={tw`flex-row items-center justify-between mb-6`}>
          <Text style={tw`text-sm flex-1`}>
            <Text
              style={[
                tw`font-bold`,
                {
                  color: color,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              {sign} {activity.quantity} Pcs
            </Text>
            <Text
              style={[
                tw`text-sm`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              {' '}
              ({activity.reason})
            </Text>
          </Text>
          <Text
            style={[
              tw`text-sm`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            {activity.date}
          </Text>
        </View>
        {activity.id !== mockStockActivity[mockStockActivity.length - 1].id && (
          <View
            style={[
              tw`h-px mb-6`,
              {
                backgroundColor: 'rgba(0,0,0,0.1)',
              },
            ]}
          />
        )}
      </View>
    );
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Status Bar Space */}
      <View style={tw`h-12`} />

      {/* Header */}
      <View style={tw`px-6 py-4 flex-row items-center justify-between`}>
        <TouchableOpacity onPress={handleBack}>
          <ChevronLeft size={24} color={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleEdit}
          style={[
            tw`w-10 h-10 rounded-full items-center justify-center`,
            {
              backgroundColor: `${colors.complimentary}20`,
            },
          ]}
        >
          <Edit size={16} color={colors.complimentary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        <View style={tw`px-6`}>
          {/* Item Title Section */}
          <View style={tw`mb-6`}>
            <Text
              style={[
                tw`text-2xl font-bold mb-4`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              {item.name}
            </Text>
            <Text
              style={[
                tw`text-base`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                  letterSpacing: -0.64,
                },
              ]}
            >
              {item.sku}
            </Text>
          </View>

          {/* Divider */}
          <View
            style={[
              tw`h-px mb-6`,
              {
                backgroundColor: 'rgba(0,0,0,0.1)',
              },
            ]}
          />

          {/* Basic Information Section */}
          <View style={tw`mb-6`}>
            <Text
              style={[
                tw`text-base font-bold mb-6`,
                {
                  color: colors.complimentary,
                  fontFamily: 'Satoshi Variable',
                  letterSpacing: -0.64,
                },
              ]}
            >
              Basic Information
            </Text>

            <View style={tw`mb-4`}>
              <Text style={tw`text-sm`}>
                <Text
                  style={[
                    tw`text-sm`,
                    {
                      color: colors.greyText,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Description :
                </Text>
                <Text
                  style={[
                    tw`text-sm font-medium`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  {' '}
                  {item.description}
                </Text>
              </Text>
            </View>

            <View>
              <Text style={tw`text-sm`}>
                <Text
                  style={[
                    tw`text-sm`,
                    {
                      color: colors.greyText,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Category :
                </Text>
                <Text
                  style={[
                    tw`text-sm font-medium`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  {' '}
                  {item.category}
                </Text>
              </Text>
            </View>
          </View>

          {/* Stock & Pricing Section */}
          <View style={tw`mb-6`}>
            <Text
              style={[
                tw`text-base font-bold mb-6`,
                {
                  color: colors.complimentary,
                  fontFamily: 'Satoshi Variable',
                  letterSpacing: -0.64,
                },
              ]}
            >
              Stock & Pricing
            </Text>

            <View style={tw`flex-row justify-between`}>
              {/* Left Column */}
              <View style={tw`flex-1 mr-4`}>
                <View style={tw`mb-4`}>
                  <Text style={tw`text-sm`}>
                    <Text
                      style={[
                        tw`text-sm`,
                        {
                          color: colors.greyText,
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      Available in stock :
                    </Text>
                    <Text
                      style={[
                        tw`text-sm font-medium`,
                        {
                          color: colors.black,
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      {' '}
                      {item.currentStock}
                    </Text>
                  </Text>
                </View>

                <View>
                  <Text style={tw`text-sm`}>
                    <Text
                      style={[
                        tw`text-sm`,
                        {
                          color: colors.greyText,
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      Unit of Measure :
                    </Text>
                    <Text
                      style={[
                        tw`text-sm font-medium`,
                        {
                          color: colors.black,
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      {' '}
                      {item.unitOfMeasure}
                    </Text>
                  </Text>
                </View>
              </View>

              {/* Right Column */}
              <View style={tw`flex-1`}>
                <View style={tw`mb-4`}>
                  <Text style={tw`text-sm`}>
                    <Text
                      style={[
                        tw`text-sm`,
                        {
                          color: colors.greyText,
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      Cost Price :
                    </Text>
                    <Text
                      style={[
                        tw`text-sm font-medium`,
                        {
                          color: colors.black,
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      {' '}
                      ${item.costPrice.toLocaleString()}
                    </Text>
                  </Text>
                </View>

                <View>
                  <Text style={tw`text-sm`}>
                    <Text
                      style={[
                        tw`text-sm`,
                        {
                          color: colors.greyText,
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      Selling Price :
                    </Text>
                    <Text
                      style={[
                        tw`text-sm font-medium`,
                        {
                          color: colors.black,
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      {' '}
                      ${item.sellingPrice.toLocaleString()}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* History / Activity Section */}
          <View style={tw`mb-6`}>
            <Text
              style={[
                tw`text-base font-bold mb-6`,
                {
                  color: colors.complimentary,
                  fontFamily: 'Satoshi Variable',
                  letterSpacing: -0.64,
                },
              ]}
            >
              History / Activity
            </Text>

            <View style={tw`mb-6`}>
              <Text style={tw`text-sm`}>
                <Text
                  style={[
                    tw`text-sm`,
                    {
                      color: colors.greyText,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Last Updated :
                </Text>
                <Text
                  style={[
                    tw`text-sm font-medium`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  {' '}
                  {item.lastUpdated} by {item.updatedBy}
                </Text>
              </Text>
            </View>

            <View>
              <Text
                style={[
                  tw`text-sm mb-6`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Stock activity :
              </Text>

              {mockStockActivity.map(renderStockActivity)}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={tw`px-6 py-4 flex-row gap-2`}>
        <TouchableOpacity
          onPress={handleRecordStockOut}
          style={[
            tw`flex-1 py-4 rounded-full`,
            {
              backgroundColor: `${colors.complimentary}20`,
            },
          ]}
        >
          <Text
            style={[
              tw`text-sm text-center`,
              {
                color: colors.complimentary,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            Record Stock out
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleRecordStockIn}
          style={[
            tw`flex-1 py-4 rounded-full`,
            {
              backgroundColor: colors.complimentary,
            },
          ]}
        >
          <Text
            style={[
              tw`text-sm text-center font-bold text-white`,
              {
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            Record Stock-in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
