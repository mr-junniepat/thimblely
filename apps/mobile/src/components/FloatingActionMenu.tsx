import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { LucideIcon } from 'lucide-react-native';

interface ActionItem {
  id: string;
  icon: LucideIcon;
  label: string;
  iconColor: string;
  iconBackgroundColor: string;
  onPress: () => void;
}

interface FloatingActionMenuProps {
  visible: boolean;
  onClose: () => void;
  actions: ActionItem[];
}

const FloatingActionMenu: React.FC<FloatingActionMenuProps> = ({
  visible,
  onClose,
  actions,
}) => {
  const colors = {
    black: '#111113',
    white: '#FFFFFF',
    borderColor: '#CACFD8',
    dividerColor: 'rgba(0,0,0,0.05)',
  };

  if (!visible) return null;

  return (
    <View style={tw`absolute bottom-34 right-6 w-[307px]`}>
      {/* Menu Container */}
      <View
        style={[
          tw`bg-white rounded-lg px-4 py-0 mb-3`,
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 20,
            elevation: 8,
          },
        ]}
      >
        {actions.map((action, index) => (
          <TouchableOpacity
            key={action.id}
            onPress={() => {
              action.onPress();
              onClose();
            }}
            style={[
              tw`flex-row items-center gap-4 py-3`,
              index < actions.length - 1 && {
                borderBottomWidth: 1,
                borderBottomColor: colors.dividerColor,
              },
            ]}
          >
            {/* Icon Container */}
            <View
              style={[
                tw`w-10 h-10 rounded-full items-center justify-center`,
                { backgroundColor: action.iconBackgroundColor },
              ]}
            >
              <action.icon size={24} color={action.iconColor} />
            </View>

            {/* Label */}
            <Text
              style={[
                tw`text-sm font-medium`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default FloatingActionMenu;
