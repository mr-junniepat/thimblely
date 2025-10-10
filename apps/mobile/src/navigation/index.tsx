import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LandingScreen } from '@mobile/screens/LandingScreen';
import { LoginScreen } from '@mobile/screens/LoginScreen';
import { SignUpUserTypeScreen } from '@mobile/screens/SignUpUserTypeScreen';
import { SignUpCountryScreen } from '@mobile/screens/SignUpCountryScreen';
import { SignUpFormScreen } from '@mobile/screens/SignUpFormScreen';
import { SignUpVerifyScreen } from '@mobile/screens/SignUpVerifyScreen';
import { BottomTabs } from '@mobile/navigation/BottomTabs';
import { DetailsScreen } from '@mobile/screens/DetailsScreen';

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  SignUpUserType: undefined;
  SignUpCountry: { userType: string };
  SignUpForm: { userType: string; country: string };
  SignUpVerify: { userType: string; country: string; email: string };
  Home: undefined;
  Details: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3b82f6',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpUserType"
          component={SignUpUserTypeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpCountry"
          component={SignUpCountryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpForm"
          component={SignUpFormScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpVerify"
          component={SignUpVerifyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: 'Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
