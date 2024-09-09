import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { firebase } from '../../config';
import {colors} from "../utils/color"
import Ionicons from "react-native-vector-icons/Ionicons"
import { SafeAreaView } from 'react-native-safe-area-context'

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleGoBack = ()=>{
        navigation.goBack();
    }

    const handleLogin=()=>{
        navigation.navigate("Login")
    } 

    const handleSendResetEmail = async () => {
        try {
            await firebase.auth().sendPasswordResetEmail(email);
            Alert.alert('Success', 'Password reset email sent! Please check your inbox.');
            navigation.navigate('Login'); // Navigate back to the login screen
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButtonWraper} onPress={handleGoBack}>
                <Ionicons name={"chevron-back-sharp"} color={"black"}  size={30}/>
               
               


            </TouchableOpacity>
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>Don't worry! It occurs. Please enter the email address linked with your account.</Text>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Ionicons name={"mail-outline"} size={25} color={colors.secondary}/>
                    <TextInput style={styles.textInput} placeholder='Enter your email' placeholderTextColor={colors.secondary} 
                    onChangeText={(email) => setEmail(email)} keyboardType='email-address'/>
                </View>
                <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleSendResetEmail}>
                    <Text style={styles.loginText}>Send Reset Email</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footerContainer}>
                <Text style={styles.accountText}>Remenber Password?</Text>
                <TouchableOpacity onPress={handleLogin}>
                    <Text style={styles.signupText}>Login</Text>

                </TouchableOpacity>
                    
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.white,
        
        

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
    logo:{
        height:115,
        width: 400,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems:'center'

    },
    logoContainer: {
       
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
      },

      formContainer:{
        marginTop:1,
      },
      inputContainer:{
        borderWidth:2,
        borderColor: colors.secondary,
        borderRadius:8,
        padding: 15,
        marginLeft: 20,
        marginRight: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems:'center',
        marginTop: 60,
        shadowColor: '#000', // Color of the shadow
        shadowOffset: { width: 0, height: 2 }, // Offset of the shadow
        shadowOpacity: 0.3, // Opacity of the shadow
        shadowRadius: 4, // Blur radius of the shadow
        
    
      },
      textInput:{
        flex: 1,
        paddingHorizontal: 10,
        

      },
    
      loginButtonWrapper:{
        backgroundColor: colors.primary,
        borderRadius: 8,
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        // iOS shadow properties
        shadowColor: '#000', // Color of the shadow
        shadowOffset: { width: 0, height: 2 }, // Offset of the shadow
        shadowOpacity: 0.3, // Opacity of the shadow
        shadowRadius: 4, // Blur radius of the shadow
        // Android elevation

      },
      loginText:{
        color: colors.white,
        fontSize: 16,
        textAlign: 'center',
        padding: 15,
        
    
      },
      footerContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        gap: 2,
      },

      accountText:{
        color: colors.primary,

      },
      signupText:{
        color: 'turquoise',
        
        marginVertical: 300,
      }, 
      title:{
        fontSize: 30,
        marginTop: 40,
        fontWeight: 'bold',
        marginLeft: 20,

      },
      subtitle:{
        fontSize: 16,
        marginVertical: 20,
        color: colors.primary,
        marginLeft: 20,

      }
});

export default ForgotPasswordScreen;
