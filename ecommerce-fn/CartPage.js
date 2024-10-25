import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useUser } from './UserContext';

export default function CartPage({ route, navigation }) {
  const { cart } = route.params; 
  const { user } = useUser(); // Access the user object from the context
  
  // Function to calculate the total amount
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2); // Sum of item prices
  };

  const handleOrderNow = () => {
    if (cart.length === 0) {
      Alert.alert('Empty Cart', 'You have no items in your cart.');
      return;
    }
    
    if (!user || !user.id) {
      Alert.alert('Error', 'No user ID found.');
      return;
    }

    const totalAmount = calculateTotalAmount(); // Get the total amount

    console.log(cart, user.id, totalAmount); // Make sure both the cart, user ID, and total amount are passed
    navigation.navigate('Payment', { cart, userId: user.id, totalAmount }); // Pass totalAmount along with cart and userId
  };
  
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.priceText}>Price: ${item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyMessage}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()} 
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total Amount: ${calculateTotalAmount()}</Text>
          </View>
        </>
      )}
      <TouchableOpacity style={styles.orderButton} onPress={handleOrderNow}>
        <Text style={styles.orderButtonText}>Order Now</Text>
      </TouchableOpacity> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black', // Black background for the entire container
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#D4AF37', // Golden yellow color for title
  },
  itemContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#D4AF37', // Golden yellow border for item
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#333', // Dark background for items
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D4AF37', // Golden yellow for item title
  },
  priceText: {
    color: '#D4AF37', // Golden yellow for price text
  },
  emptyMessage: {
    fontSize: 16,
    color: '#D4AF37', // Golden yellow for empty message
    textAlign: 'center',
  },
  totalContainer: {
    marginTop: 10,
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#D4AF37', // Golden yellow border for total container
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#D4AF37', // Golden yellow for total amount
  },
  orderButton: {
    backgroundColor: '#D4AF37', // Golden yellow background for order button
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  orderButtonText: {
    color: 'black', // Black text for order button
    fontWeight: 'bold',
    fontSize: 16,
  },
});
