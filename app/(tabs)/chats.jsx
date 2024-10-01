import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation,useRouter} from 'expo-router';

const Chats = () => {
  const navigation = useNavigation();
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  const handleLogOut=async()=>{
    await AsyncStorage.removeItem('isLoggedIn'); // Clear the login status
    setIsLoggedIn(false); // Update the local state
    navigation.replace('auth/login');
  };
  return (
    <View>
      <Text>Chats</Text>
      <Pressable style={{
        backgroundColor:"black",
        height:40,
        width:130,
        borderColor:"red",
        borderWidth:2,
        borderRadius:10,
        margin:100
      }} onPress={handleLogOut}>
        <Text style={{
          textAlign:"center",
          color:"white",
          fontWeight:"400",
          padding:8
        }}>Logout</Text>
      </Pressable>
    </View>
  )
}

export default Chats