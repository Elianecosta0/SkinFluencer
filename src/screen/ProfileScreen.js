import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, View, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from "../utils/color"
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../../config';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      setUser(currentUser);
      setEmail(currentUser.email);

      // Fetch username from Firestore
      const fetchUsername = async () => {
        const userDoc = await firebase.firestore().collection('users').doc(currentUser.uid).get();
        if (userDoc.exists) {
          setUsername(userDoc.data().username);
          setProfileImage(userDoc.data().profileImage); // Assuming you store the profile image URL
        }
      };
      fetchUsername();
    }
  }, []);
  const handleGoBack = ()=>{
    navigation.goBack();
}

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    try {
      // Update Firebase Authentication email
      await user.updateEmail(email);

      // Update Firestore with username and profile image URL if needed
      await firebase.firestore().collection('users').doc(user.uid).set({
        username: username,
        profileImage: profileImage,
      }, { merge: true });

      alert('Changes saved!');
      
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButtonWraper} onPress={handleGoBack}>
                <Ionicons name={"chevron-back-sharp"} color={"black"}  size={30}/>
               
               


            </TouchableOpacity>
        <Text style={styles.header}>Edit Profile</Text>
        <TouchableOpacity style={styles.profilePictureContainer} onPress={handleImagePick}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={styles.profilePicture}
            />
          ) : (
            <Ionicons name="person" size={100} color="#A3BBC0" style={styles.defaultIcon} />
          )}
          <Ionicons name="camera" size={26} color="#A3BBC0" style={styles.cameraIcon} />
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>UserName</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Username" 
            placeholderTextColor='lightgrey' 
            value={username}
            onChangeText={setUsername} 
          />

          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Email" 
            placeholderTextColor='lightgrey' 
            keyboardType="email-address" 
            value={email}
            onChangeText={setEmail} 
          />

        
          
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
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
  },
  profilePictureContainer: {
    alignSelf: 'center',
    marginTop: 30,
    width: 168,
    height: 168,
    borderRadius: 84,
    borderWidth: 2,
    borderColor: '#A3BBC0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    borderRadius: 84,
  },
  defaultIcon: {
    alignSelf: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 7,
    right: 10,
  },
  inputContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#c0c0c0', 
    paddingHorizontal: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButton: {
    backgroundColor: '#A3BBC0',
    paddingVertical: 12,
    paddingHorizontal: 2,
    borderRadius: 8, 
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    marginBottom: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16, 
    fontWeight: 'bold',
  },
});

