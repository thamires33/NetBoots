import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'expo-status-bar';
import HomeScreen from './components/Home/HomeScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen}/>
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
  );

};