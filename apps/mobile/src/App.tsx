import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';

// Create Apollo Client
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Screens
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpUserTypeScreen from './screens/SignUpUserTypeScreen';
import SignUpCountryScreen from './screens/SignUpCountryScreen';
import SignUpFormScreen from './screens/SignUpFormScreen';
import SignUpVerifyScreen from './screens/SignUpVerifyScreen';
import MainTabs from './navigation/MainTabs';
import ManufacturerDetailScreen from './screens/ManufacturerDetailScreen';
import InfluencerDetailScreen from './screens/InfluencerDetailScreen';
import CalendarScreen from './screens/workspaceSubModules/CalendarScreen';
import ChangePasswordScreen from './screens/profile/ChangePasswordScreen';
import WorkspaceSecurityScreen from './screens/profile/WorkspaceSecurityScreen';
import ProfilePrivacyScreen from './screens/profile/ProfilePrivacyScreen';
import NotificationSettingsScreen from './screens/profile/NotificationSettingsScreen';
import ActivityScreen from './screens/profile/ActivityScreen';
import HelpSupportScreen from './screens/profile/HelpSupportScreen';
import MeasurementFormScreen from './screens/profile/MeasurementFormScreen';
import NotificationsScreen from './screens/profile/NotificationsScreen';
import ClientCrmScreen from './screens/workspaceSubModules/ClientCrmScreen';
import ClientDetailScreen from './screens/workspaceSubModules/ClientDetailScreen';
import TeamManagementScreen from './screens/workspaceSubModules/TeamManagementScreen';
import TeamProfileScreen from './screens/workspaceSubModules/TeamProfileScreen';
import InventoryScreen from './screens/workspaceSubModules/InventoryScreen';
import InventoryItemDetailScreen from './screens/workspaceSubModules/InventoryItemDetailScreen';
import OrdersScreen from './screens/workspaceSubModules/OrdersScreen';
import OrderDetailScreen from './screens/workspaceSubModules/OrderDetailScreen';

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  SignUpUserType: undefined;
  SignUpCountry: { userType: string };
  SignUpForm: { userType: string; country: string };
  SignUpVerify: { userType: string; country: string; email: string };
  MainTabs: undefined;
  ManufacturerDetail: { manufacturer: any };
  InfluencerDetail: { influencer: any };
  Calendar: undefined;
  ChangePassword: undefined;
  WorkspaceSecurity: undefined;
  ProfilePrivacy: undefined;
  NotificationSettings: undefined;
  Activity: undefined;
  HelpSupport: undefined;
  MeasurementForm: { templateId: string };
  ClientCrm: undefined;
  ClientDetail: { clientId: string };
  TeamManagement: undefined;
  TeamProfile: { member: any };
  Inventory: undefined;
  InventoryItemDetail: { item: any };
  Orders: undefined;
  OrderDetail: { order: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Outfit-Regular': require('../assets/fonts/Outfit-Regular.ttf'),
    'Outfit-Medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'Outfit-Bold': require('../assets/fonts/Outfit-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Landing"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#FFFFFF' },
          }}
        >
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="SignUpUserType"
            component={SignUpUserTypeScreen}
          />
          <Stack.Screen name="SignUpCountry" component={SignUpCountryScreen} />
          <Stack.Screen name="SignUpForm" component={SignUpFormScreen} />
          <Stack.Screen name="SignUpVerify" component={SignUpVerifyScreen} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen
            name="ManufacturerDetail"
            component={ManufacturerDetailScreen}
          />
          <Stack.Screen
            name="InfluencerDetail"
            component={InfluencerDetailScreen}
          />
          <Stack.Screen name="Calendar" component={CalendarScreen} />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
          />
          <Stack.Screen
            name="WorkspaceSecurity"
            component={WorkspaceSecurityScreen}
          />
          <Stack.Screen
            name="ProfilePrivacy"
            component={ProfilePrivacyScreen}
          />
          <Stack.Screen
            name="NotificationsScreen"
            component={NotificationsScreen}
          />
          <Stack.Screen
            name="NotificationSettings"
            component={NotificationSettingsScreen}
          />
          <Stack.Screen name="Activity" component={ActivityScreen} />
          <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
          <Stack.Screen
            name="MeasurementForm"
            component={MeasurementFormScreen}
          />
          <Stack.Screen name="ClientCrm" component={ClientCrmScreen} />
          <Stack.Screen name="ClientDetail" component={ClientDetailScreen} />
          <Stack.Screen
            name="TeamManagement"
            component={TeamManagementScreen}
          />
          <Stack.Screen name="TeamProfile" component={TeamProfileScreen} />
          <Stack.Screen name="Inventory" component={InventoryScreen} />
          <Stack.Screen
            name="InventoryItemDetail"
            component={InventoryItemDetailScreen}
          />
          <Stack.Screen name="Orders" component={OrdersScreen} />
          <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
