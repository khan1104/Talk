import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const Home = () => {
  const users = [
    { id: '1', name: 'User 1' },
    { id: '2', name: 'User 2' },
    { id: '3', name: 'User 3' },
    { id: '4', name: 'User 4' },
    { id: '5', name: 'User 5' },
    // Add more users as needed
  ];

  const handleProfilePress = () => {
    // Profile press logic here
    console.log('Profile pressed!');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.userItem}>
      <Image
        source={require("../../assets/images/user.png")} // Replace with your user image URL
        style={styles.userImage}
      />
      <Text style={styles.userName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>Talk</Text>
        <TouchableOpacity onPress={handleProfilePress}>
          <Image
            source={require("../../assets/images/user.png")} // Replace with your profile image URL
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#0084ff',
    borderRadius: 10,
    elevation: 4,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginVertical: 4,
    elevation: 2,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
});

export default Home;
