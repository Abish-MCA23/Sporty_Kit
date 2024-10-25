import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import config from './config';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${config.BASE_URL}/products`);
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleUpdateProduct = (productId) => {
        navigation.navigate('UpdateProductForm', { productId });
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#D4AF37" />; // Golden yellow for the loading indicator
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.productContainer}>
                        <Text style={styles.productText}>{item.name}</Text>
                        <TouchableOpacity style={styles.updateButton} onPress={() => handleUpdateProduct(item._id)}>
                            <Text style={styles.updateButtonText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'black', // Black background for the entire list
    },
    productContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#D4AF37', // Golden yellow border for separation
    },
    productText: {
        fontSize: 18,
        color: '#D4AF37', // Golden yellow text for product names
    },
    updateButton: {
        backgroundColor: '#D4AF37', // Golden yellow background for the button
        padding: 10,
        borderRadius: 5,
    },
    updateButtonText: {
        color: 'black', // Black text on golden button
        fontWeight: 'bold',
    },
});

export default ProductList;
