import { View, Text, Image, Pressable, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../app/config';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native'; // Add this

const Header = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleProfile = () => {
    setMenuVisible(!menuVisible); // Toggle menu visibility
  };

  const fetchData = async () => {
    try {
      const email = await AsyncStorage.getItem('userEmail');
      if (email) {
        const userDoc = doc(db, 'users', email);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } else {
        console.log('No email found in AsyncStorage');
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch the data whenever the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchData(); // This will trigger every time the screen is focused
    }, [])
  );

  // Functions for each button
  const handleProfilePress = () => {
    router.push("screens/profile");
    setMenuVisible(false); // Close menu after action
  };

  const handleSettingsPress = () => {
    router.push("screens/settings");
    setMenuVisible(false); // Close menu after action
  };

  const handleLogoutPress = async () => {
    await AsyncStorage.removeItem('isLoggedIn'); // Clear the login status
    await AsyncStorage.removeItem('userEmail'); // Clear the logged in email
    router.replace('auth/login');
    setMenuVisible(false); // Close menu after action
  };

  // Hide the menu when clicking outside of it
  const handleOutsidePress = () => {
    if (menuVisible) {
      setMenuVisible(false); // Close the menu if it's open
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={{ backgroundColor: "#2f3030", height: 100, justifyContent: "flex-end" }}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 30, marginLeft: 15,  }}>TALK</Text>

          <Pressable onPress={handleProfile}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" style={{ marginRight: 16, marginBottom: 10 }} />
            ) : (
              <Image
                source={userDetails?.profileImage
                  ? { uri: userDetails.profileImage }
                  : require("../assets/images/icon.png")}
                style={{
                  width: 45,
                  height: 45,
                  borderWidth: 1.5,
                  borderColor: "white",
                  borderRadius: 50,
                  marginBottom: 10,
                  marginRight: 16,
                }}
              />
            )}
          </Pressable>
        </View>

        {/* Dropdown menu */}
        {menuVisible && (
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={{
              position: "absolute",
              right: 16,
              top: 80,
              backgroundColor: "#e6f7fa",
              borderRadius: 4,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 5,
              zIndex: 1,
              width: 115,
              height: 150,
              gap: 19,
              justifyContent: "center"
            }}>
              <TouchableOpacity onPress={handleProfilePress}>
                <Text style={{ fontSize: 22, textAlign: "center" }}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSettingsPress}>
                <Text style={{ fontSize: 22, textAlign: "center" }}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogoutPress}>
                <Text style={{ fontSize: 22, color: 'red', textAlign: "center" }}>Logout</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
  menubtn: {
    height: 40,
    justifyContent: "center"
  }
});

export default Header;
