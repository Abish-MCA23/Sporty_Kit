import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AdminProductManagement = () => {
    const navigation = useNavigation();

    const handleAddProduct = () => {
        navigation.navigate('AddProductForm');
    };

    const handleUpdateProduct = () => {
        navigation.navigate('ProductList');
    };

    const handleDeleteProduct = () => {
        navigation.navigate('DeleteProductForm');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
                <Text style={styles.buttonText}>Add Product</Text>
            </TouchableOpacity>
            <View style={styles.spacer} />
            <TouchableOpacity style={styles.button} onPress={handleUpdateProduct}>
                <Text style={styles.buttonText}>Update Product</Text>
            </TouchableOpacity>
            <View style={styles.spacer} />
            <TouchableOpacity style={styles.button} onPress={handleDeleteProduct}>
                <Text style={styles.buttonText}>Delete Product</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', // Center align buttons
        padding: 16,
        backgroundColor: 'black', // Black background
    },
    button: {
        backgroundColor: '#D4AF37', // Golden yellow background
        padding: 15,
        borderRadius: 10,
        width: '100%',
        maxWidth: 300,
        alignItems: 'center',
        shadowColor: '#FFD700', // Golden shadow for depth
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5, // Shadow elevation for a material design effect
    },
    buttonText: {
        color: '#000', // Black text on golden button
        fontSize: 18,
        fontWeight: 'bold',
    },
    spacer: {
        height: 20, // Spacing between buttons
    },
});

export default AdminProductManagement;
