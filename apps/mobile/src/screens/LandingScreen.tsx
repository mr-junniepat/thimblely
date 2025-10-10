import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  ImageBackground,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@mobile/navigation';
import { colors } from '@thimblely/shared';
import { Button } from '@mobile/components/Button';
import tw from 'twrnc';
import {
  Scissors,
  Shirt,
  ShoppingBag,
  Watch,
  Sparkles,
  Crown,
  Heart,
  Star,
  Gem,
  Palette,
  Aperture,
  CircleDot,
} from 'lucide-react-native';

type LandingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Landing'>;
};

const { height } = Dimensions.get('window');

// Fashion-themed decorative icons scattered randomly across the screen
const decorativeIcons = [
  // Top section - scattered across width
  { Icon: Crown, top: 45, left: 25, rotation: '20deg', size: 42, opacity: 0.2 },
  {
    Icon: Scissors,
    top: 75,
    left: 280,
    rotation: '-15deg',
    size: 38,
    opacity: 0.15,
  },
  {
    Icon: Sparkles,
    top: 110,
    left: 150,
    rotation: '10deg',
    size: 28,
    opacity: 0.18,
  },
  {
    Icon: Watch,
    top: 135,
    left: 320,
    rotation: '25deg',
    size: 36,
    opacity: 0.16,
  },
  {
    Icon: CircleDot,
    top: 165,
    left: 70,
    rotation: '0deg',
    size: 26,
    opacity: 0.12,
  },

  // Upper section - more scattered
  {
    Icon: Shirt,
    top: 195,
    left: 200,
    rotation: '15deg',
    size: 48,
    opacity: 0.2,
  },
  {
    Icon: ShoppingBag,
    top: 235,
    left: 50,
    rotation: '-20deg',
    size: 40,
    opacity: 0.18,
  },
  {
    Icon: Star,
    top: 270,
    left: 300,
    rotation: '0deg',
    size: 32,
    opacity: 0.15,
  },
  {
    Icon: Heart,
    top: 310,
    left: 120,
    rotation: '30deg',
    size: 34,
    opacity: 0.17,
  },
  {
    Icon: Gem,
    top: 345,
    left: 260,
    rotation: '-25deg',
    size: 36,
    opacity: 0.16,
  },

  // Middle section - scattered
  {
    Icon: Palette,
    top: 390,
    left: 90,
    rotation: '15deg',
    size: 38,
    opacity: 0.14,
  },
  {
    Icon: CircleDot,
    top: 425,
    left: 220,
    rotation: '0deg',
    size: 24,
    opacity: 0.11,
  },
  {
    Icon: Scissors,
    top: 465,
    left: 340,
    rotation: '-10deg',
    size: 35,
    opacity: 0.15,
  },
  {
    Icon: Aperture,
    top: 505,
    left: 30,
    rotation: '20deg',
    size: 32,
    opacity: 0.13,
  },
  {
    Icon: Shirt,
    top: 545,
    left: 180,
    rotation: '25deg',
    size: 44,
    opacity: 0.19,
  },

  // Lower-middle section - scattered
  {
    Icon: Crown,
    top: 585,
    left: 310,
    rotation: '-15deg',
    size: 38,
    opacity: 0.16,
  },
  {
    Icon: CircleDot,
    top: 620,
    left: 140,
    rotation: '0deg',
    size: 28,
    opacity: 0.13,
  },
  {
    Icon: Sparkles,
    top: 655,
    left: 240,
    rotation: '10deg',
    size: 30,
    opacity: 0.14,
  },
  {
    Icon: Star,
    top: 690,
    left: 60,
    rotation: '-20deg',
    size: 34,
    opacity: 0.17,
  },

  // Bottom section - scattered
  {
    Icon: Heart,
    top: 730,
    left: 280,
    rotation: '15deg',
    size: 36,
    opacity: 0.15,
  },
  {
    Icon: ShoppingBag,
    top: 770,
    left: 110,
    rotation: '-10deg',
    size: 40,
    opacity: 0.18,
  },
  {
    Icon: Watch,
    top: 810,
    left: 320,
    rotation: '20deg',
    size: 36,
    opacity: 0.16,
  },
  {
    Icon: Gem,
    top: 850,
    left: 170,
    rotation: '-25deg',
    size: 34,
    opacity: 0.14,
  },
];

