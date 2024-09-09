import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { firebase } from "./config";
import { CartProvider, useCart } from './src/screen/CartContext';
import LoginScreen from "./src/screen/LoginScreen";
import SignupScreen from "./src/screen/SignupScreen";
import Dashboard from "./src/screen/Dashboard";
import ForgotPasswordScreen from "./src/screen/ForgotPasswordScreen";
import SplashScreen from './src/screen/SplashScreen';
import Onboarding1 from './src/screen/Onboarding1';
import Onboarding3 from './src/screen/Onboarding3';
import ProfileScreen from "./src/screen/ProfileScreen";
import ProductReviewScreen from './src/screen/ProductReviewScreen';
import SettingScreen from './src/screen/SettingScreen';
import OrderHistoryScreen from './src/screen/OrderHistoryScreen';
import SecurityScreen from './src/screen/SecurityScreen';
import NotificationScreen from './src/screen/NotificationScreen';
import PrivacyScreen from './src/screen/PrivacyScreen';
import HelpAndSupport from './src/screen/HelpAndSupport';
import TermsAndPolicies from './src/screen/TermsAndPolicies';
import ReportScreen from './src/screen/ReportScreen';
import AddAccountScreen from './src/screen/AddAccountScreen';
import ShoppingCart from './src/screen/ShoppingCart';
import { getItem } from "./src/utils/asyncStorage";
import { colors } from "./src/utils/color";

// Define the stack and tab navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function SettingsStack() {
  return (
    <Stack.Navigator
      
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SettingsHome" component={SettingScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Stack.Screen name="Security" component={SecurityScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} />
      <Stack.Screen name="HelpSupport" component={HelpAndSupport} />
      <Stack.Screen name="TermsPolicies" component={TermsAndPolicies} />
      <Stack.Screen name="Report" component={ReportScreen} />
      <Stack.Screen name="AddAccount" component={AddAccountScreen} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  const { totalItems } = useCart(); // Get the total number of items in the cart

  return (
    <Tab.Navigator
      initialRouteName='Dashboard'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size, color }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'home';
          }  else if (route.name === 'ShoppingCart') {
            iconName = 'cart';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return (
            <View>
              <Ionicons name={iconName} size={size} color={color} />
              {route.name === 'ShoppingCart' && totalItems > 0 && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{totalItems}</Text>
                </View>
              )}
            </View>
          );
        },
        tabBarActiveTintColor: '#A3BBC0',
        tabBarInactiveTintColor: '#C7C6C5',
        headerShown: false,
      })}
    >
      <Tab.Screen name='Dashboard' component={Dashboard} />
      <Tab.Screen name='ShoppingCart' component={ShoppingCart} />
     
      <Tab.Screen name='Settings' component={SettingsStack} />
    </Tab.Navigator>
  );
}

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(null);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    checkIfAlreadyOnboard();
  }, []);

  const checkIfAlreadyOnboard = async () => {
    try {
      let onboarded = await getItem('onboarded');
      if (onboarded == 1) {
        setShowOnboarding(false);  // Hide onboarding if already completed
      } else {
        setShowOnboarding(true);   // Show onboarding if not completed
      }
    } catch (e) {
      console.error('Error checking onboarding:', e);
      setError('Failed to load onboarding information');
    }
  };

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged, handleAuthError);
    return () => subscriber(); // Cleanup the subscription on unmount
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
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#A3BBC0" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={showOnboarding ? "Onboarding1" : "Onboarding3"}
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <>
          <Stack.Screen name="Main" component={TabNavigator} />
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

export default () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleFinishLoading = () => {
    setIsLoading(false);
  };

  return (
    <CartProvider>
      <NavigationContainer>
        {isLoading ? (
          <SplashScreen onFinish={handleFinishLoading} />
        ) : (
          <App />
        )}
      </NavigationContainer>
    </CartProvider>
  );
};

// Styles for loading and error states
const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
  badgeContainer: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: colors.primary,
    borderRadius: 6,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});








