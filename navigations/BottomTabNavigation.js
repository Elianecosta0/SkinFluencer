import React from 'react';
import { StyleSheet , View, Text} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dashboard from '../src/screen/Dashboard';
import ShoppingCart from '../src/screen/ShoppingCart';
import ProfileScreen from '../src/screen/ProfileScreen';
import SettingScreen from '../src/screen/SettingScreen';
import { useCart } from '../src/screen/CartContext';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const { totalItems } = useCart();

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size, color }) => {
          let iconName;
          if (route.name === 'Dashboard') {
            iconName = 'home';
          } else if (route.name === 'ProfileScreen') {
            iconName = 'person';
          } else if (route.name === 'ShoppingCart') {
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
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="ShoppingCart" component={ShoppingCart} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: '#A3BBC0',
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