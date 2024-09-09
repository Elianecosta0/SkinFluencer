import React from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, View, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function TermsAndPolicies() {
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
        <Text style={styles.header}>Terms And Policies</Text>

        {/* Privacy Policy Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Privacy Policy</Text>
          <Text style={styles.sectionText}>
            We value your privacy. Learn how we collect, use, and share your data to provide personalized skincare recommendations. 
            [Read more...](https://example.com/privacy)
          </Text>
        </View>

        {/* Terms of Service Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Terms of Service</Text>
          <Text style={styles.sectionText}>
            By using our app, you agree to the following terms and conditions. [Read more...](https://example.com/terms)
          </Text>
        </View>

        {/* Cookie Policy Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Cookie Policy</Text>
          <Text style={styles.sectionText}>
            This app uses cookies to enhance your experience and analyze site traffic. [Read more...](https://example.com/cookies)
          </Text>
        </View>

        {/* Data Protection Rights Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Your Data Protection Rights</Text>
          <Text style={styles.sectionText}>
            You have the right to request access to, correction, or deletion of your personal data. 
            Contact us at [support@example.com](mailto:support@example.com) for more information.
          </Text>
        </View>

        {/* Content Disclaimer Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Content Disclaimer</Text>
          <Text style={styles.sectionText}>
            The skincare recommendations provided by this app are for informational purposes only and are not a substitute 
            for professional medical advice. Please consult a dermatologist for specific skin concerns.
          </Text>
        </View>

        {/* Contact Information Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.sectionText}>
            If you have any questions or concerns about our Terms and Policies, please contact us at 
            [support@example.com](mailto:support@example.com).
          </Text>
        </View>
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
    paddingHorizontal: 10,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
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
    marginTop: 40,
    color: '#869F9C',
  },
  sectionContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#869F9C',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 10,
  },
});
