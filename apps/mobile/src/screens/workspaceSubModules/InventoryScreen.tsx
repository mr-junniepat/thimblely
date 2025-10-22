import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Package, AlertTriangle, Plus } from 'lucide-react-native';
import {
  SearchBar,
  Chip,
  FloatingButton,
  Toast,
  useToast,
} from '../../components';
import AddInventoryItemModal from '../../components/AddInventoryItemModal';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  white: '#FFFFFF',
  lightGrey: '#F5F5F7',
  blue: '#1A73E8',
  red: '#FF383C',
  green: '#34C759',
  darkRed: '#DC1E38',
};

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  currentStock: number;
  minStockLevel: number;
  maxStockLevel: number;
  costPrice: number;
  sellingPrice: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

// Empty state for testing - uncomment to see empty state
// const mockInventoryItems: InventoryItem[] = [];

const mockInventoryItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Quality Shoe Sewing Leather',
    sku: 'ITEM-002',
    currentStock: 5,
    minStockLevel: 10,
    maxStockLevel: 80,
    costPrice: 25000,
    sellingPrice: 30000,
    status: 'low-stock',
  },
  {
    id: '2',
    name: 'Quality Shoe Sewing Leather',
    sku: 'ITEM-003',
    currentStock: 70,
    minStockLevel: 20,
    maxStockLevel: 80,
    costPrice: 15000,
    sellingPrice: 30000,
    status: 'in-stock',
  },
];

const filterOptions = [
  { id: 'all', label: 'All' },
  { id: 'in-stock', label: 'In Stock' },
  { id: 'low-stock', label: 'Low Stock' },
  { id: 'out-of-stock', label: 'Out of Stock' },
];

