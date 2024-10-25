import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './config';
import { useUser } from './UserContext';
import { useIsFocused } from '@react-navigation/native';

export default function Profile({ navigation }) {
  const { user, setUser } = useUser(); // Access user context
  const [address, setAddress] = useState(null);
  const userId = user?.id; // Get user ID from context
  const isFocused = useIsFocused(); // Detect when screen is in focus
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150'); // Default image

  // Ensure the profile image updates when the user context changes
  useEffect(() => {
    if (user) {
      setProfileImage(user.profileImage || 'https://via.placeholder.com/150');
    }
  }, [user]);

  // Fetch profile data when the screen is focused
  useEffect(() => {
    if (isFocused) {
      fetchProfile();
    }
  }, [isFocused]);

  const fetchProfile = async () => {
    if (!userId) return; 
    try {
      const response = await axios.get(`${config.BASE_URL}/profile/${userId}`);
      const { username, email, profileImage: newProfileImage, paymentDetails } = response.data;

      const updatedUser = { ...user, username, email, profileImage: newProfileImage };
      setUser(updatedUser);

      if (newProfileImage) {
        setProfileImage(newProfileImage);
      }

      if (paymentDetails && paymentDetails.length > 0) {
        setAddress(paymentDetails[0].address);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to load profile data.');
    }
  };

  const handleLogout = async () => {
    try {
      // Clear the authentication token from AsyncStorage
      await AsyncStorage.removeItem('token');

      // Clear user context
      setUser(null);

      // Show confirmation alert
      Alert.alert('Logged out', 'You have been logged out.', [
        { text: 'OK', onPress: () => navigation.replace('SignIn') },
      ]);
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {profileImage && (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      )}
      <Text style={styles.username}>{user?.username}</Text>
      <Text style={styles.email}>{user?.email}</Text>
      {address && (
        <View style={styles.addressContainer}>
          <Text style={styles.addressHeader}>Address:</Text>
          <Text style={styles.addressText}>{address.name}</Text>
          <Text style={styles.addressText}>{address.addressLine}</Text>
          <Text style={styles.addressText}>{address.city}, {address.state} {address.zip}</Text>
        </View>
      )}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000', // Black background
    alignItems: 'center', // Center items horizontally
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700', // Golden yellow text
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: '#FFD700', // Golden yellow text
    marginBottom: 20,
  },
  addressContainer: {
    marginBottom: 20,
    alignItems: 'flex-start', // Align address text to the left
  },
  addressHeader: {
    fontWeight: 'bold',
    color: '#FFD700', // Golden yellow text
  },
  addressText: {
    color: '#FFD700', // Golden yellow text
  },
  button: {
    backgroundColor: '#FFD700', // Golden yellow button
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%', // Make buttons full-width
  },
  buttonText: {
    color: '#000', // Black text for button
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
