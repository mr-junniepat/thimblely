import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import {
  ChevronLeft,
  Lock,
  Fingerprint,
  Key,
  Clock,
  Shield,
} from 'lucide-react-native';
import { SecurityOption } from '../../components';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  backgroundWhite: '#FAFAFA',
};

interface SecurityOption {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  hasToggle: boolean;
  isEnabled?: boolean;
  value?: string;
}

const securityOptions: SecurityOption[] = [
  {
    id: '1',
    title: 'Lock Workspace',
    description: 'Require authentication to access workspace',
    icon: Lock,
    hasToggle: true,
    isEnabled: false,
  },
  {
    id: '2',
    title: 'Biometric Authentication',
    description: 'Use biometric to unlock workspace',
    icon: Fingerprint,
    hasToggle: true,
    isEnabled: true,
  },
  {
    id: '3',
    title: 'Passcode',
    description: 'Set a numeric passcode',
    icon: Key,
    hasToggle: true,
    isEnabled: true,
  },
  {
    id: '4',
    title: 'Auto Lock Timeout',
    description: 'Lock workspace after inactivity',
    icon: Clock,
    hasToggle: false,
    value: '5 minutes',
  },
  {
    id: '5',
    title: 'Require Auth on Startup',
    description: 'Authenticate when app starts',
    icon: Shield,
    hasToggle: true,
    isEnabled: true,
  },
];

export default function WorkspaceSecurityScreen({ navigation }: any) {
  const [options, setOptions] = useState(securityOptions);

  const toggleOption = (id: string) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, isEnabled: !option.isEnabled } : option
      )
    );
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Status Bar Space */}
      <View style={tw`h-12`} />

      {/* Header */}
      <View style={tw`px-6 py-4 flex-row items-center`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={colors.black} />
        </TouchableOpacity>
        <Text
          style={[
            tw`text-base font-bold ml-4`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          Workspace Security
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={tw`px-6 mt-8`}>
          {options.map((option, index) => (
            <SecurityOption
              key={option.id}
              id={option.id}
              title={option.title}
              description={option.description}
              icon={option.icon}
              hasToggle={option.hasToggle}
              isEnabled={option.isEnabled}
              value={option.value}
              onToggle={toggleOption}
              onValuePress={(id) => console.log('Value pressed:', id)}
              showBorder={index < options.length - 1}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
