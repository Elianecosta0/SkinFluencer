import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prevCartItems => [...prevCartItems, item]);
  };

  const removeFromCart = (item) => {
    setCartItems(prevCartItems =>
      prevCartItems.filter(cartItem => cartItem.id !== item.id)
    );
  };

  // Function to update the quantity of a specific cart item
  const updateCartItem = (updatedItem) => {
    setCartItems(prevCartItems =>
      prevCartItems.map(cartItem =>
        cartItem.id === updatedItem.id ? updatedItem : cartItem
      )
    );
  };

  const totalItems = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItem, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);



