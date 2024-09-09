import React, { useState, useEffect } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { firebase } from "../config";
import { getItem } from "../src/utils/asyncStorage";
import LoginScreen from "../src/screen/LoginScreen";
import SignupScreen from "../src/screen/SignupScreen";
import Dashboard from "../src/screen/Dashboard";
import ForgotPasswordScreen from "../src/screen/ForgotPasswordScreen";
import Onboarding1 from '../src/screen/Onboarding1';
import Onboarding3 from '../src/screen/Onboarding3';
import ProductReviewScreen from '../src/screen/ProductReviewScreen';
import SplashScreen from '../src/screen/SplashScreen';
import TabNavigator from "./BottomTabNavigation"; // Import the TabNavigator
import DrawerNavigation from './DrawerNavigation';

const Stack = createStackNavigator();

function AppNavigation() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkIfAlreadyOnboard();
  }, []);

  const checkIfAlreadyOnboard = async () => {
    try {
      let onboarded = await getItem('onboarded');
      if (onboarded == 1) {
        setShowOnboarding(false);
      } else {
        setShowOnboarding(true);
      }
    } catch (e) {
      console.error('Error checking onboarding:', e);
      setError('Failed to load onboarding information');
    }
  };

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged, handleAuthError);
    return () => subscriber();
  }, []);

  const handleAuthError = (error) => {
    console.error('Firebase auth error:', error);
    setError('Failed to authenticate');
  };

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  if (initializing || showOnboarding === null) {
    return <SplashScreen />;
  }

  if (error) {
    return <Text style={{ color: 'red' }}>{error}</Text>;
  }

  return (
    <Stack.Navigator
      initialRouteName={showOnboarding ? "Onboarding1" : "Onboarding3"}
      screenOptions={{ headerShown: false }}
    >
      {user ? (
        <>
          <Stack.Screen name="Main" component={DrawerNavigation} />
          <Stack.Screen name="ProductReview" component={ProductReviewScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Onboarding1" component={Onboarding1} />
          <Stack.Screen name="Onboarding3" component={Onboarding3} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default AppNavigation;
