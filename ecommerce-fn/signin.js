import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import config from './config';
import { useUser } from './UserContext'; 

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { setUser } = useUser();  
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post(`${config.BASE_URL}/signin`, { email, password });
      const { token, userId } = response.data;
      console.log(token, userId);
      await AsyncStorage.setItem('token', token); 
      setUser({ id: userId, name: response.data.name, email: response.data.email });
      Alert.alert('Success', 'Sign-in successful!');
      navigation.navigate('HomePage');
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.error || 'Something went wrong';
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#D4AF37" 
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#D4AF37" 
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Signing In...' : 'Sign In'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'black', // Black background for bold contrast
  },
  title: {
    fontSize: 32, // Slightly larger title for better emphasis
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#D4AF37', // Golden yellow for the title
    textTransform: 'uppercase', // Uppercase for a striking look
    letterSpacing: 2, // Spacing for a sleek, modern style
  },
  input: {
    width: '100%',
    maxWidth: 350,
    padding: 15,
    borderRadius: 10,
    borderWidth: 2, // Thicker border for better visibility
    borderColor: '#D4AF37', // Golden yellow border for inputs
    marginBottom: 20,
    backgroundColor: '#1C1C1C', // Darker input background for elegance
    color: '#FFF', // White text for the input fields to contrast the background
  },
  button: {
    backgroundColor: '#D4AF37', // Golden yellow button background
    padding: 15,
    borderRadius: 10,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    shadowColor: '#FFD700', // Subtle golden shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5, // Shadow elevation for a material design effect
  },
  buttonText: {
    color: '#000', // Black text on the golden button for strong contrast
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#D4AF37', // Golden yellow link text for the link
    marginTop: 20,
    fontSize: 16,
  },
});
