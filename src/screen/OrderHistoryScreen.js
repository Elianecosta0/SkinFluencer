import React from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function OrderHistoryScreen() {
  const navigation = useNavigation(); 

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7} 
        >
          <Ionicons name="arrow-back" size={20} color="#869F9C" />
        </TouchableOpacity>
        <Text style={styles.header}>Order History</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10, // Optional padding for content
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10, // Ensure button is above other elements
    width: 40,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  header: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 26,
    marginTop: 40, // Adjust to avoid overlap
    color: '#869F9C',
  },
});
