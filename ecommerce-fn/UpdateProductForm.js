import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import config from './config';

const UpdateProductForm = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { productId } = route.params;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [benefits, setBenefits] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${config.BASE_URL}/products/${productId}`);
                const product = await response.json();

                if (response.ok) {
                    setName(product.name);
                    setDescription(product.description);
                    setPrice(product.price.toString());
                    setIngredients(product.ingredients.join(', '));
                    setBenefits(product.benefits.join(', '));
                    setImage(product.image);
                } else {
                    throw new Error('Failed to fetch product');
                }
            } catch (error) {
                Alert.alert('Error', 'Could not fetch product details');
            }
        };
        fetchProduct();
    }, [productId]);

    const handleUpdateProduct = async () => {
        const updatedProduct = {
            name,
            description,
            price: parseFloat(price),
            ingredients: ingredients.split(',').map((ingredient) => ingredient.trim()),
            benefits: benefits.split(',').map((benefit) => benefit.trim()),
            image,
        };

        try {
            const response = await fetch(`${config.BASE_URL}/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            if (response.ok) {
                Alert.alert('Success', 'Product updated successfully!');
                navigation.navigate('ProductList'); 
            } else {
                throw new Error('Failed to update product');
            }
        } catch (error) {
            Alert.alert('Error', 'Could not update product');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Product Name"
                placeholderTextColor="#D4AF37" // Golden yellow placeholder text
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                placeholderTextColor="#D4AF37" // Golden yellow placeholder text
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                keyboardType="numeric"
                placeholderTextColor="#D4AF37" // Golden yellow placeholder text
                value={price}
                onChangeText={setPrice}
            />
            <TextInput
                style={styles.input}
                placeholder="Ingredients (comma-separated)"
                placeholderTextColor="#D4AF37" // Golden yellow placeholder text
                value={ingredients}
                onChangeText={setIngredients}
            />
            <TextInput
                style={styles.input}
                placeholder="Benefits (comma-separated)"
                placeholderTextColor="#D4AF37" // Golden yellow placeholder text
                value={benefits}
                onChangeText={setBenefits}
            />
            <TextInput
                style={styles.input}
                placeholder="Image URL"
                placeholderTextColor="#D4AF37" // Golden yellow placeholder text
                value={image}
                onChangeText={setImage}
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdateProduct}>
                <Text style={styles.buttonText}>Update Product</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

export default UpdateProductForm;
