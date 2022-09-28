import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home';
import Matches from '../screens/Matches';
import Results from '../screens/Results';
import Profile from '../screens/Profile';
import Stats from '../screens/Stats';
import icons from '../constants/icons';
import { Entypo } from '@expo/vector-icons';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#415dbe"
      barStyle={{ backgroundColor: '#fff' , marginTop: 50}}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'News',
          tabBarIcon: ({ color , focused}) => (
            <MaterialCommunityIcons name="home" color={color} size={focused ? 25 : 20} />
          ),
        }}
      />
      <Tab.Screen
        name="Matches"
        component={Matches}
        options={{
            tabBarLabel: 'Matches',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name="whistle" color={color} size={focused ? 25 : 20} />
          ),
        }}
      />
      <Tab.Screen
        name="Results"
        component={Results}
        options={{
            tabBarLabel: 'Results',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name="soccer" color={color} size={focused ? 25 : 20} />
          ),
        }}
      />
      <Tab.Screen
        name="Stats"
        component={Stats}
        options={{
          tabBarLabel: 'Stats',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name="graph" color={color} size={focused ? 25 : 20} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name="account" color={color} size={focused ? 25 : 20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs