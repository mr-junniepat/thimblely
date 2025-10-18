import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import tw from 'twrnc';
import { ChevronLeft, Building, MapPin, Plus } from 'lucide-react-native';
import { faker } from '@faker-js/faker';
import {
  Chip,
  FloatingButton,
  SearchBar,
  AddClientModal,
} from '../../components';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  backgroundWhite: '#FAFAFA',
  success: '#34C759',
  warning: '#FBBC04',
  error: '#FF383C',
  lightGrey: '#F5F5F7',
};

interface Client {
  id: string;
  name: string;
  company: string;
  location: string;
  avatar: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Active' | 'Prospect' | 'Inactive';
  orders: number;
  revenue: string;
}

// Mock data matching Figma exactly
const clients: Client[] = [
  {
    id: '1',
    name: 'Sola David',
    company: 'JumpLLC',
    location: 'Chicago, IL',
    avatar: faker.image.avatar(),
    priority: 'High',
    status: 'Active',
    orders: 2,
    revenue: '$40.0k',
  },
  {
    id: '2',
    name: 'Sola David',
    company: 'JumpLLC',
    location: 'Chicago, IL',
    avatar: faker.image.avatar(),
    priority: 'High',
    status: 'Active',
    orders: 2,
    revenue: '$40.0k',
  },
  {
    id: '3',
    name: 'Emma Thompson',
    company: 'No Company',
    location: 'Chicago, IL',
    avatar: faker.image.avatar(),
    priority: 'High',
    status: 'Prospect',
    orders: 2,
    revenue: '$40.0k',
  },
  {
    id: '4',
    name: 'Emma Thompson',
    company: 'No Company',
    location: 'Chicago, IL',
    avatar: faker.image.avatar(),
    priority: 'High',
    status: 'Prospect',
    orders: 2,
    revenue: '$40.0k',
  },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'prospect', label: 'Prospect' },
  { id: 'inactive', label: 'Inactive' },
];

export default function ClientCrmScreen({ navigation }: any) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddClientModal, setShowAddClientModal] = useState(false);

  const handleCategoryPress = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
  }, []);

  const handleAddClient = useCallback((clientData: any) => {
    // TODO: Implement add client logic (e.g., add to clients list, API call)
    console.log('Adding new client:', clientData);
    // For now, just close the modal
    setShowAddClientModal(false);
  }, []);

  const filteredClients = useMemo(() => {
    let filtered = clients;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(
        (client) => client.status.toLowerCase() === activeCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (client) =>
          client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [activeCategory, searchQuery]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return colors.error;
      case 'Medium':
        return colors.warning;
      case 'Low':
        return colors.success;
      default:
        return colors.greyText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return colors.success;
      case 'Prospect':
        return colors.warning;
      case 'Inactive':
        return colors.greyText;
      default:
        return colors.greyText;
    }
  };

  const renderClientCard = useCallback(
    ({ item }: { item: Client }) => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ClientDetail', { clientId: item.id })
        }
        style={[
          tw`flex-row py-4`,
          {
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(0,0,0,0.1)',
            gap: 24,
          },
        ]}
      >
        {/* Avatar - 50px as per Figma */}
        <Image
          source={{ uri: item.avatar }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
          }}
          resizeMode="cover"
        />

        {/* Client Info */}
        <View style={[tw`flex-1`, { gap: 12 }]}>
          {/* Name and Priority */}
          <View style={tw`flex-row items-center justify-between`}>
            <Text
              style={[
                tw`text-sm font-medium`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              {item.name}
            </Text>
            <View
              style={[
                tw`px-3 py-1 rounded-full`,
                {
                  backgroundColor: `${getPriorityColor(item.priority)}20`,
                },
              ]}
            >
              <Text
                style={[
                  {
                    fontSize: 10, // Exact Figma size
                    color: getPriorityColor(item.priority),
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {item.priority}
              </Text>
            </View>
          </View>

          {/* Company and Location */}
          <View style={[tw`flex-row items-center`, { gap: 9 }]}>
            <View style={[tw`flex-row items-center`, { gap: 4 }]}>
              <Building size={16} color={colors.black} />
              <Text
                style={[
                  tw`text-xs`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {item.company}
              </Text>
            </View>
            <View style={[tw`flex-row items-center`, { gap: 8 }]}>
              <MapPin size={16} color={colors.greyText} />
              <Text
                style={[
                  tw`text-xs`,
                  {
                    color: colors.greyText,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {item.location}
              </Text>
            </View>
          </View>

          {/* Stats */}
          <View style={tw`flex-row items-center justify-between`}>
            {/* Orders */}
            <View style={tw`items-center`}>
              <Text
                style={[
                  tw`text-xs text-center`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {item.orders}
              </Text>
              <Text
                style={[
                  {
                    fontSize: 10, // Exact Figma size
                    color: colors.greyText,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Orders
              </Text>
            </View>

            {/* Revenue */}
            <View style={tw`items-center`}>
              <Text
                style={[
                  tw`text-xs text-center`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {item.revenue}
              </Text>
              <Text
                style={[
                  {
                    fontSize: 10, // Exact Figma size
                    color: colors.greyText,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Revenue
              </Text>
            </View>

            {/* Status */}
            <View style={tw`items-center`}>
              <Text
                style={[
                  tw`text-xs text-center font-bold`,
                  {
                    color: getStatusColor(item.status),
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {item.status}
              </Text>
              <Text
                style={[
                  {
                    fontSize: 10, // Exact Figma size
                    color: colors.greyText,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Status
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [navigation]
  );

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Status Bar Space */}
      <View style={tw`h-12`} />

      {/* Header - Exact Figma positioning */}
      <View style={[tw`px-6 py-4 flex-row items-center`, { gap: 19 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={colors.black} />
        </TouchableOpacity>
        <Text
          style={[
            tw`text-base font-normal`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
              letterSpacing: -0.64, // Exact Figma tracking
            },
          ]}
        >
          Client Management
        </Text>
      </View>

      <View style={[tw`px-6`, { gap: 24 }]}>
        {/* Search Bar */}
        <SearchBar
          placeholder="Search clients..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          containerStyle={tw`px-0 mb-0`}
          showFilter={true}
          onFilterPress={() => console.log('Filter pressed')}
        />

        {/* Category Chips - Using Chip component */}
        <View
          style={[
            tw`flex-row items-center p-1 rounded-full`,
            {
              gap: 12, // Exact Figma spacing
            },
          ]}
        >
          {categories.map((category) => (
            <Chip
              key={category.id}
              label={category.label}
              active={activeCategory === category.id}
              onPress={() => handleCategoryPress(category.id)}
              size="small"
            />
          ))}
        </View>
      </View>

      {/* Clients List */}
      <View style={[tw`px-6 mt-4 flex-1`, { gap: 24 }]}>
        <Text
          style={[
            tw`text-base font-bold`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
              letterSpacing: -0.64, // Exact Figma tracking
            },
          ]}
        >
          Clients ({filteredClients.length})
        </Text>

        <FlatList
          data={filteredClients}
          renderItem={renderClientCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>

      {/* Floating Add Button */}
      <FloatingButton
        onPress={() => setShowAddClientModal(true)}
        icon={Plus}
        iconSize={24}
        backgroundColor={colors.complimentary}
        size={56}
        bottom={111}
        right={24}
      />

      {/* Add Client Modal */}
      <AddClientModal
        visible={showAddClientModal}
        onClose={() => setShowAddClientModal(false)}
        onAddClient={handleAddClient}
      />
    </View>
  );
}
