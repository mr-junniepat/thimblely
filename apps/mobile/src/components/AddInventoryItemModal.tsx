import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';
import { X, ChevronDown } from 'lucide-react-native';
import { Input } from './index';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  white: '#FFFFFF',
  lightGrey: '#F5F5F7',
  purple: '#682476',
};

interface AddInventoryItemModalProps {
  visible: boolean;
  onClose: () => void;
  onAddItem: (itemData: any) => void;
}

const categories = [
  'Fabric',
  'Leather',
  'Thread',
  'Hardware',
  'Accessories',
  'Tools',
];

const unitOfMeasureOptions = [
  'Pieces',
  'Yards',
  'Meters',
  'Kg',
  'lbs',
  'Rolls',
];

export default function AddInventoryItemModal({
  visible,
  onClose,
  onAddItem,
}: AddInventoryItemModalProps) {
  const [formData, setFormData] = useState({
    itemName: '',
    sku: 'ITEM-002',
    description: '',
    category: '',
    currentStock: '',
    minStockLevel: '',
    costPrice: '',
    sellingPrice: '',
    unitOfMeasure: 'Pieces',
  });

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCategorySelect = (category: string) => {
    setFormData((prev) => ({ ...prev, category }));
    setShowCategoryDropdown(false);
  };

  const handleUnitSelect = (unit: string) => {
    setFormData((prev) => ({ ...prev, unitOfMeasure: unit }));
    setShowUnitDropdown(false);
  };

  const handleAddItem = () => {
    if (formData.itemName && formData.sku) {
      onAddItem(formData);
      // Reset form
      setFormData({
        itemName: '',
        sku: 'ITEM-002',
        description: '',
        category: '',
        currentStock: '',
        minStockLevel: '',
        costPrice: '',
        sellingPrice: '',
        unitOfMeasure: 'Pieces',
      });
      onClose();
    }
  };

  const generateSKU = () => {
    const randomNum = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');
    setFormData((prev) => ({ ...prev, sku: `ITEM-${randomNum}` }));
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="overFullScreen"
    >
      {/* Overlay */}
      <View
        style={[
          tw`flex-1 justify-end`,
          {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
        ]}
      >
        {/* Modal Content */}
        <View
          style={[
            tw`bg-white`,
            {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              maxHeight: '90%',
              minHeight: '80%',
            },
          ]}
        >
          {/* Header */}
          <View style={tw`flex-row items-center justify-between px-6 py-6`}>
            <View style={tw`flex-1`} />
            <Text
              style={[
                tw`text-base font-normal`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Add Inventory Item
            </Text>
            <View style={tw`flex-1 items-end`}>
              <TouchableOpacity onPress={onClose}>
                <X size={24} color={colors.black} />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`px-6 pb-6`}
            style={tw`flex-1`}
          >
            {/* Item Name */}
            <View style={tw`mb-6`}>
              <Text
                style={[
                  tw`text-sm font-bold mb-2`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Item Name
              </Text>
              <Input
                placeholder="Enter item name"
                value={formData.itemName}
                onChangeText={(value) => handleInputChange('itemName', value)}
                containerStyle={tw`px-0 mb-0`}
              />
            </View>

            {/* SKU */}
            <View style={tw`mb-6`}>
              <Text
                style={[
                  tw`text-sm font-bold mb-2`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Stock Keeping Unit (SKU)
              </Text>
              <View style={tw`flex-row gap-2`}>
                <View style={tw`flex-1`}>
                  <Input
                    placeholder="ITEM-002"
                    value={formData.sku}
                    onChangeText={(value) => handleInputChange('sku', value)}
                    containerStyle={tw`px-0 mb-0`}
                  />
                </View>
                <TouchableOpacity
                  onPress={generateSKU}
                  style={[
                    tw`px-4 py-3 rounded-lg`,
                    {
                      backgroundColor: colors.complimentary,
                    },
                  ]}
                >
                  <Text
                    style={[
                      tw`text-xs font-bold text-white`,
                      {
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    Auto generate
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Description */}
            <View style={tw`mb-6`}>
              <Text
                style={[
                  tw`text-sm font-bold mb-2`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Description
              </Text>
              <Input
                placeholder="Enter description"
                value={formData.description}
                onChangeText={(value) =>
                  handleInputChange('description', value)
                }
                multiline
                numberOfLines={3}
                containerStyle={tw`px-0 mb-0`}
                style={tw`min-h-[71px]`}
              />
            </View>

            {/* Category */}
            <View style={tw`mb-6`}>
              <Text
                style={[
                  tw`text-sm font-bold mb-2`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Category
              </Text>
              <TouchableOpacity
                onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
                style={[
                  tw`flex-row items-center justify-between px-4 py-3 rounded-lg border`,
                  {
                    borderColor: 'rgba(0,0,0,0.1)',
                  },
                ]}
              >
                <Text
                  style={[
                    tw`text-sm`,
                    {
                      color: formData.category ? colors.black : colors.greyText,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  {formData.category || 'Select Category'}
                </Text>
                <ChevronDown size={16} color={colors.greyText} />
              </TouchableOpacity>

              {/* Category Dropdown */}
              {showCategoryDropdown && (
                <View
                  style={[
                    tw`mt-2 rounded-lg border`,
                    {
                      backgroundColor: colors.white,
                      borderColor: 'rgba(0,0,0,0.1)',
                    },
                  ]}
                >
                  {categories.map((category) => (
                    <TouchableOpacity
                      key={category}
                      onPress={() => handleCategorySelect(category)}
                      style={tw`px-4 py-3 border-b border-gray-100`}
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
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Stock Information */}
            <View style={tw`mb-6`}>
              <Text
                style={[
                  tw`text-sm font-bold mb-4`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Stock Information
              </Text>
              <View style={tw`flex-row gap-2`}>
                <View style={tw`flex-1`}>
                  <Text
                    style={[
                      tw`text-sm mb-2`,
                      {
                        color: colors.black,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    Current Stock
                  </Text>
                  <Input
                    placeholder="0"
                    value={formData.currentStock}
                    onChangeText={(value) =>
                      handleInputChange('currentStock', value)
                    }
                    keyboardType="numeric"
                    containerStyle={tw`px-0 mb-0`}
                  />
                </View>
                <View style={tw`flex-1`}>
                  <Text
                    style={[
                      tw`text-sm mb-2`,
                      {
                        color: colors.black,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    Min Stock Level
                  </Text>
                  <Input
                    placeholder="0"
                    value={formData.minStockLevel}
                    onChangeText={(value) =>
                      handleInputChange('minStockLevel', value)
                    }
                    keyboardType="numeric"
                    containerStyle={tw`px-0 mb-0`}
                  />
                </View>
              </View>
            </View>

            {/* Unit of Measure */}
            <View style={tw`mb-6`}>
              <Text
                style={[
                  tw`text-sm font-bold mb-3`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Unit of Measure
              </Text>
              <View style={tw`flex-row flex-wrap gap-2`}>
                {unitOfMeasureOptions.map((unit) => (
                  <TouchableOpacity
                    key={unit}
                    onPress={() => handleUnitSelect(unit)}
                    style={[
                      tw`px-3 py-3 rounded-lg`,
                      {
                        backgroundColor:
                          formData.unitOfMeasure === unit
                            ? `${colors.complimentary}20`
                            : 'transparent',
                        borderWidth: 1,
                        borderColor:
                          formData.unitOfMeasure === unit
                            ? colors.complimentary
                            : 'rgba(0,0,0,0.1)',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        tw`text-sm`,
                        {
                          color:
                            formData.unitOfMeasure === unit
                              ? colors.complimentary
                              : colors.black,
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      {unit}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Pricing */}
            <View style={tw`mb-6`}>
              <Text
                style={[
                  tw`text-sm font-bold mb-4`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Pricing
              </Text>
              <View style={tw`flex-row gap-2`}>
                <View style={tw`flex-1`}>
                  <Text
                    style={[
                      tw`text-sm mb-2`,
                      {
                        color: colors.black,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    Cost Price
                  </Text>
                  <Input
                    placeholder="0"
                    value={formData.costPrice}
                    onChangeText={(value) =>
                      handleInputChange('costPrice', value)
                    }
                    keyboardType="numeric"
                    containerStyle={tw`px-0 mb-0`}
                  />
                </View>
                <View style={tw`flex-1`}>
                  <Text
                    style={[
                      tw`text-sm mb-2`,
                      {
                        color: colors.black,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    Selling Price
                  </Text>
                  <Input
                    placeholder="0"
                    value={formData.sellingPrice}
                    onChangeText={(value) =>
                      handleInputChange('sellingPrice', value)
                    }
                    keyboardType="numeric"
                    containerStyle={tw`px-0 mb-0`}
                  />
                </View>
              </View>
            </View>

            {/* Add Item Button */}
            <TouchableOpacity
              onPress={handleAddItem}
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
                Add Item
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
