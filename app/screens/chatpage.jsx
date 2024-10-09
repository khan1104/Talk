import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../config';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatPage = () => {
  const route = useRoute();
  const { details, chatId } = route.params;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState('');

  useEffect(() => {
    const fetchCurrentUserEmail = async () => {
      const email = await AsyncStorage.getItem('userEmail');
      setCurrentUserEmail(email);
    };

    fetchCurrentUserEmail();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'chats'), where('chatId', '==', chatId)),
      (querySnapshot) => {
        const messagesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Sort messages by timestamp in ascending order
        messagesList.sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis());
        setMessages(messagesList);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async () => {
    if (message.trim()) {
      await addDoc(collection(db, 'chats'), {
        chatId,
        text: message,
        sender: currentUserEmail,
        timestamp: new Date(), // Ensure the timestamp is captured
      });
      setMessage('');
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.sender === currentUserEmail ? styles.myMessage : styles.otherMessage
            ]}
          >
            {item.sender !== currentUserEmail && (
              <Image
                source={{ uri: details.profileImage }} // Profile image of the sender
                style={styles.profileImage}
              />
            )}
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Image source={require('../../assets/images/send.jpg')} style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    maxWidth: '70%',
    borderRadius: 15,
    padding: 10,
    marginHorizontal: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  myMessage: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end', // Align my messages to the right
  },
  otherMessage: {
    backgroundColor: '#f1f0f0',
    alignSelf: 'flex-start', // Align other messages to the left
  },
  messageText: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#f1f0f0',
    marginRight: 10,
  },
  sendButton: {
    padding: 5,
  },
  sendIcon: {
    width: 25,
    height: 25,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
});

export default ChatPage;
