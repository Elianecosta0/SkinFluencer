import React, { useState, useRef } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  View,
  Switch,
  Modal,
  Animated,
  PanResponder,
} from 'react-native';
import AddAccountScreen from './AddAccountScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { firebase } from '../../config'; // Adjust the import path as needed
import {colors} from "../utils/color"

export default function SettingScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false); // Initialize modal visibility state
  const [isDarkMode, setIsDarkMode] = useState(false); // Initialize dark mode state
  const pan = useRef(new Animated.ValueXY()).current; // Animated value for modal position
  const [modalHeight, setModalHeight] = useState(0); // Modal height state

  const toggleTheme = () => setIsDarkMode(previousState => !previousState); // Toggle theme function

  const handleLogin = () => {
    setIsModalVisible(false); // Close modal
    navigation.navigate('Profile'); // Navigate to Profile screen
  };

  const handleGoBack = ()=>{
    navigation.goBack();
}

  // Function to handle log out
  const handleLogout = async () => {
    try {
      await firebase.auth().signOut(); // Call Firebase sign out method
      navigation.navigate('Login'); // Navigate to Login screen after successful sign out
    } catch (error) {
      console.error('Error logging out:', error);
      // Optionally, show an error message to the user
    }
  };

  // PanResponder for drag gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, { dy }) => {
        if (dy > 150) {
          // Dragged down sufficiently, close modal
          setIsModalVisible(false);
        } else {
          // Reset position
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <SafeAreaView style={[styles.safeArea, isDarkMode && styles.darkMode]}>
      <ScrollView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <TouchableOpacity style={styles.backButtonWraper} onPress={handleGoBack}>
                <Ionicons name={"chevron-back-sharp"} color={"black"}  size={30}/>
               
               


            </TouchableOpacity>
        <Text style={[styles.header, isDarkMode && styles.darkHeader]}>Settings</Text>

        <Text style={[styles.sectionTitle, isDarkMode && styles.darkSectionTitle]}>Account</Text>
        <View style={[styles.sectionContainer, styles.shadow, isDarkMode && styles.darkSectionContainer]}>
          {renderAccountOption('person', 'Edit Profile', 'Profile', navigation, isDarkMode)}
          {renderAccountOption('shield', 'Security', 'Security', navigation, isDarkMode)}
          {renderAccountOption('notifications', 'Notifications', 'Notification', navigation, isDarkMode)}
          {renderAccountOption('lock-closed', 'Privacy', 'Privacy', navigation, isDarkMode)}
        </View>

        <Text style={[styles.sectionTitle, isDarkMode && styles.darkSectionTitle]}>Support & About</Text>
        <View style={[styles.sectionContainer, styles.shadow, isDarkMode && styles.darkSectionContainer]}>
          {renderAccountOption('receipt', 'Order History', 'OrderHistory', navigation, isDarkMode)}
          {renderAccountOption('help-circle', 'Help & Support', 'HelpSupport', navigation, isDarkMode)}
          {renderAccountOption('information-circle', 'Terms and Policies', 'TermsPolicies', navigation, isDarkMode)}
        </View>

        <Text style={[styles.sectionTitle, isDarkMode && styles.darkSectionTitle]}>Actions</Text>
        <View style={[styles.sectionContainer, styles.shadow, isDarkMode && styles.darkSectionContainer]}>
          {renderAccountOption('flag', 'Report a Problem', 'Report', navigation, isDarkMode)}

          <View style={styles.switchContainer}>
            <Ionicons name="moon" size={24} color={isDarkMode ? '#869F9C' : '#869F9C'} />
            <Text style={[styles.switchLabel, isDarkMode && styles.darkSwitchLabel]}>Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: '#ccc', true: '#333' }}
              thumbColor={isDarkMode ? '#fff' : '#f4f3f4'}
            />
          </View>

          <TouchableOpacity style={styles.accountOption} onPress={() => setIsModalVisible(true)}>
            <Ionicons name='people' size={24} color={isDarkMode ? '#869F9C' : '#869F9C'} />
            <Text style={[styles.optionText, isDarkMode && styles.darkOptionText]}>Add Account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.accountOption} onPress={handleLogout}>
            <Ionicons name='log-out' size={24} color={isDarkMode ? '#869F9C' : '#869F9C'} />
            <Text style={[styles.optionText, isDarkMode && styles.darkOptionText]}>Log Out</Text>
          </TouchableOpacity>

          {renderAccountOption('trash', 'Delete Account', 'DeleteAccount', navigation, isDarkMode, '#ff6f6f')}
        </View>
      </ScrollView>

      <Modal
        animationType="none"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Animated.View
          style={[
            styles.modalBackground,
            { transform: [{ translateY: pan.y }] }
          ]}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setModalHeight(height);
          }}
          {...panResponder.panHandlers}
        >
          <AddAccountScreen handleLogin={handleLogin} />
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
}

// Reusable function to render each option
const renderAccountOption = (iconName, text, route, navigation, isDarkMode, color = '#869F9C') => (
  <TouchableOpacity style={styles.accountOption} onPress={() => navigation.navigate(route)}>
    <Ionicons name={iconName} size={24} color={color} />
    <Text style={[styles.optionText, isDarkMode && styles.darkOptionText, color === '#ff6f6f' && { color }]}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  darkMode: {
    backgroundColor: '#333',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  backButtonWraper:{
    height: 50,
    width: 50,
    backgroundColor: colors.white,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 10,
    
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
},
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 26,
    marginTop: 40,
    marginBottom: 20,
    color: '#869F9C',
  },
  darkHeader: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#869F9C',
  },
  darkSectionTitle: {
    color: '#fff',
  },
  sectionContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  darkSectionContainer: {
    backgroundColor: '#444',
  },
  accountOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#869F9C',
  },
  darkOptionText: {
    color: '#ccc',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: '#869F9C',
    marginLeft: 10,
    marginRight: 10,
  },
  darkSwitchLabel: {
    color: '#ccc',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