export default function InventoryScreen() {
  const navigation = useNavigation();
  const { showToast, toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredItems = useMemo(() => {
    let filtered = mockInventoryItems;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.sku.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (selectedFilter !== 'all') {
      filtered = filtered.filter((item) => item.status === selectedFilter);
    }

    return filtered;
  }, [searchQuery, selectedFilter]);

  const inventoryStats = useMemo(() => {
    const totalItems = mockInventoryItems.length;
    const lowStockItems = mockInventoryItems.filter(
      (item) => item.status === 'low-stock'
    ).length;

    return {
      totalItems,
      lowStockItems,
    };
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddItem = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const handleAddInventoryItem = (itemData: any) => {
    // Handle adding new inventory item
    console.log('Adding inventory item:', itemData);

    // Show success toast
    showToast('Inventory item added successfully!', 'success', 3000);

    setShowAddModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return colors.green;
      case 'low-stock':
        return colors.darkRed;
      case 'out-of-stock':
        return colors.red;
      default:
        return colors.greyText;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'In Stock';
      case 'low-stock':
        return 'Low Stock';
      case 'out-of-stock':
        return 'Out of Stock';
      default:
        return status;
    }
  };

  const handleItemPress = (item: InventoryItem) => {
    navigation.navigate('InventoryItemDetail' as never, { item } as never);
  };

  const renderInventoryItem = ({ item }: { item: InventoryItem }) => {
    const stockPercentage = (item.currentStock / item.maxStockLevel) * 100;
    const statusColor = getStatusColor(item.status);
    const statusLabel = getStatusLabel(item.status);

    return (
      <TouchableOpacity
        onPress={() => handleItemPress(item)}
        style={[
          tw`p-4 rounded-lg mb-4`,
          {
            backgroundColor: colors.white,
            borderWidth: 0.5,
            borderColor: 'rgba(0,0,0,0.1)',
          },
        ]}
      >
        {/* Item Name */}
        <Text
          style={[
            tw`text-sm font-medium mb-3`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          {item.name}
        </Text>

        {/* SKU and Status */}
        <View style={tw`flex-row items-center gap-3 mb-3`}>
          <Text
            style={[
              tw`text-sm`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            {item.sku}
          </Text>
          <View
            style={[
              tw`px-3 py-1 rounded-full`,
              {
                backgroundColor: `${statusColor}20`,
              },
            ]}
          >
            <Text
              style={[
                tw`text-xs`,
                {
                  color: statusColor,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              {statusLabel}
            </Text>
          </View>
        </View>

        {/* Stock Information */}
        <View style={tw`mb-3`}>
          <Text
            style={[
              tw`text-sm mb-2`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            Stock : {item.currentStock}/{item.maxStockLevel}
          </Text>

          {/* Progress Bar */}
          <View
            style={[
              tw`h-1 rounded-full`,
              {
                backgroundColor: '#D9D9D9',
              },
            ]}
          >
            <View
              style={[
                tw`h-1 rounded-full`,
                {
                  width: `${stockPercentage}%`,
                  backgroundColor: colors.complimentary,
                },
              ]}
            />
          </View>
        </View>

        {/* Price */}
        <Text
          style={[
            tw`text-base font-bold text-center`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          ${item.sellingPrice.toLocaleString()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Status Bar Space */}
      <View style={tw`h-12`} />

      {/* Header */}
      <View style={tw`px-6 py-6`}>
        <View style={tw`flex-row items-center gap-5`}>
          <TouchableOpacity onPress={handleBack}>
            <ChevronLeft size={24} color={colors.black} />
          </TouchableOpacity>
          <Text
            style={[
              tw`text-base font-bold`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
                letterSpacing: -0.64,
              },
            ]}
          >
            INVENTORY
          </Text>
        </View>
      </View>

      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        {/* Main Content Container - Exact Figma positioning: left-[24px] top-[130px] w-[382px] */}
        <View style={tw`px-6`}>
          {/* Inventory Overview Section - gap-[32px] from Figma */}
          <View style={tw`mb-8`}>
            <View
              style={[
                tw`p-4 rounded-lg`,
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
              {/* Header Row - gap-[24px] from Figma */}
              <View style={tw`flex-row items-center justify-between mb-6`}>
                <Text
                  style={[
                    tw`text-sm`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Inventory Overview
                </Text>
                <TouchableOpacity>
                  <Text
                    style={[
                      tw`text-xs`,
                      {
                        color: colors.complimentary,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    View all
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Stats Row - gap-[80px] from Figma */}
              <View style={tw`flex-row justify-between`}>
                {/* Total Items */}
                <View style={tw`items-center flex-1`}>
                  {/* Icon + Text Row - gap-[8px] from Figma */}
                  <View style={tw`flex-row items-center gap-2 mb-3`}>
                    <Package size={16} color={colors.blue} />
                    <Text
                      style={[
                        tw`text-sm`,
                        {
                          color: colors.blue,
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      Total Items
                    </Text>
                  </View>
                  {/* Numbers Row - gap-[4px] from Figma */}
                  <View style={tw`flex-row items-end gap-1`}>
                    <Text
                      style={[
                        tw`text-base`,
                        {
                          color: colors.black,
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      {inventoryStats.totalItems}
                    </Text>
                    <Text
                      style={[
                        tw`text-xs`,
                        {
                          color: colors.blue,
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      +0
                    </Text>
                  </View>
                </View>

                {/* Low Stock */}
                <View style={tw`items-center flex-1`}>
                  {/* Icon + Text Row - gap-[8px] from Figma */}
                  <View style={tw`flex-row items-center gap-2 mb-3`}>
                    <AlertTriangle size={16} color={colors.red} />
                    <Text
                      style={[
                        tw`text-sm`,
                        {
                          color: colors.red,
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      None
                    </Text>
                  </View>
                  {/* Numbers Row - gap-[4px] from Figma */}
                  <View style={tw`flex-row items-end gap-1`}>
                    <Text
                      style={[
                        tw`text-base`,
                        {
                          color: colors.black,
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      {inventoryStats.lowStockItems}
                    </Text>
                    <Text
                      style={[
                        tw`text-xs`,
                        {
                          color: colors.red,
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      Low Stock
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Search and Filters Section - gap-[24px] from Figma */}
          <View style={tw`mb-6`}>
            {/* Search Bar */}
            <View style={tw`mb-6`}>
              <SearchBar
                placeholder="Search inventory"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* Filter Chips Container */}
            <View style={tw`flex-row gap-3`}>
              {filterOptions.map((option) => (
                <Chip
                  key={option.id}
                  label={option.label}
                  active={selectedFilter === option.id}
                  onPress={() => setSelectedFilter(option.id)}
                  size="small"
                />
              ))}
            </View>
          </View>
        </View>

        {/* Items List - Exact Figma positioning: left-[24px] top-[421px] w-[382px] */}
        <View style={tw`px-6 mb-6`}>
          {/* Items Section Header */}
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
            Items
          </Text>

          {filteredItems.length > 0 ? (
            <FlatList
              data={filteredItems}
              renderItem={renderInventoryItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            /* Empty State - Exact Figma positioning: left-[calc(50%+0.5px)] top-[483px] translate-x-[-50%] */
            <View style={tw`items-center justify-center py-20`}>
              {/* Large Package Icon - 90px size from Figma */}
              <Package size={90} color={colors.greyText} />

              {/* Title and Subtitle */}
              <View style={tw`items-center mt-6 mb-6`}>
                <Text
                  style={[
                    tw`text-sm font-bold mb-2`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  No Inventory Items
                </Text>
                <Text
                  style={[
                    tw`text-sm`,
                    {
                      color: colors.greyText,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Start by adding your first inventory item
                </Text>
              </View>

              {/* Add First Item Button */}
              <TouchableOpacity
                onPress={handleAddItem}
                style={[
                  tw`flex-row items-center gap-2 px-4 py-3 rounded-full`,
                  {
                    backgroundColor: `${colors.complimentary}20`,
                  },
                ]}
              >
                <Plus size={16} color={colors.complimentary} />
                <Text
                  style={[
                    tw`text-xs`,
                    {
                      color: colors.complimentary,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Add First Item
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Floating Add Button */}
      <FloatingButton onPress={handleAddItem} />

      {/* Add Inventory Item Modal */}
      <AddInventoryItemModal
        visible={showAddModal}
        onClose={handleCloseModal}
        onAddItem={handleAddInventoryItem}
      />

      {/* Toast Component */}
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        position={toast.position}
      />
    </View>
  );
}
