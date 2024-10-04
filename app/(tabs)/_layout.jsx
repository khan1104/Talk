import React from 'react'
import { Tabs } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';


const Tablayout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor:"green",
      tabBarStyle:{
        backgroundColor:"#2f3030",
        height:60
      },
      tabBarLabelStyle:{
        fontSize:15,
      }
    }}>
        <Tabs.Screen name="chats" options={{
          headerShown:false,
          title:"Chats",
          tabBarIcon: ({ color }) => <MaterialIcons name="message" size={30} color={color} />
        }}/>
        <Tabs.Screen name="notfications" options={{
          headerShown:false,
          title:"Notifications",
          tabBarIcon:({color}) => <MaterialIcons name="notifications" size={30} color={color} />
        }}/>
        <Tabs.Screen name="addfriends" options={{
          headerShown:false,
          title:"Add Friends",
          tabBarIcon:({color}) => <Ionicons name="person-add-sharp" size={30} color={color} />
        }}/>
    </Tabs>
  )
}

export default Tablayout