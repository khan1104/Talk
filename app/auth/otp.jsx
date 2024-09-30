import { View, Text, StyleSheet, Pressable, SafeAreaView, Alert } from 'react-native'
import { CommonActions } from '@react-navigation/native';
import OtpTextInput from "react-native-otp-textinput"
import React, { useEffect, useState } from 'react'
import { useNavigation,useRouter} from 'expo-router';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtpScreen = () => {
  const router = useRouter();
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { mail} = route.params
  const [count, setCount] = useState(60);
  const [Otp, setOtp] = useState('');
  const [backendOtp, setBackendOtp] = useState("");
  useEffect(() => {
    const timer = count > 0 && setInterval(() => setCount(count - 1), 1000);
    return () => clearInterval(timer);
  }, [count]);
  //backend
  const sendDataToBackend = async () => {
    try {
      const response = await axios.post('http://192.168.214.3:5000/send-otp', {
        mail: mail,
      });
      console.log('Response from backend:', response.data);
      setBackendOtp(response.data.message);
    } catch (error) {
      console.error('Error sending data:', error);
      Alert.alert("Server Error");
    }
  };
  const getOtp = () => {
    if (count == 0) {
      console.log("otp sent");
      Alert.alert("otp has been send");
      sendDataToBackend();
      setCount(60);
    }
    else {
      Alert.alert("wait for timer");
    }
  };
  const verifyOtp = async () => {
    if (Otp == backendOtp) {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      router.replace('screens/home');
    }
    else {
      Alert.alert("Invalid OTP");
    }
  };
  useEffect(() => {
    sendDataToBackend();
    console.log("hello");
  }, []);
  return (
    <SafeAreaView style={style.container}>
      <View style={style.heading}>
        <Text style={{
          fontSize: 39,
          textAlign: "center",
          fontWeight: "450"
        }}>Verify your Email</Text>
        <Text style={{
          fontSize: 20,
          fontWeight: "black",
          textAlign: "center",
          marginTop: 25
        }}>Code has been sent to your {mail}</Text>
      </View>
      <OtpTextInput
        inputCount={6}
        handleTextChange={index => setOtp(index)}
        textInputStyle={[style.otpBox]}
        tintColor={"blue"}
        offTintColor={"black"}
        containerStyle={{
          padding: 12,
          marginTop: 20,
        }}
      />
      <Text style={{
        fontSize: 17,
        textAlign: "center",
        fontWeight: 400,
        marginTop: 15
      }}>Resend code in {count}</Text>
      <Text style={[style.resendOtp, { color: count == 0 ? "blue" : "black" }]}
        onPress={getOtp}>Resend Code</Text>
      <Pressable style={[style.verifybtn, { backgroundColor: Otp.length != 6 ? "gray" : "black" }]}
        onPress={verifyOtp}
        disabled={Otp.length != 6 ? true : false}
      >
        <Text style={{
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center"
        }}>Verify</Text>
      </Pressable>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  container: {
    backgroundColor: "#e6f7fa",
    flex: 1,
    height: 785
  },
  heading: {
    marginTop: 80
  },
  otpBox: {
    height: 47,
    width: 47,
    borderBottomWidth: 2,
    borderWidth: 2,
    borderRadius: 8,
    textAlign: "center",
  },
  verifybtn: {
    height: 50,
    width: 230,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#262424",
    marginHorizontal: 60,
    marginTop: 30
  },
  resendOtp: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 5,
    textDecorationLine: "underline"
  }
})
export default OtpScreen;