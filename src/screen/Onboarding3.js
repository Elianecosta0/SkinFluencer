import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import {colors} from "../utils/color"
import { useNavigation } from '@react-navigation/native'
import { removeItem } from '../utils/asyncStorage'

const Onboarding3 = () => {
    const navigation = useNavigation();

    const handleLogin=()=>{
        navigation.navigate("Login")
    }

    const handleSignup=()=>{
        navigation.navigate("Signup")
    }
    const handleReset= async ()=>{
        await removeItem('onboarded')
        navigation.navigate("Onboarding1")
    }
  return (
    <View style={styles.container}>
      
      <Image source={require("../assets/welcome-image.png")} style={styles.welcomeImage}/>
      <Image source={require("../assets/logo.png")} style={styles.logo}/>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[
            styles.loginButtonWrapper,
            {backgroundColor: colors.primary},
            ]}
            onPress={handleLogin}
        >
            <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleSignup}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
        
        
      </View>
      <TouchableOpacity style={styles.resetButtonWrapper} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>

    </View>
  )
}

export default Onboarding3;

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: colors.white,
        alignItems: 'center'
    },
    logo:{
        height:100,
        width: 350,
        marginVertical: 20,

    },
    welcomeImage:{
        height: 328,
        width: 415,
        marginVertical: 80,
        

    },

    buttonContainer:{
        marginTop: 20,
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: colors.primary,
        width: "80%",
        height: 60,
        borderRadius: 100,
    },
    loginButtonWrapper:{
        justifyContent: 'center',
        alignItems: 'center',
        width: "50%",
        
        
        borderRadius: 100,


    },
    loginButtonText:{  
        
       color: colors.white,
       fontSize: 18,
       fontWeight: "bold"
       
       
       
        
    },
    signUpButtonText:{
        fontSize: 18,
      
       fontWeight: "bold"

    },
    resetButtonWrapper:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
        borderWidth: 2,
        borderColor: colors.primary,
        width: "30%",
        height: 40,
        borderRadius: 100,
        backgroundColor: colors.white,
        


        
    },
    resetButtonText:{
        color: 'red'
    }

})