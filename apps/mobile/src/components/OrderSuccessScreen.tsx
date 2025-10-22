import React, { useEffect, useState } from 'react';
import { View, Text, Image, Animated } from 'react-native';
import tw from 'twrnc';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  white: '#FFFFFF',
  lightGrey: '#F5F5F7',
};

interface OrderSuccessScreenProps {
  visible: boolean;
  onClose: () => void;
  orderData?: any;
}

export default function OrderSuccessScreen({
  visible,
  onClose,
  orderData,
}: OrderSuccessScreenProps) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [confettiAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      // Animate success screen entrance
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(confettiAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto close after 3 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  if (!visible) return null;

  return (
    <View style={tw`absolute inset-0 bg-white z-50`}>
      {/* Confetti Animation */}
      <Animated.View
        style={[
          tw`absolute inset-0`,
          {
            opacity: confettiAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
            transform: [
              {
                translateY: confettiAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-50, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Image
          source={require('../../../../libs/shared/src/images/success-confetti.png')}
          style={tw`w-full h-full`}
          resizeMode="cover"
        />
      </Animated.View>

      {/* Main Content */}
      <Animated.View
        style={[
          tw`flex-1 items-center justify-center px-6`,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Success Icon */}
        <View
          style={[
            tw`w-25 h-25 rounded-full items-center justify-center mb-6`,
            {
              backgroundColor: `${colors.complimentary}20`,
            },
          ]}
        >
          <Image
            source={require('../../../../libs/shared/src/images/package-delivered.png')}
            style={tw`w-16 h-16`}
            resizeMode="contain"
          />
        </View>

        {/* Success Message */}
        <View style={tw`items-center`}>
          <Text
            style={[
              tw`text-2xl font-bold text-center`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
                lineHeight: 32,
              },
            ]}
          >
            Order Created{'\n'}Successfully
          </Text>
        </View>

        {/* Order Details (if available) */}
        {orderData && (
          <View style={tw`mt-8 items-center`}>
            <Text
              style={[
                tw`text-sm text-center`,
                {
                  color: colors.greyText,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Order #
              {orderData.orderDetails?.orderNumber?.split('-')[1] || '002987'}
            </Text>
            <Text
              style={[
                tw`text-sm text-center mt-1`,
                {
                  color: colors.greyText,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Total: ${orderData.totalAmount?.toLocaleString() || '400,000'}
            </Text>
          </View>
        )}
      </Animated.View>
    </View>
  );
}
