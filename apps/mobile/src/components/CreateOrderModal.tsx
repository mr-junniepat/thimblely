import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import tw from 'twrnc';
import { X, Search, Plus, ChevronDown, Package } from 'lucide-react-native';
import { SearchBar, Input } from '../components';
import OrderSuccessScreen from './OrderSuccessScreen';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  white: '#FFFFFF',
  lightGrey: '#F5F5F7',
};

interface Customer {
  id: string;
  name: string;
  avatar: string;
  previousOrders: number;
  email?: string;
  phone?: string;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

interface OrderDetails {
  orderNumber: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

interface CreateOrderModalProps {
  visible: boolean;
  onClose: () => void;
  onComplete: (orderData: any) => void;
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Sola David',
    avatar: 'https://via.placeholder.com/50x50/4A90E2/FFFFFF?text=SD',
    previousOrders: 23,
    email: 'soladavid@gmail.com',
    phone: '+234 8012345678',
  },
  {
    id: '2',
    name: 'Jessica Lee',
    avatar: 'https://via.placeholder.com/50x50/34C759/FFFFFF?text=JL',
    previousOrders: 15,
    email: 'jessicalee@gmail.com',
    phone: '+234 8023456789',
  },
  {
    id: '3',
    name: 'Mohammed Khan',
    avatar: 'https://via.placeholder.com/50x50/FBBC04/FFFFFF?text=MK',
    previousOrders: 30,
    email: 'mohammedkhan@gmail.com',
    phone: '+234 8034567890',
  },
];

const priorityOptions = [
  { id: 'low', label: 'Low' },
  { id: 'medium', label: 'Medium' },
  { id: 'high', label: 'High' },
  { id: 'urgent', label: 'Urgent' },
];

export default function CreateOrderModal({
  visible,
  onClose,
  onComplete,
}: CreateOrderModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    orderNumber: 'ORD-002987',
    dueDate: '10th September, 2025',
    priority: 'low',
  });
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    {
      id: '1',
      name: 'Tailored Suit',
      price: 200000,
      quantity: 2,
      total: 400000,
    },
  ]);
  const [depositAmount, setDepositAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [completedOrderData, setCompletedOrderData] = useState<any>(null);

  const filteredCustomers = mockCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    // Move to next step
    setCurrentStep(2);
  };

  const handleCreateNewCustomer = () => {
    // Move to next step for new customer
    setCurrentStep(2);
  };

  const handlePrioritySelect = (
    priority: 'low' | 'medium' | 'high' | 'urgent'
  ) => {
    setOrderDetails((prev) => ({ ...prev, priority }));
  };

  const calculateTotalAmount = () => {
    return orderItems.reduce((total, item) => total + item.total, 0);
  };

  const handleAddNewItem = () => {
    const newItem: OrderItem = {
      id: Date.now().toString(),
      name: '',
      price: 0,
      quantity: 1,
      total: 0,
    };
    setOrderItems([...orderItems, newItem]);
  };

  const handleAddFromInventory = () => {
    // TODO: Open inventory selection modal
    console.log('Add from inventory');
  };

  const handleUpdateItem = (id: string, field: keyof OrderItem, value: any) => {
    setOrderItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'price' || field === 'quantity') {
            updatedItem.total = updatedItem.price * updatedItem.quantity;
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: string) => {
    setOrderItems((items) => items.filter((item) => item.id !== id));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Prepare order data
    const orderData = {
      customer: selectedCustomer,
      orderDetails: orderDetails,
      orderItems: orderItems,
      totalAmount: calculateTotalAmount(),
      depositAmount: depositAmount,
      notes: notes,
      step: currentStep,
    };

    // Store completed order data and show success screen
    setCompletedOrderData(orderData);
    setShowSuccessScreen(true);

    // Call the parent callback
    onComplete(orderData);
  };

  const handleSuccessScreenClose = () => {
    setShowSuccessScreen(false);
    setCompletedOrderData(null);
    onClose();
  };

  const renderStepIndicator = () => {
    return (
      <View style={tw`flex-row items-center justify-between w-full px-6`}>
        {[1, 2, 3, 4].map((step, index) => (
          <View key={step} style={tw`items-center`}>
            <View
              style={[
                tw`w-8 h-8 rounded-full items-center justify-center`,
                {
                  backgroundColor:
                    step <= currentStep ? colors.complimentary : colors.white,
                  borderWidth: 1,
                  borderColor: `${colors.complimentary}50`,
                },
              ]}
            >
              <Text
                style={[
                  tw`text-xs font-medium`,
                  {
                    color: step <= currentStep ? colors.white : colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {step}
              </Text>
            </View>
            {index < 3 && (
              <View
                style={[
                  tw`h-px w-16 absolute top-4 left-8`,
                  {
                    backgroundColor: `${colors.complimentary}30`,
                  },
                ]}
              />
            )}
          </View>
        ))}
      </View>
    );
  };

  const renderStep1 = () => {
    return (
      <View style={tw`flex-1 px-6`}>
        {/* Header with overlapping avatars */}
        <View
          style={[
            tw`p-4 rounded-lg mb-6`,
            {
              backgroundColor: colors.complimentary,
            },
          ]}
        >
          <View style={tw`flex-row items-center justify-center mb-2`}>
            {mockCustomers.slice(0, 3).map((customer, index) => (
              <View
                key={customer.id}
                style={[
                  tw`w-8 h-8 rounded-full border-2 border-white`,
                  {
                    marginLeft: index > 0 ? -10 : 0,
                    zIndex: 3 - index,
                  },
                ]}
              >
                <Image
                  source={{ uri: customer.avatar }}
                  style={tw`w-full h-full rounded-full`}
                />
              </View>
            ))}
          </View>
          <Text
            style={[
              tw`text-sm font-bold text-center`,
              {
                color: colors.white,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            Add customers from existing client list
          </Text>
        </View>

        {/* Search Bar */}
        <View style={tw`mb-6`}>
          <SearchBar
            placeholder="Search client list"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Customer List */}
        <ScrollView
          style={tw`flex-1 mb-6`}
          showsVerticalScrollIndicator={false}
        >
          {filteredCustomers.map((customer) => (
            <TouchableOpacity
              key={customer.id}
              onPress={() => handleCustomerSelect(customer)}
              style={[
                tw`p-4 rounded-lg mb-4`,
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
              <View style={tw`flex-row items-center gap-4`}>
                <Image
                  source={{ uri: customer.avatar }}
                  style={tw`w-12 h-12 rounded-full`}
                />
                <View style={tw`flex-1`}>
                  <Text
                    style={[
                      tw`text-sm font-bold mb-2`,
                      {
                        color: colors.black,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    {customer.name}
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
                    {customer.previousOrders} previous orders
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Create New Customer Button */}
        <TouchableOpacity
          onPress={handleCreateNewCustomer}
          style={[
            tw`flex-row items-center justify-center gap-2 p-3 rounded-full`,
            {
              backgroundColor: `${colors.complimentary}20`,
            },
          ]}
        >
          <Plus size={16} color={colors.complimentary} />
          <Text
            style={[
              tw`text-sm`,
              {
                color: colors.complimentary,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            Create New Customer
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderStep2 = () => {
    return (
      <View style={tw`flex-1 px-6`}>
        {/* Step Title */}
        <Text
          style={[
            tw`text-base font-bold mb-6`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
              letterSpacing: -0.64,
            },
          ]}
        >
          Order Details
        </Text>

        {/* Order Number */}
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
            Order Number
          </Text>
          <View
            style={[
              tw`p-3 rounded-lg`,
              {
                backgroundColor: colors.lightGrey,
              },
            ]}
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
              {orderDetails.orderNumber}
            </Text>
          </View>
        </View>

        {/* Due Date */}
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
            Due Date
          </Text>
          <TouchableOpacity
            style={[
              tw`flex-row items-center justify-between p-3 rounded-lg border`,
              {
                borderColor: 'rgba(0,0,0,0.1)',
              },
            ]}
          >
            <Text
              style={[
                tw`text-sm`,
                {
                  color: colors.greyText,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              {orderDetails.dueDate}
            </Text>
            <ChevronDown size={16} color={colors.greyText} />
          </TouchableOpacity>
        </View>

        {/* Priority */}
        <View style={tw`mb-6`}>
          <Text
            style={[
              tw`text-sm font-medium mb-3`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            Priority
          </Text>
          <View style={tw`flex-row flex-wrap gap-2`}>
            {priorityOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => handlePrioritySelect(option.id as any)}
                style={[
                  tw`flex-1 p-3 rounded-lg border`,
                  {
                    backgroundColor:
                      orderDetails.priority === option.id
                        ? `${colors.complimentary}20`
                        : colors.white,
                    borderColor: 'rgba(0,0,0,0.1)',
                    minWidth: '45%',
                  },
                ]}
              >
                <Text
                  style={[
                    tw`text-sm text-center`,
                    {
                      color:
                        orderDetails.priority === option.id
                          ? colors.complimentary
                          : colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  };

  const renderStep3 = () => {
    return (
      <View style={tw`flex-1 px-6`}>
        {/* Step Title */}
        <Text
          style={[
            tw`text-base font-bold mb-6`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
              letterSpacing: -0.64,
            },
          ]}
        >
          Order Items
        </Text>

        {/* Order Items List */}
        <View style={tw`mb-6`}>
          {orderItems.map((item, index) => (
            <View key={item.id} style={tw`mb-6`}>
              {/* Item Name */}
              <View style={tw`mb-2`}>
                <Input
                  placeholder="Item Name"
                  value={item.name}
                  onChangeText={(text) =>
                    handleUpdateItem(item.id, 'name', text)
                  }
                  style={tw`p-4`}
                />
              </View>

              {/* Price, Quantity, Total Row */}
              <View style={tw`flex-row items-center gap-2`}>
                {/* Price */}
                <View style={tw`flex-1`}>
                  <Input
                    placeholder="Price"
                    value={
                      item.price > 0 ? `$${item.price.toLocaleString()}` : ''
                    }
                    onChangeText={(text) => {
                      const price = parseFloat(text.replace(/[$,]/g, '')) || 0;
                      handleUpdateItem(item.id, 'price', price);
                    }}
                    style={tw`p-4 text-center`}
                  />
                </View>

                {/* Multiplication Symbol */}
                <Text
                  style={[
                    tw`text-sm font-bold`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  ×
                </Text>

                {/* Quantity */}
                <View style={tw`w-16`}>
                  <Input
                    placeholder="Count"
                    value={item.quantity.toString()}
                    onChangeText={(text) => {
                      const quantity = parseInt(text) || 1;
                      handleUpdateItem(item.id, 'quantity', quantity);
                    }}
                    style={tw`p-4 text-center`}
                    keyboardType="numeric"
                  />
                </View>

                {/* Equals Symbol */}
                <Text
                  style={[
                    tw`text-sm font-bold`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  =
                </Text>

                {/* Total */}
                <View style={tw`flex-1`}>
                  <View
                    style={[
                      tw`p-4 rounded-lg border`,
                      {
                        backgroundColor: colors.lightGrey,
                        borderColor: 'rgba(0,0,0,0.1)',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        tw`text-sm text-center`,
                        {
                          color: colors.black,
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      ${item.total.toLocaleString()}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Add Item Buttons */}
        <View style={tw`flex-row gap-2 mb-6`}>
          {/* Add New Item */}
          <TouchableOpacity
            onPress={handleAddNewItem}
            style={[
              tw`flex-1 flex-row items-center justify-center p-4 rounded-lg`,
              {
                backgroundColor: colors.lightGrey,
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

          {/* Add from Inventory */}
          <TouchableOpacity
            onPress={handleAddFromInventory}
            style={[
              tw`flex-1 flex-row items-center justify-center p-4 rounded-lg`,
              {
                backgroundColor: `${colors.complimentary}20`,
              },
            ]}
          >
            <Package size={16} color={colors.complimentary} />
            <Text
              style={[
                tw`text-xs font-bold ml-2`,
                {
                  color: colors.complimentary,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Add from inventory
            </Text>
          </TouchableOpacity>
        </View>

        {/* Total Amount */}
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
            Total Amount
          </Text>
          <View
            style={[
              tw`p-6 rounded-lg`,
              {
                backgroundColor: colors.lightGrey,
              },
            ]}
          >
            <Text
              style={[
                tw`text-2xl font-bold text-center`,
                {
                  color: colors.complimentary,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              ${calculateTotalAmount().toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderStep4 = () => {
    return (
      <View style={tw`flex-1 px-6`}>
        {/* Step Title */}
        <Text
          style={[
            tw`text-base font-bold mb-6`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
              letterSpacing: -0.64,
            },
          ]}
        >
          Order Details
        </Text>

        {/* Customer Information */}
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
                {selectedCustomer?.name || 'Januarius Matthew'}
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
                {selectedCustomer?.email || 'januariusmathew@gmail.com'}
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
                {selectedCustomer?.phone || '+234 8043558374'}
              </Text>
            </View>
          </View>
        </View>

        {/* Order Detail */}
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
            Order Detail
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
                Order Number :
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
                #{orderDetails.orderNumber.split('-')[1]}
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
                Due date :
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
                {orderDetails.dueDate}
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
                    color:
                      orderDetails.priority === 'high'
                        ? '#DC1E38'
                        : colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {orderDetails.priority.charAt(0).toUpperCase() +
                  orderDetails.priority.slice(1)}
              </Text>
            </View>
          </View>
        </View>

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
          {orderItems.map((item, index) => (
            <Text
              key={item.id}
              style={[
                tw`text-sm`,
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

        {/* Payment Section */}
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
            Payment
          </Text>

          {/* Deposit Amount */}
          <View style={tw`mb-4`}>
            <Text
              style={[
                tw`text-sm font-medium mb-2`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Deposit Amount
            </Text>
            <Input
              placeholder="Enter deposit amount"
              value={depositAmount}
              onChangeText={setDepositAmount}
              style={tw`p-4`}
              keyboardType="numeric"
            />
          </View>

          {/* Notes */}
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
              Notes (Optional)
            </Text>
            <Input
              placeholder="Add any additional notes..."
              value={notes}
              onChangeText={setNotes}
              style={tw`p-4`}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="overFullScreen"
      transparent={true}
    >
      <View style={tw`flex-1 bg-black bg-opacity-30`}>
        <View
          style={[
            tw`flex-1 bg-white rounded-t-lg mt-20`,
            {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            },
          ]}
        >
          {/* Header */}
          <View
            style={tw`flex-row items-center justify-between p-6 border-b border-gray-200`}
          >
            <TouchableOpacity onPress={onClose}>
              <X size={24} color={colors.black} />
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
              Create Order
            </Text>
            <View style={tw`w-6`} />
          </View>

          {/* Step Indicator */}
          <View style={tw`py-6`}>{renderStepIndicator()}</View>

          {/* Step Content */}
          <View style={tw`flex-1`}>{renderCurrentStep()}</View>

          {/* Navigation Buttons */}
          <View
            style={tw`flex-row justify-between p-6 border-t border-gray-200`}
          >
            <TouchableOpacity
              onPress={currentStep === 1 ? onClose : handlePrevious}
              style={[
                tw`px-6 py-3 rounded-full`,
                {
                  backgroundColor: colors.lightGrey,
                },
              ]}
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
                {currentStep === 1 ? 'Cancel' : 'Previous'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={currentStep === 4 ? handleComplete : handleNext}
              style={[
                tw`px-6 py-3 rounded-full`,
                {
                  backgroundColor: colors.complimentary,
                },
              ]}
            >
              <Text
                style={[
                  tw`text-sm font-medium`,
                  {
                    color: colors.white,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {currentStep === 4 ? 'Complete' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Success Screen */}
      <OrderSuccessScreen
        visible={showSuccessScreen}
        onClose={handleSuccessScreenClose}
        orderData={completedOrderData}
      />
    </Modal>
  );
}
