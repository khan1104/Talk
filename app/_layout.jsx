
import { Stack, useNavigation} from "expo-router";
import React, { useEffect, useState } from 'react';
import  Header  from "../components/header"
import { View, Text, Image, SafeAreaView } from 'react-native'
import { ChatProvider } from './ChatContext';

export default function RootLayout() {
  const navigation=useNavigation();
  /*React.useEffect(()=>{
    navigation.navigate("auth/userprofile");
  },[]);*/
  return (
    <ChatProvider>
    <Stack>
      <Stack.Screen name="index" options={{
          headerShown:false,
        }}/>
      <Stack.Screen name="auth/login" options={{
        headerShown:false,
      }}/>
      <Stack.Screen name="auth/singup" options={{
        headerShown:false,
      }}/>
      <Stack.Screen name="auth/otp" options={{
        headerShown:false,
      }}/>
      <Stack.Screen name="(tabs)" options={{
        header:()=> <Header/>
      }}/>
      <Stack.Screen name="screens/profile" options={{
        headerTitle:"Profile",
        headerTitleStyle:{
          fontSize:30
        },
        headerStyle:{
          backgroundColor:"#e6f7fa"
        }
      }}/>
    </Stack>
    </ChatProvider>
  );
}