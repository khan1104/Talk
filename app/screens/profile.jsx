import { View, Text, Image, SafeAreaView, Pressable, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db, storage } from '../config'; // Import Firestore and Storage
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [newEmail, setNewEmail] = useState("");
  const [isUploading, setIsUploading] = useState(false); // State for tracking image upload

  const fetchData = async () => {
    try {
      const email = await AsyncStorage.getItem('userEmail');
      setNewEmail(email);
      if (email) {
        const userDoc = doc(db, 'users', email);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          console.log("User found");
        } else {
          console.log('No such document!');
        }
      } else {
        console.log('No email found in AsyncStorage');
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      await uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (imageUri) => {
    setIsUploading(true); // Show loader while uploading
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);

    const storageRef = ref(storage, `profile_images/${filename}`);
    try {
      await uploadBytes(storageRef, blob);
      const imageUrl = await getDownloadURL(storageRef);
      await updateDoc(doc(db, 'users', newEmail), {
        profileImage: imageUrl,
      });
      setUserDetails((prev) => ({ ...prev, profileImage: imageUrl })); // Update local state with new image
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false); // Hide loader after upload
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <View style={{
        justifyContent: "flex-end",
        height: 100,
        padding: 10
      }}>
        <Text style={{
          fontSize: 35,
          fontWeight: "bold",
        }}>My Profile</Text>
      </View>

      {/* Profile Image with Loader */}
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 35 }}>
        {isUploading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Image
            source={userDetails?.profileImage
              ? { uri: userDetails.profileImage }
              : require("../../assets/images/icon.png")}
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              borderWidth: 1.5,
              borderColor: "black",
            }}
          />
        )}
      </View>

      <View>
        <Text style={{
          fontSize: 35,
          textAlign: "center",
          marginTop: 10
        }}>{userDetails?.user || 'User Name'}</Text>
        <Text style={{
          fontSize: 20,
          textAlign: "center",
          marginTop: 10
        }}>{userDetails?.mail || 'User Email'}</Text>
      </View>

      <View style={{
        justifyContent: "flex-end",
        height: 150,
        margin: "auto"
      }}>
        <Pressable style={{
          borderColor: "black",
          borderWidth: 2,
          height: 50,
          width: 230,
          borderRadius: 25,
          backgroundColor: "#262424",
          justifyContent: "center",
        }} onPress={pickImage} disabled={isUploading}>
          <Text style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            color: "white"
          }}>
            {isUploading ? 'Updating...' : 'Update Image'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
