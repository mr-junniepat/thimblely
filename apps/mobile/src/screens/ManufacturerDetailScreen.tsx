import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
// Import colors directly from the source file
const colors = {
  complimentary: '#A30552',
  complimentaryDark: '#56062D',
  greyText: '#68666F',
  black: '#111113',
  categoryColor: '#354D0C',
  categoryBgColor: 'rgba(170,237,59,0.09)',
};
import tw from 'twrnc';
import { ArrowLeft, Star, MapPin } from 'lucide-react-native';
import { faker } from '@faker-js/faker';
import { LinearGradient } from 'expo-linear-gradient';

interface ManufacturerDetailScreenProps {
  route: any;
  navigation: any;
}

export default function ManufacturerDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { manufacturer } = route.params as { manufacturer: any };

  if (!manufacturer) return null;

  // Mock data for additional images
  const additionalImages = Array.from({ length: 3 }, (_, i) => ({
    id: (i + 1).toString(),
    image: faker.image.urlPicsumPhotos({ width: 80, height: 80 }),
  }));

  // Mock data for similar products
  const similarProducts = Array.from({ length: 2 }, (_, i) => ({
    id: (i + 1).toString(),
    name: 'Industrial Sewing Machine',
    image: faker.image.urlPicsumPhotos({ width: 185, height: 160 }),
    rating: { score: 4.8, count: 2345 },
    location: 'Chicago, IL',
    price: 2339,
    originalPrice: 5339,
  }));

  // Mock seller information
  const seller = {
    name: 'Marcus Rodriguez',
    avatar: faker.image.avatar(),
    category: 'Sewing Expert',
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Status Bar Space */}
      <View style={tw`h-12`} />

      {/* Header with Back Button */}
      <View
        style={{
          paddingHorizontal: 24,
          paddingVertical: 16,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginRight: 16 }}
        >
          <ArrowLeft size={24} color={colors.black} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Product Images Section */}
        <View
          style={{
            paddingHorizontal: 24,
            marginBottom: 31,
          }}
        >
          {/* Main Product Image */}
          <View
            style={{
              height: 160,
              borderRadius: 5,
              backgroundColor: '#D9D9D9',
              marginBottom: 16,
              overflow: 'hidden',
            }}
          >
            <Image
              source={{ uri: manufacturer.image }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>

          {/* Additional Images */}
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {additionalImages.map((img) => (
              <View
                key={img.id}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 5,
                  backgroundColor: '#D9D9D9',
                  overflow: 'hidden',
                }}
              >
                <Image
                  source={{ uri: img.image }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
              </View>
            ))}
          </View>

          {/* Product Details */}
          <View style={{ marginTop: 16, gap: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: colors.black,
                fontFamily: 'Outfit-Bold',
              }}
            >
              {manufacturer.name}
            </Text>

            {/* Price and Rating/Location */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: colors.complimentary,
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
                    fontFamily: 'Outfit-Regular',
                  }}
                >
                  ${manufacturer.originalPrice.toLocaleString()}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', gap: 12 }}>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
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
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
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
            </View>
          </View>

          {/* Contact Seller Button */}
          <TouchableOpacity
            style={{
              backgroundColor: colors.complimentary,
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 32,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 16,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: 'white',
                fontFamily: 'Outfit-Regular',
              }}
            >
              Contact Seller
            </Text>
          </TouchableOpacity>
        </View>

        {/* Description Section */}
        <View
          style={{
            paddingHorizontal: 24,
            marginBottom: 32,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: colors.black,
              marginBottom: 16,
              fontFamily: 'Outfit-Bold',
            }}
          >
            Description
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: colors.black,
              fontFamily: 'Outfit-Regular',
            }}
          >
            Lorem ipsum dolor sit amet consectetur. Lectus tortor quam amet
            tempus a sit.
          </Text>
        </View>

        {/* Details Section */}
        <View
          style={{
            paddingHorizontal: 24,
            marginBottom: 32,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: colors.black,
              marginBottom: 16,
              fontFamily: 'Outfit-Bold',
            }}
          >
            Details
          </Text>
          <View style={{ gap: 16 }}>
            <View style={{ flexDirection: 'row', gap: 16 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: colors.greyText,
                  fontFamily: 'Outfit-Regular',
                }}
              >
                Condition
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: colors.black,
                  fontFamily: 'Outfit-Regular',
                }}
              >
                Brand New
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 16 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: colors.greyText,
                  fontFamily: 'Outfit-Regular',
                }}
              >
                Color
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: colors.black,
                  fontFamily: 'Outfit-Regular',
                }}
              >
                Grey
              </Text>
            </View>
          </View>
        </View>

        {/* Seller Information Section */}
        <View
          style={{
            paddingHorizontal: 24,
            marginBottom: 32,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: colors.black,
              marginBottom: 16,
              fontFamily: 'Outfit-Bold',
            }}
          >
            Sellers Information
          </Text>
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <Image
              source={{ uri: seller.avatar }}
              style={{ width: 49, height: 49, borderRadius: 24.5 }}
            />
            <View style={{ flex: 1, gap: 8 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: colors.black,
                  fontFamily: 'Outfit-Regular',
                }}
              >
                {seller.name}
              </Text>
              <View
                style={{
                  backgroundColor: seller.categoryBgColor,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 32,
                  alignSelf: 'flex-start',
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '400',
                    color: seller.categoryColor,
                    fontFamily: 'Outfit-Regular',
                  }}
                >
                  {seller.category}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Similar Products Section */}
        <View
          style={{
            paddingHorizontal: 24,
            marginBottom: 32,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '700',
              color: colors.black,
              marginBottom: 16,
              fontFamily: 'Outfit-Bold',
            }}
          >
            Similar Products
          </Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {similarProducts.map((product) => (
              <View key={product.id} style={{ flex: 1, gap: 12 }}>
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
                    source={{ uri: product.image }}
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
                    {product.name}
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
                        {product.rating.score}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '400',
                          color: colors.black,
                          fontFamily: 'Outfit-Regular',
                        }}
                      >
                        ({product.rating.count.toLocaleString()})
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
                        {product.location}
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
                      ${product.price.toLocaleString()}
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
                      ${product.originalPrice.toLocaleString()}
                    </Text>
                  </View>
                </View>

                {/* Contact Button */}
                <TouchableOpacity
                  style={{
                    backgroundColor: '#F5F5F7',
                    paddingHorizontal: 8,
                    paddingVertical: 12,
                    borderRadius: 32,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      color: colors.complimentary,
                      fontFamily: 'Outfit-Regular',
                    }}
                  >
                    Contact
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
