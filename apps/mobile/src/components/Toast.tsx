import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import tw from 'twrnc';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react-native';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  success: '#10B981',
  error: '#DC1E38',
  warning: '#F59E0B',
  info: '#3B82F6',
  backgroundWhite: '#FAFAFA',
};

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  visible: boolean;
  message: string;
  type?: ToastType;
  duration?: number;
  onHide?: () => void;
  position?: 'top' | 'bottom';
}

const { width: screenWidth } = Dimensions.get('window');

export default function Toast({
  visible,
  message,
  type = 'info',
  duration = 3000,
  onHide,
  position = 'top',
}: ToastProps) {
  const translateY = useRef(
    new Animated.Value(position === 'top' ? -100 : 100)
  ).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Show animation
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide after duration
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      hideToast();
    }
  }, [visible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: position === 'top' ? -100 : 100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide?.();
    });
  };

  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: colors.success,
          icon: CheckCircle,
          iconColor: 'white',
        };
      case 'error':
        return {
          backgroundColor: colors.error,
          icon: XCircle,
          iconColor: 'white',
        };
      case 'warning':
        return {
          backgroundColor: colors.warning,
          icon: AlertCircle,
          iconColor: 'white',
        };
      case 'info':
      default:
        return {
          backgroundColor: colors.info,
          icon: Info,
          iconColor: 'white',
        };
    }
  };

  const config = getToastConfig();
  const IconComponent = config.icon;

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        tw`absolute left-4 right-4 z-50`,
        {
          top: position === 'top' ? 60 : undefined,
          bottom: position === 'bottom' ? 100 : undefined,
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <View
        style={[
          tw`flex-row items-center px-4 py-3 rounded-lg shadow-lg`,
          {
            backgroundColor: config.backgroundColor,
            minHeight: 56,
            maxWidth: screenWidth - 32,
          },
        ]}
      >
        <IconComponent size={20} color={config.iconColor} />
        <Text
          style={[
            tw`flex-1 ml-3 text-sm font-medium`,
            {
              color: 'white',
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          {message}
        </Text>
      </View>
    </Animated.View>
  );
}

// Hook for easy toast usage
export function useToast() {
  const [toast, setToast] = React.useState<{
    visible: boolean;
    message: string;
    type: ToastType;
    duration?: number;
    position?: 'top' | 'bottom';
  }>({
    visible: false,
    message: '',
    type: 'info',
  });

  const showToast = (
    message: string,
    type: ToastType = 'info',
    duration: number = 3000,
    position: 'top' | 'bottom' = 'top'
  ) => {
    setToast({
      visible: true,
      message,
      type,
      duration,
      position,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  return {
    toast,
    showToast,
    hideToast,
  };
}
