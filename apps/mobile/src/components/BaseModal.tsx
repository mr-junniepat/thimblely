import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import tw from 'twrnc';
import { X, ChevronLeft } from 'lucide-react-native';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  red: '#DC1E38',
};

interface BaseModalProps {
  /** Whether the modal is visible */
  visible: boolean;
  /** Function to call when modal should close */
  onClose: () => void;
  /** Function to call when back button is pressed */
  onBack?: () => void;
  /** Title text for the modal header */
  title?: string;
  /** Height of the modal content */
  height?: number | string;
  /** Whether to show the close button */
  showCloseButton?: boolean;
  /** Whether to show the back button */
  showBackButton?: boolean;
  /** Custom header content */
  headerContent?: React.ReactNode;
  /** Children content to render inside the modal */
  children: React.ReactNode;
  /** Animation type for the modal */
  animationType?: 'slide' | 'fade' | 'none';
  /** Whether the modal is transparent */
  transparent?: boolean;
  /** Background color of the overlay */
  overlayColor?: string;
  /** Border radius for the modal */
  borderRadius?: number;
}

export default function BaseModal({
  visible,
  onClose,
  onBack,
  title,
  height = 507,
  showCloseButton = true,
  showBackButton = false,
  headerContent,
  children,
  animationType = 'fade',
  transparent = true,
  overlayColor = 'rgba(0,0,0,0.3)',
  borderRadius = 10,
}: BaseModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={transparent}
      animationType={animationType}
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <TouchableOpacity
        style={[
          tw`flex-1 justify-end`,
          {
            backgroundColor: overlayColor,
          },
        ]}
        activeOpacity={1}
        onPress={onClose}
      >
        {/* Modal Content */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
          style={[
            tw`bg-white rounded-t-lg`,
            {
              height: height === '100%' ? '90%' : height,
              borderTopLeftRadius: borderRadius,
              borderTopRightRadius: borderRadius,
            },
          ]}
        >
          {/* Header */}
          <View style={tw`flex-row items-center justify-between px-6 py-6`}>
            {/* Back Button */}
            {showBackButton && onBack ? (
              <TouchableOpacity onPress={onBack}>
                <ChevronLeft size={24} color={colors.black} />
              </TouchableOpacity>
            ) : (
              <View style={tw`w-6`} />
            )}

            {/* Title or Custom Header Content */}
            {headerContent ? (
              headerContent
            ) : title ? (
              <Text
                style={[
                  tw`text-base font-normal flex-1 text-center`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {title}
              </Text>
            ) : (
              <View style={tw`flex-1`} />
            )}

            {/* Close Button */}
            {showCloseButton ? (
              <TouchableOpacity onPress={onClose}>
                <X size={24} color={colors.black} />
              </TouchableOpacity>
            ) : (
              <View style={tw`w-6`} />
            )}
          </View>

          {/* Scrollable Content */}
          <ScrollView
            style={tw`flex-1 px-4`}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {children}
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
