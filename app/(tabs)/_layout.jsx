import React from 'react';
import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tablayout = () => {
  return (
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor: "green",
        tabBarStyle: {
          backgroundColor: "#2f3030",
          height: 60,
          borderTopStartRadius:17,
          borderTopEndRadius:17
        },
        tabBarLabelStyle: {
          fontSize: 15,
        },
        tabBarItemStyle: {
          flexDirection: 'column',
          alignItems: 'center',
        },
      }}
    >
      <Tabs.Screen 
        name="chats" 
        options={{
          headerShown: false,
          title: "Chats",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="message" size={focused ? 35 : 30} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="settings" 
        options={{
          headerShown: false,
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="settings" size={focused ? 35 : 30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Tablayout;
