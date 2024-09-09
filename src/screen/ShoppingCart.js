import React, { useState } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../utils/color'; // Adjust the path as needed
import { useCart } from './CartContext';
import Ionicons from "react-native-vector-icons/Ionicons";

const ShoppingCart = ({ route, navigation }) => {
  const { cartItems, addToCart, removeFromCart, updateCartItem } = useCart(); 

  const handleGoBack = () => {
    navigation.goBack();
  };

  // Aggregate items by ID and count quantity
  const aggregatedItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  // Function to calculate the total price
  const calculateTotal = () => {
    return aggregatedItems.reduce((total, item) => {
      // Ensure item.price is a string and handle undefined or invalid values
      const priceString = item.price ? item.price.toString() : '0';
      const price = parseFloat(priceString.replace('R', '')) || 0;
      return total + price * item.quantity;
    }, 0).toFixed(2);
  };

  const handleAdd = (item) => {
    addToCart(item);
  };

  const handleRemove = (item) => {
    removeFromCart(item);
  };

  // Decrease item quantity
  const decreaseQuantity = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem.quantity > 1) {
      const updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 };
      updateCartItem(updatedItem); // Update the item with the new quantity
    } else {
      removeFromCart(item); // If quantity is 1, remove the item completely
    }
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.cartImage} />
      <View style={styles.cartDetails}>
        <Text style={styles.cartName}>{item.name}</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleAdd(item)}
          >
            <Ionicons name="caret-up" size={20} color="blue" />
          </TouchableOpacity>
          <Text style={styles.cartQuantity}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => decreaseQuantity(item)}
          >
            <Ionicons name="caret-down" size={20} color="blue" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <Text style={styles.cartPrice}>R{item.price}</Text>
        <TouchableOpacity
          style={styles.binButton}
          onPress={() => handleRemove(item)}
        >
          <Ionicons name="trash-bin-outline" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButtonWraper} onPress={handleGoBack}>
          <Ionicons name={"chevron-back-sharp"} color={"black"} size={30} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
      </View>

      <View style={styles.itemsContainer}>
        <FlatList
          data={aggregatedItems}
          renderItem={renderCartItem}
          keyExtractor={item => item.id}
          ListFooterComponent={
            <View style={styles.footer}>
              <Text style={styles.totalText}>Total: R{calculateTotal()}</Text>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => {
                  // Navigate to checkout screen or handle checkout logic
                }}
              >
                <Text style={styles.checkoutButtonText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </View>
  );
};

export default ShoppingCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 60,
  },
  backButtonWraper: {
    height: 50,
    width: 50,
    backgroundColor: colors.white,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 40,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    marginTop: 10,
  },
  cartImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  cartDetails: {
    flex: 1,
  },
  cartName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4E5B61',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    padding: 5,
  },
  cartQuantity: {
    fontSize: 14,
    color: '#4E5B61',
    marginHorizontal: 10,
  },
  actionsContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartPrice: {
    fontSize: 16,
    color: '#4E5B61',
    fontWeight: 'bold',
  },
  binButton: {
    marginTop: 10,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4E5B61',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});








