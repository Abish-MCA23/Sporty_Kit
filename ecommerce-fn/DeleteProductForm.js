import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import config from './config';

const DeleteProductForm = () => {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${config.BASE_URL}/products`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            const response = await fetch(`${config.BASE_URL}/products/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                Alert.alert('Product Deleted');
                fetchProducts();
                navigation.navigate('AdminProductManagement');
            } else {
                Alert.alert('Error deleting product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const renderProduct = ({ item }) => (
        <View style={styles.productContainer}>
            <Text style={styles.productText}>{item.name}</Text>
            <Button
                title="Delete"
                color="#D4AF37" // Golden yellow color for the button
                onPress={() => handleDeleteProduct(item._id)}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Product List</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item._id}
                renderItem={renderProduct}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'black', // Black background for the entire form
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#D4AF37', // Golden yellow text for the title
    },
    productContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#D4AF37', // Golden yellow border for separation
    },
    productText: {
        fontSize: 18,
        color: '#D4AF37', // Golden yellow text for product names
    },
});

export default DeleteProductForm;
