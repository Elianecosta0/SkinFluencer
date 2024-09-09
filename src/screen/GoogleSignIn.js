import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { firebase } from "../../config";
import {colors} from "../utils/color"

export default function GoogleSignin() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '343960682832-hqb1dklbhc1ogaju05dlpcb497ts04js.apps.googleusercontent.com', // Get this from the Firebase Console
    iosClientId: '343960682832-dl08c1n4bisffn5uao3ftfbhlj1l7mtg.apps.googleusercontent.com',
    androidClientId: '343960682832-arlsqqurqhb104tdfq2c0qs03mucb2rg.apps.googleusercontent.com',
    webClientId: '343960682832-hqb1dklbhc1ogaju05dlpcb497ts04js.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;

      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      firebase.auth().signInWithCredential(credential)
        .then((user) => {
          console.log('User signed in with Google', user);
        })
        .catch((error) => {
          console.error('Error with Google sign-in', error);
        });
    }
  }, [response]);

  return (
    <TouchableOpacity style={styles.googleButtonContainer} onPress={() => promptAsync()}>
      <Image source={require("../assets/google.jpeg")} style={styles.facebookImage} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
     
      googleImage: {
        height: 40,
        width: 40,
        marginRight: 10,
      },
})
