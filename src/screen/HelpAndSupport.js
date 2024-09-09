import React from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, View, Button, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function HelpAndSupport() {
  const navigation = useNavigation(); 

  const handleEmailSupport = () => {
    Linking.openURL('mailto:skinfluencer22@gmail.com?subject=Help and Support');
  };

  // Function to handle call support
  const handleCallSupport = () => {
    Linking.openURL('tel:+27611771298');
  };

  // Function to handle feedback submission
  const handleFeedback = () => {
    // Navigate to feedback form or handle feedback action
  };

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
        <Text style={styles.header}>Help & Support</Text>

        {/* FAQ Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {/* Example FAQ items */}
          <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqText}>How do I reset my password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqText}>How do I contact customer support?</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Support Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Contact Support</Text>
          <Button title="Email Support" onPress={handleEmailSupport} />
          <Button title="Call Support" onPress={handleCallSupport} />
        </View>

        {/* Submit Feedback Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Submit Feedback</Text>
          <Button title="Submit Feedback" onPress={handleFeedback} />
        </View>

        {/* Privacy Policy and Terms of Service */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Policies</Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://example.com/privacy')}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://example.com/terms')}>
            <Text style={styles.linkText}>Terms of Service</Text>
          </TouchableOpacity>
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
    textAlign:'center',
    marginTop: 20,
  },
  faqItem: {
    paddingVertical: 10,
  },
  faqText: {
    fontSize: 16,
    color: '#555555',
  },
  linkText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
    marginVertical: 5,
  },
});
