import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { getFixturesData } from './api';
import Home from './screens/Home';
import Matches from './screens/Matches';
import Results from './screens/Results';
import NewsDetails from './screens/NewsDetails';
import Tabs from './navigation/tabs';


const Stack = createNativeStackNavigator();

export default function App() {
  // const [fixtures, setFixtures] = useState([]);
  // const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   setLoading(true);
  //   getFixturesData().then((data) => {
  //     console.log(data);

  //     setFixtures(data);
  //     setLoading(false);
  //   })
  // }, [])

  //   if(loading || fixtures) {
  //     return <ActivityIndicator size='large' />
  //   }
    
  return (
   <NavigationContainer>
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='Home' component={Tabs}/>
      <Stack.Screen name='Matches' component={Matches}/>
      <Stack.Screen name='Results' component={Results}/>
      <Stack.Screen name='NewsDetails' component={NewsDetails}/>
    </Stack.Navigator>
   </NavigationContainer>
  );
}
