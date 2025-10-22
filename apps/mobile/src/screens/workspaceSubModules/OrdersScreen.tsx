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
import {
  ChevronLeft,
  ShoppingCart,
  Package,
  Truck,
  CheckCircle,
  User,
  Calendar,
  Plus,
} from 'lucide-react-native';
import {
  SearchBar,
  Chip,
  FloatingButton,
  Toast,
  useToast,
  CreateOrderModal,
  StatCard,
} from '../../components';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  white: '#FFFFFF',
  lightGrey: '#F5F5F7',
  blue: '#1A73E8',
  yellow: '#FBBC04',
  purple: '#320C68',
  green: '#34C759',
  red: '#DC1E38',
  backgroundWhite: '#FAFAFA',
};

interface Order {
  id: string;
  orderNumber: string;
  title: string;
  description: string;
  customerName: string;
  orderDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: '#003',
    title: 'Quality Shoe Sewing Leather',
    description: 'Standard leather order for production',
    customerName: 'Sarah Song',
    orderDate: '23rd March, 2025',
    priority: 'high',
    status: 'pending',
  },
  {
    id: '2',
    orderNumber: '#004',
    title: 'Casual Sport Shoes',
    description: 'Order for lightweight fabric shoes',
    customerName: 'David Hackman',
    orderDate: '15th April, 2025',
    priority: 'medium',
    status: 'pending',
  },
  {
    id: '3',
    orderNumber: '#005',
    title: 'Summer Sandals',
    description: 'Bulk order for summer footwear',
    customerName: 'Emily Davis',
    orderDate: '10th May, 2025',
    priority: 'low',
    status: 'completed',
  },
];

const filterOptions = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'in-progress', label: 'In progress' },
  { id: 'completed', label: 'Completed' },
];

