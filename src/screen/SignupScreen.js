import { StyleSheet, Text, View , TouchableOpacity, TextInput, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, {useState} from 'react'
import {colors} from "../utils/color"
import Ionicons from "react-native-vector-icons/Ionicons"
import { SafeAreaView } from 'react-native-safe-area-context'
import {firebase} from '../../config'

const SignupScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntry, setSecureEntry] = useState(true);

    const handleGoBack = ()=>{
        navigation.goBack();
    }

    const handleLogin=()=>{
        navigation.navigate("Login")
    } 
  
  registerUser = async (username, email, password) =>{
    await firebase.auth().createUserWithEmailAndPassword(email, password).then(()=>{
      firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url:'https://skinfluencer-b95e4.firebaseapp.com',
      })
      .then(()=>{
        alert('Verification email sent')
      }).catch((error)=>{
        alert(error.message)
      })
      .then(()=>{
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
          username,
          email,
        })
      })
      .catch((error)=>{
        alert(error.message)
      })

    })
      .catch((error=>{
        alert(error.message)

      }))
  }

  return(
    <SafeAreaView style={styles.container}>
        <View >
            <TouchableOpacity style={styles.backButtonWraper} onPress={handleGoBack}>
                <Ionicons name={"chevron-back-sharp"} color={"black"}  size={30}/>
               
               


            </TouchableOpacity>
            <View style={styles.logoContainer} >
                <Image source={require("../assets/logo.png")} style={styles.logo}/>

            </View>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Ionicons name={"person-outline"} size={25} color={colors.secondary}/>
                    <TextInput style={styles.textInput} placeholder='Enter your username' placeholderTextColor={colors.secondary} 
                    onChangeText={(username) => setUsername(username)} />
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name={"mail-outline"} size={25} color={colors.secondary}/>
                    <TextInput style={styles.textInput} placeholder='Enter your email' placeholderTextColor={colors.secondary} 
                    onChangeText={(email) => setEmail(email)} keyboardType='email-address'/>
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name={"lock-closed-outline"} size={25} color={colors.secondary}/>
                    <TextInput style={styles.textInput} placeholder='Enter your password' placeholderTextColor={colors.secondary}
                    onChangeText={(password) => setPassword(password)}  secureTextEntry={secureEntry}/>
                    <TouchableOpacity onPress={()=>{
                        setSecureEntry((prev)=>!prev)
                    }}>
                        <Ionicons name={"eye-outline"} size={20} color={colors.secondary}/>

                    </TouchableOpacity>
                    
                </View>
                
                <TouchableOpacity style={styles.loginButtonWrapper} onPress={()=> registerUser(username,email, password)}>
                    <Text style={styles.loginText}>SignUp</Text>
                </TouchableOpacity>
                <Text style={styles.loginWith}>or login with</Text>
                <View style={styles.socialButtonsContainer}>
                    {/* Google Button */}
                    <TouchableOpacity style={styles.googleButtonContainer}>
                        <Image source={require("../assets/google.jpeg")} style={styles.googleImage} />
                        
                    </TouchableOpacity>

                    {/* Facebook Button */}
                    <TouchableOpacity style={styles.facebookButtonContainer}>
                        <Image source={require("../assets/facebook.png")} style={styles.facebookImage} />
                    
                    </TouchableOpacity>
                    {/* Apple Button */}
                    <TouchableOpacity style={styles.appleButtonContainer}>
                        <Image source={require("../assets/apple.jpg")} style={styles.appleImage} />
                    
                    </TouchableOpacity>
                </View>
                <View style={styles.footerContainer}>
                    <Text style={styles.accountText}>Already have an Account?</Text>
                    <TouchableOpacity onPress={handleLogin}>
                        <Text style={styles.signupText}>Login</Text>

                    </TouchableOpacity>
                    
                </View>
               
            </View>
            
        </View>
        

    </SafeAreaView>
    
  )
}

export default SignupScreen

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
        borderWidth:1,
        borderColor: colors.secondary,
        borderRadius:8,
        padding: 15,
        marginLeft: 20,
        marginRight: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems:'center',
        marginVertical: 8,
        
    
      },
      textInput:{
        flex: 1,
        paddingHorizontal: 10,
        

      },
   
      loginButtonWrapper:{
        backgroundColor: colors.primary,
        borderRadius: 8,
        marginTop:20,
        marginLeft: 20,
        marginRight: 20,

      },
      loginText:{
        color: colors.white,
        fontSize: 20,
        textAlign: 'center',
        padding: 15,
        
        
        

      },
      loginWith:{
        textAlign:'center',
        marginVertical: 30,
        fontSize: 14,
        color: colors.primary,

      },
      socialButtonsContainer: {
        flexDirection: 'row', // Place buttons side by side
        justifyContent:'center',
        alignItems: 'center',
        marginTop: 1,
      },
      googleButtonContainer: {
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: 8,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10, // Add space between Google and Facebook buttons
      },
      facebookButtonContainer: {
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: 8,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10, // Add space between Google and Facebook buttons
      },
      googleImage: {
        height: 40,
        width: 40,
        marginRight: 10,
      },
      facebookImage: {
        height: 40,
        width: 40,
        marginRight: 10,
        
      },

      appleButtonContainer: {
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: 8,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      appleImage: {
        height: 40,
        width: 40,
        marginRight: 10,
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
        color: colors.primary,
        fontWeight: 'bold',
      }

     
     
     
    
})