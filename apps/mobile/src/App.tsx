import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client';
import { client } from '@thimblely/shared';
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
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
