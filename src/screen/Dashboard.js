import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, FlatList, Image, Modal } from 'react-native';
import { firebase } from '../../config';
import { useCart } from './CartContext'; // Ensure path is correct
import { useIsFocused } from '@react-navigation/native'; 
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from "../utils/color";

const Dashboard = ({ route }) => {
  const { addToCart } = useCart(); // This should now correctly fetch the addToCart function
  const [name, setName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([
    { id: '1', name: 'Haruharu Wonder Black Rice Cleansing Gel', price: '239', image: require('../assets/image1.png') },
    { id: '2', name: 'Haruharu Wonder Black Rice Moisture Airyfit Daily Sunscreen Pa++++ Spf50+ 50ml', price: '340.99', image: require('../assets/image2.png') },
    { id: '3', name: 'Black Rice Bakuchiol Eye Cream', price: '250', image: require('../assets/image3.png') },
    { id: '4', name: 'COSRX Advanced Snail 96 Mucin Power Essence 100ml', price: '430', image: require('../assets/image4.png') },
    { id: '5', name: 'Anua Heartleaf Pore Control Cleansing Oil - 200ml Bnib Brand In Box', price: '20', image: require('../assets/image5.png') },
    { id: '6', name: 'ANUA Heartleaf Quercetinol Pore Deep Cleansing Foam, 5_07 fl oz (150 ml)', price: '30', image: require('../assets/image6.png') },
    { id: '7', name: 'Anua - Niacinamide 10% + TXA 4% serum 30ml', price: '30', image: require('../assets/image7.png') },
    { id: '8', name: 'COSRX Advanced Snail 96 Mucin Power Essence 100ml', price: '30', image: require('../assets/image8.png') },
  ]);
  const [modalVisible, setModalVisible] = useState(false);

  const isFocused = useIsFocused(); 
  const navigation = useNavigation();
  
  useEffect(() => {
    if (isFocused) {
      if (route.params?.updatedUsername) {
        setName(route.params.updatedUsername);
      } else {
        firebase.firestore().collection('users')
          .doc(firebase.auth().currentUser.uid).get()
          .then((snapshot) => {
            if (snapshot.exists) {
              setName(snapshot.data().username);
            } else {
              console.log('User does not exist');
            }
          });
      }
    }
  }, [isFocused, route.params?.updatedUsername]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (item) => {
    addToCart(item); // Call addToCart from CartContext
  };

  const navigateToProductReview = (product) => {
    // Pass only serializable data
    navigation.navigate('ProductReview', {
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      productImage: product.image,
    });
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <TouchableOpacity onPress={() => navigateToProductReview(item)}>
        <Image source={item.image} style={styles.productImage} />
      </TouchableOpacity>
      
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>R{item.price}</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.menuButton}>
          <Ionicons name="menu" size={30} color="#4E5B61" />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={22} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search for skincare products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <Text style={styles.greeting}>Welcome, {name}</Text>

      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.productGrid}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                navigation.navigate('ProfileScreen');
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                navigation.navigate('ShoppingCart'); // Make sure ShoppingCart is defined in your navigator
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signOutButton}
              onPress={() => {
                firebase.auth().signOut();
                setModalVisible(false);
              }}
            >
              <Text style={styles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Ionicons name="close" size={30} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 40,
  },
  menuButton: {
    marginRight: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  searchIcon: {
    position: 'absolute',
    right: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4E5B61',
    marginLeft: 20,
  },
  productGrid: {
    paddingHorizontal: 20,
  },
  productCard: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 8,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  productImage: {
    width: 115,
    height: 151,
    marginBottom: 10,
    borderRadius: 8,
  },
  productName: {
    fontSize: 10, // Adjusted from 8 to 14 for better readability
    fontWeight: 'bold',
    color: '#4E5B61',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#4E5B61',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18, // Adjusted for better visibility
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    backgroundColor: '#87BBA2',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  signOutButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  signOutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    marginTop: 10,
  },
});







