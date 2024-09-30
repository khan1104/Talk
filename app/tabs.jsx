// TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/home'; // Adjust the path as necessary
import Notification from './screens/notification'; // Create this screen if it doesn't exist
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} options={{
            title:"hello"
        }}/>
        <Tab.Screen name="notification" component={Notification} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
