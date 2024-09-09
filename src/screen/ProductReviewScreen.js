import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from './CartContext';
import Ionicons from "react-native-vector-icons/Ionicons";
import {colors} from "../utils/color"

const reviews = [
  { id: '1', username: 'JaneDoe', rating: 4, comment: 'Great product!' },
  { id: '2', username: 'JohnSmith', rating: 5, comment: 'Absolutely love it!' },
  // Add more reviews as needed
];

const ProductReviewScreen = ({ route, navigation }) => {
  // Extract data from route params
  const { productId, productName, productPrice, productImage } = route.params;
  const { addToCart } = useCart(); 

  const handleAddToCart = () => {
    addToCart({ id: productId, name: productName, price: productPrice, image: productImage });
    navigation.goBack(); // Optionally go back to the previous screen
  };

  const handleGoBack = ()=>{
    navigation.goBack();
}

  const calculateRatingPercentage = (rating) => (rating / 5) * 100;

  const renderReview = ({ item }) => (
    <View style={styles.reviewContainer}>
      <Text style={styles.username}>{item.username}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>Rating: {item.rating} / 5</Text>
        <View style={styles.ratingBar}>
          <View style={[styles.ratingBarFilled, { width: `${calculateRatingPercentage(item.rating)}%` }]} />
        </View>
      </View>
      <Text style={styles.comment}>{item.comment}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
         <TouchableOpacity style={styles.backButtonWraper} onPress={handleGoBack}>
                <Ionicons name={"chevron-back-sharp"} color={"black"}  size={30}/>
               
               


            </TouchableOpacity>
      <Image source={productImage} style={styles.productImage} />
      <Text style={styles.productName}>{productName}</Text>
      <Text style={styles.productPrice}>R{productPrice}</Text>
      <FlatList
        data={reviews}
        renderItem={renderReview}
        keyExtractor={item => item.id}
        ListHeaderComponent={<Text style={styles.reviewsTitle}>Reviews</Text>}
      />
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={handleAddToCart}
      >
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 200, // Reduced height
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 2,
    resizeMode: 'contain', // Ensures the image fits within the container
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#4E5B61', // Matching with the primary color
  },
  productPrice: {
    fontSize: 20,
    color: '#4E5B61',
    marginBottom: 20,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#4E5B61', // Matching with the primary color
  },
  reviewContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  ratingText: {
    fontSize: 14,
    marginRight: 10,
    color: '#333',
  },
  ratingBar: {
    flex: 1,
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginRight: 10,
    overflow: 'hidden', // Ensure rounded corners for the filled part
  },
  ratingBarFilled: {
    height: '100%',
    backgroundColor: 'gold',
    borderRadius: 5,
  },
  comment: {
    fontSize: 14,
    marginTop: 5,
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  backButtonWraper:{
    height: 50,
    width: 50,
    backgroundColor: colors.white,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 60,
    
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
},
});

export default ProductReviewScreen;