export default function OrdersScreen() {
  const navigation = useNavigation();
  const { showToast, toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);

  const filteredOrders = useMemo(() => {
    let filtered = mockOrders;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (order) =>
          order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (selectedFilter !== 'all') {
      filtered = filtered.filter((order) => order.status === selectedFilter);
    }

    return filtered;
  }, [searchQuery, selectedFilter]);

  const orderStats = useMemo(() => {
    const totalOrders = mockOrders.length;
    const pendingOrders = mockOrders.filter(
      (order) => order.status === 'pending'
    ).length;
    const inProgressOrders = mockOrders.filter(
      (order) => order.status === 'in-progress'
    ).length;
    const completedOrders = mockOrders.filter(
      (order) => order.status === 'completed'
    ).length;

    return {
      totalOrders,
      pendingOrders,
      inProgressOrders,
      completedOrders,
    };
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddOrder = () => {
    setShowCreateOrderModal(true);
  };

  const handleCloseCreateOrderModal = () => {
    setShowCreateOrderModal(false);
  };

  const handleCompleteOrder = (orderData: any) => {
    showToast('Order created successfully!', 'success', 3000);
    console.log('Order created:', orderData);
  };

  const handleOrderPress = (order: Order) => {
    // Navigate to order detail screen
    navigation.navigate('OrderDetail' as never, { order } as never);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return colors.red;
      case 'medium':
        return colors.yellow;
      case 'low':
        return colors.green;
      default:
        return colors.greyText;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'High';
      case 'medium':
        return 'Medium';
      case 'low':
        return 'Low';
      default:
        return priority;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return colors.green;
      case 'in-progress':
        return colors.purple;
      case 'pending':
        return colors.yellow;
      default:
        return colors.greyText;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'pending':
        return 'Pending';
      default:
        return status;
    }
  };

  const renderOrderCard = ({ item }: { item: Order }) => {
    const priorityColor = getPriorityColor(item.priority);
    const priorityLabel = getPriorityLabel(item.priority);
    const statusColor = getStatusColor(item.status);
    const statusLabel = getStatusLabel(item.status);

    return (
      <TouchableOpacity
        onPress={() => handleOrderPress(item)}
        style={[
          tw`p-3 rounded-lg mb-3`,
          {
            backgroundColor: colors.white,
            borderWidth: 0.5,
            borderColor: 'rgba(0,0,0,0.1)',
          },
        ]}
      >
        {/* Order Number and Priority */}
        <View style={tw`flex-row items-center justify-between mb-3`}>
          <Text
            style={[
              tw`text-sm`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            {item.orderNumber}
          </Text>
          <View
            style={[
              tw`px-3 py-1 rounded-full`,
              {
                backgroundColor: `${priorityColor}20`,
              },
            ]}
          >
            <Text
              style={[
                tw`text-xs`,
                {
                  color: priorityColor,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              {priorityLabel}
            </Text>
          </View>
        </View>

        {/* Order Title */}
        <Text
          style={[
            tw`text-sm font-medium mb-2`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          {item.title}
        </Text>

        {/* Order Description */}
        <Text
          style={[
            tw`text-xs mb-3`,
            {
              color: colors.greyText,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          {item.description}
        </Text>

        {/* Customer and Date Row */}
        <View style={tw`flex-row items-center justify-between`}>
          {/* Customer */}
          <View style={tw`flex-row items-center gap-1`}>
            <User size={16} color={colors.black} />
            <Text
              style={[
                tw`text-sm font-medium`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              {item.customerName}
            </Text>
          </View>

          {/* Date */}
          <View style={tw`flex-row items-center gap-1`}>
            <Calendar size={16} color={colors.greyText} />
            <Text
              style={[
                tw`text-sm font-medium`,
                {
                  color: colors.greyText,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              {item.orderDate}
            </Text>
          </View>
        </View>
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
            ORDERS
          </Text>
        </View>
      </View>

      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        {/* Main Content Container */}
        <View style={tw`px-6`}>
          {/* Orders Overview Section */}
          <View style={tw`mb-6`}>
            {/* First Row - Total Orders and Pending Orders */}
            <View style={tw`flex-row gap-2 mb-2`}>
              {/* Total Orders */}
              <View style={tw`flex-1`}>
                <StatCard
                  icon={ShoppingCart}
                  value={orderStats.totalOrders}
                  label="Total Orders"
                  color={colors.blue}
                  backgroundColor={colors.backgroundWhite}
                />
              </View>

              {/* Pending Orders */}
              <View style={tw`flex-1`}>
                <StatCard
                  icon={Package}
                  value={orderStats.pendingOrders}
                  label="Pending Orders"
                  color={colors.yellow}
                  backgroundColor={colors.backgroundWhite}
                />
              </View>
            </View>

            {/* Second Row - In Progress and Completed Orders */}
            <View style={tw`flex-row gap-2`}>
              {/* In Progress Orders */}
              <View style={tw`flex-1`}>
                <StatCard
                  icon={Truck}
                  value={orderStats.inProgressOrders}
                  label="In Progress"
                  color={colors.purple}
                  backgroundColor={colors.white}
                />
              </View>

              {/* Completed Orders */}
              <View style={tw`flex-1`}>
                <StatCard
                  icon={CheckCircle}
                  value={orderStats.completedOrders}
                  label="Completed Orders"
                  color={colors.green}
                  backgroundColor={colors.white}
                />
              </View>
            </View>
          </View>

          {/* Search and Filters Section */}
          <View style={tw`mb-6`}>
            {/* Search Bar */}
            <View style={tw`mb-6`}>
              <SearchBar
                placeholder="Search orders"
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

        {/* Orders List */}
        <View style={tw`px-6 mb-6`}>
          <FlatList
            data={filteredOrders}
            renderItem={renderOrderCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>

      {/* Floating Add Button */}
      <FloatingButton onPress={handleAddOrder} />

      {/* Toast Component */}
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        position={toast.position}
      />

      {/* Create Order Modal */}
      <CreateOrderModal
        visible={showCreateOrderModal}
        onClose={handleCloseCreateOrderModal}
        onComplete={handleCompleteOrder}
      />
    </View>
  );
}
