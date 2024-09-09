import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {Ionicons, AntDesign} from '@expo/vector-icons'
import TabNavigator from './BottomTabNavigation';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle:{
            backgroundColor: 'white',
            width: 250
        }
      }}
    >
        <Drawer.Screen
         name="Dashboard"
         options={{
            drawerLabel: 'Dashboard',
            title: "Dashboard",
            headerShadowVisible: false,
            drawerIcon: ()=>{
                <Ionicons
                  name='home-outline'
                  size={24}
                  color="black"
                />
            }
         }}
         component={TabNavigator}
        />

    </Drawer.Navigator>
   
      
  )
}

export default DrawerNavigation

const styles = StyleSheet.create({})