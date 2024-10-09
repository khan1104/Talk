import { View, Text, FlatList, StyleSheet, Pressable, Image, ActivityIndicator, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';

const Chats = () => {
  const navigation=useNavigation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const email = await AsyncStorage.getItem('userEmail');
      setCurrentUserEmail(email);

      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const filteredUsers = userList.filter(user => user.mail !== email);
      setUsers(filteredUsers);
    } catch (err) {
      setError("Failed to load users.");
      console.error("Error fetching users: ", err);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getAllUsers().then(() => setRefreshing(false)); // Refresh the users list
  };
  const RenderCard = ({ item }) => (
    <Pressable
      style={styles.userItem}
      onPress={() => {
        const chatId = [currentUserEmail, item.mail].sort().join('_'); // Create a unique chat ID
        navigation.navigate("screens/chatpage", { details: item, chatId });
      }}
    >
      {item.profileImage ? (
        <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
      ) : (
        <View style={styles.placeholderImage} />
      )}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.user}</Text>
        <Text style={styles.userEmail}>{item.mail}</Text>
      </View>
    </Pressable>
  );

  useEffect(() => {
    getAllUsers();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  if (users.length === 0) {
    return <Text style={styles.emptyText}>No users available</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => <RenderCard item={item} />}
        keyExtractor={(item) => item.mail}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#e6f7fa",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
});

export default Chats;
