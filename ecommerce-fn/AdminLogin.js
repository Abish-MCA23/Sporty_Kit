import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';

const AdminLogin = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (email === 'admin@gmail.com' && password === 'admin123') {
            Alert.alert('Login Successful!');
            navigation.navigate('AdminProductManagement'); 
        } else {
            Alert.alert('Invalid credentials, please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#B0B0B0" // Light gray for placeholder text
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#B0B0B0" // Light gray for placeholder text
            />
            <View style={styles.buttonContainer}>
                <Button title="Login" onPress={handleLogin} color="#D4AF37" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'black', // Black background
    },
    title: {
        fontSize: 32, // Larger title for better emphasis
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#D4AF37', // Golden yellow for the title
        textTransform: 'uppercase', // Uppercase for a striking look
        letterSpacing: 2, // Spacing for a sleek, modern style
        textAlign: 'center', // Center text alignment for title
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
    buttonContainer: {
        width: '100%',
        maxWidth: 350,
        borderRadius: 10,
        overflow: 'hidden', // Ensures button's border radius is applied
    },
    linkText: {
        color: '#D4AF37', // Golden yellow link text for the link
        marginTop: 20,
        fontSize: 16,
    },
});

export default AdminLogin;
