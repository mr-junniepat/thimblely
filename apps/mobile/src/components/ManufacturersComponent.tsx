import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Import colors directly from the source file
const colors = {
  complimentary: '#A30552',
  greyText: '#68666F',
  black: '#111113',
};
import tw from 'twrnc';
import { Home, Globe, Star, MapPin, ShoppingCart } from 'lucide-react-native';
import { faker } from '@faker-js/faker';
import Chip from './Chip';

// Generate mock manufacturer data matching Figma exactly
const manufacturers = Array.from({ length: 8 }, (_, i) => ({
  id: (i + 1).toString(),
  name: 'Industrial Sewing Machine',
  image: faker.image.urlPicsumPhotos({ width: 185, height: 160 }),
  rating: { score: 4.8, count: 2345 },
  location: 'Chicago, IL',
  price: 2339,
  originalPrice: 5339,
}));

const categories = ['All', 'Equipment', 'Fabrics', 'Leather'];

interface ManufacturersComponentProps {
  searchQuery: string;
}

export default function ManufacturersComponent({
  searchQuery,
}: ManufacturersComponentProps) {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [supplierType, setSupplierType] = useState('Local Suppliers');

  const filteredManufacturers = manufacturers.filter((manufacturer) => {
    const matchesCategory =
      activeCategory === 'All' ||
      manufacturer.name.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch =
      manufacturer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manufacturer.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleManufacturerPress = (manufacturer: any) => {
    navigation.navigate(
      'ManufacturerDetail' as never,
      { manufacturer } as never
    );
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Supplier Type Toggle */}
      <View
        style={{
          paddingHorizontal: 24,
          paddingTop: 16,
          marginBottom: 24,
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.05)',
            borderRadius: 32,
            padding: 4,
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            onPress={() => setSupplierType('Local Suppliers')}
            style={{
              flex: 1,
              backgroundColor:
                supplierType === 'Local Suppliers' ? '#FAFAFA' : 'transparent',
              borderRadius: 32,
              paddingHorizontal: 8,
              paddingVertical: 11,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <Home size={16} color={colors.complimentary} />
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: colors.complimentary,
                fontFamily: 'Outfit-Regular',
              }}
            >
              Local Suppliers
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSupplierType('International')}
            style={{
              flex: 1,
              backgroundColor:
                supplierType === 'International' ? '#FAFAFA' : 'transparent',
              borderRadius: 32,
              paddingHorizontal: 8,
              paddingVertical: 11,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <Globe size={16} color={colors.greyText} />
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: colors.greyText,
                fontFamily: 'Outfit-Regular',
              }}
            >
              International
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Filter Chips */}
      <View
        style={{
          paddingHorizontal: 24,
          marginBottom: 24,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            padding: 4,
            borderRadius: 32,
          }}
        >
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              active={activeCategory === category}
              onPress={() => setActiveCategory(category)}
              size="medium"
            />
          ))}
        </View>
      </View>

      {/* Available Supplies Section */}
      <View
        style={{
          paddingHorizontal: 24,
          marginBottom: 24,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: '400',
            color: colors.black,
            marginBottom: 24,
            fontFamily: 'Outfit-Regular',
          }}
        >
          Available Supplies
        </Text>

        {/* Manufacturers Grid - 2 columns */}
        <View style={{ gap: 12 }}>
          {/* Row 1 */}
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {filteredManufacturers.slice(0, 2).map((manufacturer) => (
              <TouchableOpacity
                key={manufacturer.id}
                onPress={() => handleManufacturerPress(manufacturer)}
                style={{
                  flex: 1,
                  gap: 12,
                }}
              >
                {/* Product Image */}
                <View
                  style={{
                    backgroundColor: '#D9D9D9',
                    height: 160,
                    borderRadius: 5,
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    source={{ uri: manufacturer.image }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                </View>

                {/* Product Details */}
                <View style={{ gap: 8 }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: colors.black,
                      fontFamily: 'Outfit-Regular',
                    }}
                  >
                    {manufacturer.name}
                  </Text>

                  {/* Rating and Location */}
                  <View style={{ flexDirection: 'row', gap: 12 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <Star size={16} color="#FBBC04" fill="#FBBC04" />
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '400',
                          color: colors.black,
                          fontFamily: 'Outfit-Regular',
                        }}
                      >
                        {manufacturer.rating.score}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '400',
                          color: colors.black,
                          fontFamily: 'Outfit-Regular',
                        }}
                      >
                        ({manufacturer.rating.count.toLocaleString()})
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <MapPin size={16} color={colors.greyText} />
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '400',
                          color: colors.greyText,
                          fontFamily: 'Outfit-Regular',
                        }}
                      >
                        {manufacturer.location}
                      </Text>
                    </View>
                  </View>

                  {/* Price */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: colors.black,
                        fontFamily: 'Outfit-Bold',
                      }}
                    >
                      ${manufacturer.price.toLocaleString()}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '400',
                        color: colors.greyText,
                        textDecorationLine: 'line-through',
                        flex: 1,
                        fontFamily: 'Outfit-Regular',
                      }}
                    >
                      ${manufacturer.originalPrice.toLocaleString()}
                    </Text>
                  </View>
                </View>

                {/* Buy Now Button */}
                <TouchableOpacity
                  style={{
                    backgroundColor: '#F5F5F7',
                    paddingHorizontal: 8,
                    paddingVertical: 12,
                    borderRadius: 32,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <ShoppingCart size={14} color={colors.complimentary} />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      color: colors.complimentary,
                      fontFamily: 'Outfit-Regular',
                    }}
                  >
                    Buy now
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>

          {/* Row 2 */}
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {filteredManufacturers.slice(2, 4).map((manufacturer) => (
              <TouchableOpacity
                key={manufacturer.id}
                onPress={() => handleManufacturerPress(manufacturer)}
                style={{
                  flex: 1,
                  gap: 12,
                }}
              >
                {/* Product Image */}
                <View
                  style={{
                    backgroundColor: '#D9D9D9',
                    height: 160,
                    borderRadius: 5,
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    source={{ uri: manufacturer.image }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                </View>

                {/* Product Details */}
                <View style={{ gap: 8 }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: colors.black,
                      fontFamily: 'Outfit-Regular',
                    }}
                  >
                    {manufacturer.name}
                  </Text>

                  {/* Rating and Location */}
                  <View style={{ flexDirection: 'row', gap: 12 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <Star size={16} color="#FBBC04" fill="#FBBC04" />
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '400',
                          color: colors.black,
                          fontFamily: 'Outfit-Regular',
                        }}
                      >
                        {manufacturer.rating.score}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '400',
                          color: colors.black,
                          fontFamily: 'Outfit-Regular',
                        }}
                      >
                        ({manufacturer.rating.count.toLocaleString()})
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <MapPin size={16} color={colors.greyText} />
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '400',
                          color: colors.greyText,
                          fontFamily: 'Outfit-Regular',
                        }}
                      >
                        {manufacturer.location}
                      </Text>
                    </View>
                  </View>

                  {/* Price */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: colors.black,
                        fontFamily: 'Outfit-Bold',
                      }}
                    >
                      ${manufacturer.price.toLocaleString()}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '400',
                        color: colors.greyText,
                        textDecorationLine: 'line-through',
                        flex: 1,
                        fontFamily: 'Outfit-Regular',
                      }}
                    >
                      ${manufacturer.originalPrice.toLocaleString()}
                    </Text>
                  </View>
                </View>

                {/* Buy Now Button */}
                <TouchableOpacity
                  style={{
                    backgroundColor: '#F5F5F7',
                    paddingHorizontal: 8,
                    paddingVertical: 12,
                    borderRadius: 32,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <ShoppingCart size={14} color={colors.complimentary} />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      color: colors.complimentary,
                      fontFamily: 'Outfit-Regular',
                    }}
                  >
                    Buy now
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>

          {/* Row 3 */}
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {filteredManufacturers.slice(4, 6).map((manufacturer) => (
              <TouchableOpacity
                key={manufacturer.id}
                onPress={() => handleManufacturerPress(manufacturer)}
                style={{
                  flex: 1,
                  gap: 12,
                }}
              >
                {/* Product Image */}
                <View
                  style={{
                    backgroundColor: '#D9D9D9',
                    height: 160,
                    borderRadius: 5,
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    source={{ uri: manufacturer.image }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                </View>

                {/* Product Details */}
                <View style={{ gap: 8 }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: colors.black,
                      fontFamily: 'Outfit-Regular',
                    }}
                  >
                    {manufacturer.name}
                  </Text>

                  {/* Rating and Location */}
                  <View style={{ flexDirection: 'row', gap: 12 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <Star size={16} color="#FBBC04" fill="#FBBC04" />
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '400',
                          color: colors.black,
                          fontFamily: 'Outfit-Regular',
                        }}
                      >
                        {manufacturer.rating.score}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '400',
                          color: colors.black,
                          fontFamily: 'Outfit-Regular',
                        }}
                      >
                        ({manufacturer.rating.count.toLocaleString()})
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <MapPin size={16} color={colors.greyText} />
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '400',
                          color: colors.greyText,
                          fontFamily: 'Outfit-Regular',
                        }}
                      >
                        {manufacturer.location}
                      </Text>
                    </View>
                  </View>

                  {/* Price */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: colors.black,
                        fontFamily: 'Outfit-Bold',
                      }}
                    >
                      ${manufacturer.price.toLocaleString()}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '400',
                        color: colors.greyText,
                        textDecorationLine: 'line-through',
                        flex: 1,
                        fontFamily: 'Outfit-Regular',
                      }}
                    >
                      ${manufacturer.originalPrice.toLocaleString()}
                    </Text>
                  </View>
                </View>

                {/* Buy Now Button */}
                <TouchableOpacity
                  style={{
                    backgroundColor: '#F5F5F7',
                    paddingHorizontal: 8,
                    paddingVertical: 12,
                    borderRadius: 32,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <ShoppingCart size={14} color={colors.complimentary} />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      color: colors.complimentary,
                      fontFamily: 'Outfit-Regular',
                    }}
                  >
                    Buy now
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>

          {/* Row 4 */}
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {filteredManufacturers.slice(6, 8).map((manufacturer) => (
              <TouchableOpacity
                key={manufacturer.id}
                onPress={() => handleManufacturerPress(manufacturer)}
                style={{
                  flex: 1,
                  gap: 12,
                }}
              >
                {/* Product Image */}
                <View
                  style={{
                    backgroundColor: '#D9D9D9',
                    height: 160,
                    borderRadius: 5,
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    source={{ uri: manufacturer.image }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                </View>

                {/* Product Details */}
                <View style={{ gap: 8 }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: colors.black,
                      fontFamily: 'Outfit-Regular',
                    }}
                  >
                    {manufacturer.name}
                  </Text>

                  {/* Rating and Location */}
                  <View style={{ flexDirection: 'row', gap: 12 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <Star size={16} color="#FBBC04" fill="#FBBC04" />
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '400',
                          color: colors.black,
                          fontFamily: 'Outfit-Regular',
                        }}
                      >
                        {manufacturer.rating.score}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '400',
                          color: colors.black,
                          fontFamily: 'Outfit-Regular',
                        }}
                      >
                        ({manufacturer.rating.count.toLocaleString()})
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <MapPin size={16} color={colors.greyText} />
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '400',
                          color: colors.greyText,
                          fontFamily: 'Outfit-Regular',
                        }}
                      >
                        {manufacturer.location}
                      </Text>
                    </View>
                  </View>

                  {/* Price */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: colors.black,
                        fontFamily: 'Outfit-Bold',
                      }}
                    >
                      ${manufacturer.price.toLocaleString()}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '400',
                        color: colors.greyText,
                        textDecorationLine: 'line-through',
                        flex: 1,
                        fontFamily: 'Outfit-Regular',
                      }}
                    >
                      ${manufacturer.originalPrice.toLocaleString()}
                    </Text>
                  </View>
                </View>

                {/* Buy Now Button */}
                <TouchableOpacity
                  style={{
                    backgroundColor: '#F5F5F7',
                    paddingHorizontal: 8,
                    paddingVertical: 12,
                    borderRadius: 32,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <ShoppingCart size={14} color={colors.complimentary} />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      color: colors.complimentary,
                      fontFamily: 'Outfit-Regular',
                    }}
                  >
                    Buy now
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
