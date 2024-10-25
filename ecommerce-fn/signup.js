import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import config from './config';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return;
    }

    try {
      await axios.post(`${config.BASE_URL}/signup`, { email, password });
      Alert.alert('Sign Up', 'Sign up successful! Please sign in.');
      navigation.navigate('SignIn'); // Corrected 'signin' to 'SignIn'
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.error || 'Something went wrong';
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        placeholderTextColor="#D4AF37"
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.linkText}>Already have an account? Sign In</Text>
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
    backgroundColor: 'black', // Golden yellow background
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