// Animated Icon Component
function AnimatedIcon({
  Icon,
  top,
  left,
  rotation,
  size,
  opacity,
  index,
}: {
  Icon: any;
  top: number;
  left: number;
  rotation: string;
  size: number;
  opacity: number;
  index: number;
}) {
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Create smooth, continuous floating animation
    const animateFloat = () => {
      // Different durations for each icon based on index for variety
      const duration = 3000 + index * 200;
      const xRange = 10 + (index % 3) * 5; // 10-20px horizontal movement
      const yRange = 15 + (index % 4) * 5; // 15-30px vertical movement

      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(translateY, {
              toValue: yRange,
              duration: duration,
              useNativeDriver: true,
            }),
            Animated.timing(translateY, {
              toValue: 0,
              duration: duration,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(translateX, {
              toValue: xRange,
              duration: duration * 1.3,
              useNativeDriver: true,
            }),
            Animated.timing(translateX, {
              toValue: 0,
              duration: duration * 1.3,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    };

    // Stagger the start of animations
    const timeout = setTimeout(animateFloat, index * 100);
    return () => clearTimeout(timeout);
  }, [index, translateX, translateY]);

  return (
    <Animated.View
      style={tw.style(`absolute`, {
        top,
        left,
        transform: [{ rotate: rotation }, { translateY }, { translateX }],
        opacity,
      })}
    >
      <Icon size={size} color="#FFFFFF" strokeWidth={1.5} />
    </Animated.View>
  );
}

export function LandingScreen({ navigation }: LandingScreenProps) {
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUpUserType');
  };

  return (
    <LinearGradient
      colors={colors.gradients.primary}
      locations={[0.0113, 0.9808]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.34, y: 1 }}
      style={tw`flex-1`}
    >
      <StatusBar barStyle="light-content" />

      {/* Background Pattern Overlay */}
      <ImageBackground
        source={require('../../assets/images/landing.png')}
        style={tw`absolute inset-0 w-full h-full`}
        resizeMode="cover"
        imageStyle={{ opacity: 0.08 }}
      />

      {/* Fashion decorative icons with animation */}
      {decorativeIcons.map((item, index) => (
        <AnimatedIcon
          key={index}
          Icon={item.Icon}
          top={item.top}
          left={item.left}
          rotation={item.rotation}
          size={item.size}
          opacity={item.opacity}
          index={index}
        />
      ))}

      {/* Main content - Following Figma design exactly */}
      <View style={tw`flex-1 items-center pb-8`}>
        {/* Logo - positioned at top center (y: 221px in Figma) */}
        <View style={tw.style(`absolute items-center`, { top: 221 })}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={tw.style(`w-32 h-32`, {
              resizeMode: 'contain',
            })}
          />
        </View>

        {/* App Name - positioned at y: 350px in Figma */}
        <View style={tw.style(`absolute items-center w-full`, { top: 350 })}>
          <Text
            style={[
              tw`text-5xl font-normal text-white text-center`,
              { fontFamily: 'Outfit_400Regular' },
            ]}
          >
            Thimblely
          </Text>
        </View>

        {/* Buttons Container - positioned at y: 706px in Figma */}
        <View style={tw.style(`absolute w-full px-8.75`, { top: 706 })}>
          <View style={tw`w-full gap-4`}>
            {/* Log in Button */}
            <Button variant="primary" onPress={handleLogin}>
              Log in
            </Button>

            {/* Sign up Button */}
            <Button variant="secondary" onPress={handleSignUp}>
              Sign up
            </Button>
          </View>
        </View>

        {/* Terms and Privacy - positioned at bottom with padding */}
        <View style={tw.style(`absolute w-full px-8.75 pb-10`, { bottom: 0 })}>
          <Text
            style={[
              tw`text-white text-sm text-center leading-5`,
              { fontFamily: 'Outfit_400Regular' },
            ]}
          >
            By signing up, you accept stitchmeister{' '}
            <Text style={tw`underline`}>Terms of Services</Text> and acknowledge
            that you have read the <Text style={tw`underline`}>privacy</Text>{' '}
            and <Text style={tw`underline`}>cookies</Text>.
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}
