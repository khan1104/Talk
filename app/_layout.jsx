
import { Stack, useNavigation} from "expo-router";
import React, { useEffect, useState } from 'react';


export default function RootLayout() {
  const navigation=useNavigation();
  React.useEffect(()=>{
    navigation.navigate("screens/home");
  },[]);
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
      <Stack.Screen name="screens/home" options={{
          headerShown:false,
        }}/>
    </Stack>
  );
}