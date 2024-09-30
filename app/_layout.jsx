
import { Stack, useNavigation} from "expo-router";
import React, { useEffect, useState } from 'react';


export default function RootLayout() {
  const navigation=useNavigation();
  /*React.useEffect(()=>{
    navigation.navigate("/chats");
  },[]);*/
  return (
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
        title:"TALK",
        headerTitleStyle:{
          color:"white",
          fontWeight:"bold"
        },
        headerStyle:{
          backgroundColor:"#2f3030",
        }
      }}/>
    </Stack>
  );
}