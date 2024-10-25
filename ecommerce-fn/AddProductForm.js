import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import config from './config';

const AddProductForm = () => {
    const navigation = useNavigation();
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [benefits, setBenefits] = useState('');
    const [image, setImage] = useState('');

    const handleAddProduct = async () => {
        try {
            const newProduct = {
                name: productName,
                description,
                price,
                ingredients,
                benefits,
                image,
            };

            const response = await axios.post(`${config.BASE_URL}/products`, newProduct); 
            Alert.alert('Product Added!', `Product Name: ${response.data.name}`);
            navigation.navigate('AdminProductManagement');
        } catch (error) {
            Alert.alert('Error', 'There was an issue adding the product.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Product Name"
                value={productName}
                onChangeText={setProductName}
                placeholderTextColor="#D4AF37"
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                placeholderTextColor="#D4AF37"
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                placeholderTextColor="#D4AF37"
            />
            <TextInput
                style={styles.input}
                placeholder="Category"
                value={ingredients}
                onChangeText={setIngredients}
                placeholderTextColor="#D4AF37"
            />
            <TextInput
                style={styles.input}
                placeholder="size"
                value={benefits}
                onChangeText={setBenefits}
                placeholderTextColor="#D4AF37"
            />
            <TextInput
                style={styles.input}
                placeholder="Image URL"
                value={image}
                onChangeText={setImage}
                placeholderTextColor="#D4AF37"
            />
            <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
                <Text style={styles.buttonText}>Add Product</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: 'black', // Black background for the form
    },
    input: {
        height: 50,
        borderColor: '#D4AF37', // Golden yellow border
        borderWidth: 2, // Thicker border for visibility
        marginBottom: 12,
        paddingLeft: 10,
        borderRadius: 8, // Rounded corners for input fields
        backgroundColor: '#1C1C1C', // Dark background for input fields
        color: '#FFF', // White text for contrast
    },
    button: {
        backgroundColor: '#D4AF37', // Golden yellow background for the button
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        maxWidth: 300,
        marginTop: 20,
        elevation: 5, // Shadow for the button
    },
    buttonText: {
        color: 'black', // Black text on golden button
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddProductForm;
