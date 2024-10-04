import React, { useState } from 'react';
import { View, Text, Dimensions, Image, TextInput, Pressable, StyleSheet, ScrollView, Alert,ActivityIndicator } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDocs, collection } from 'firebase/firestore';
import { app, db } from "../config";

const { width, height } = Dimensions.get('window'); // Get the width of the screen

const login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setshowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const toggleShowPassword = () => {
    setshowPassword(!showPassword);
  };
  const next = () => {
    navigation.navigate('auth/singup');
  };
  const loginNext = async () => {
    if (mail.length == 0 && password.length < 7) {
      Alert.alert("enter details properly");
    }
    else {
      // console.log("welocm buddy");
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        let found = false;

        querySnapshot.forEach((doc) => {
          const user = doc.data();
          if (user.mail === mail && user.password === password) {
            found = true;
            AsyncStorage.setItem('isLoggedIn', 'true');
            setIsLoggedIn(true);
            AsyncStorage.setItem('userEmail', mail);
            router.replace("/chats");
          }
        });

        if (!found) {
          Alert.alert("Inavlid Email or Password");
        }
      } catch (error) {
        setMessage('Error: ' + error.message);
      }
      finally {
        setLoading(false); // Stop loading
      }
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={style.container}>
        <View style={{
          alignItems: "center",
        }}>
          <Image source={require('../../assets/images/loginicon.png')} style={{
            width: 250,
            height: 250
          }} />
        </View>
        <View style={style.info}>
          <Text style={{
            fontSize: 30,
            //fontFamily:"outfit",
            textAlign: "center",
            fontWeight: "bold",
            color: "black"
          }}>Login!!!</Text>
          <View style={style.phone}>
            <Entypo name="email" size={30} color="black" style={style.icon} />
            <TextInput placeholder='enter your gamil' style={style.text}
              value={mail}
              onChangeText={setMail}
              autoCapitalize={false}
              autoCorrect={false}
            />
          </View>
          <View style={style.phone}>
            <FontAwesome name="lock" size={34} color="black" style={style.icon} />
            <TextInput placeholder='enter your password' style={style.text}
              secureTextEntry={!showPassword}
              autoCapitalize='none'
              autoComplete='false'
              value={password}
              onChangeText={setPassword}
            />
            <MaterialCommunityIcons
              name={showPassword ? 'eye' : 'eye-off'}
              size={24}
              color="black"
              style={{
                position: "absolute",
                right: 10,
                top: 12
              }}
              onPress={toggleShowPassword}
            />
          </View>
          <Pressable style={{
            width: 120,
            marginHorizontal: 170
          }}>
            <Text style={{
              color: "blue",
            }}>Forgot Password</Text>
          </Pressable>
          <Pressable style={style.loginbtn} onPress={loginNext}>
          {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : (
            <Text style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
              letterSpacing: 1
            }}>Login</Text>
          )}
          </Pressable>
          <Pressable style={style.loginbtn} onPress={next}>
            <Text style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
              letterSpacing: 1
            }}>Sign up</Text>
          </Pressable>
        </View>
      </SafeAreaView></ScrollView>
  );
};
const style = StyleSheet.create({
  container: {
    backgroundColor: "#e6f7fa",
    flex: 1,
    height: 785
  },
  info: {
    padding: 25,
    marginTop: 20,
    gap: 20,
    elevation: 40,
    backgroundColor: "#f2f7f7",
    borderRadius: 20,
    margin: 10,
    shadowColor: "black"
  },
  text: {
    width: 200,
    fontSize: 16
  },
  phone: {
    borderColor: "black",
    borderWidth: 2,
    flexDirection: "row",
    borderRadius: 20,
    height: 50
  },
  icon: {
    marginHorizontal: 15,
    marginTop: 7
  },
  loginbtn: {
    borderColor: "black",
    borderWidth: 2,
    height: 50,
    width: 230,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#262424",
    marginHorizontal: 35,
  },
});

export default login;