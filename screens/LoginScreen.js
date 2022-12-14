import { StyleSheet,
  Text,
  TextInput, 
  TouchableOpacity, 
  View, 
  TouchableWithoutFeedback,
  Keyboard, 
  Button} from 'react-native'
import React, { useState } from 'react'
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/core';


const LoginScreen = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const navigation = useNavigation()
  
  //navigating through screens
  const RegisterScreenPage = () => {
    navigation.navigate("Register")
  }
  const ForgotPasswordScreen = () => {
    navigation.navigate("ForgotPassword")
  }
  
  //function for signing in 
  const handleSignIn = () => {
    auth. 
    signInWithEmailAndPassword (email, password)
    .then(UserCredentials => {
      const user = UserCredentials.user;
      console.log("Logged in with: ", user.email);
    })
    .catch(error => alert(error.message))
  }


  return (
    //allows for dismissing keyboard
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput placeholder='Email'
          placeholderTextColor="black"
          value={email}
          onChangeText={text => setEmail(text)} style={styles.input} />
          <TextInput placeholder='Password'
          placeholderTextColor="black" 
          value={password} 
          onChangeText={text => setPassword(text)} style={styles.input} secureTextEntry />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSignIn} style={styles.button} >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={RegisterScreenPage} style={[styles.button, styles.buttonOutline]} >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
          <Button title={"Forgot Password?"} onPress={ForgotPasswordScreen} style={styles.button} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },

    inputContainer: {
      width:'80%'
      },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,

    },

    buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },

    button: {
      backgroundColor: '#0792F9',
      width: '100%',
      padding: 15,
      borderRadius: 10, 
      alignItems: 'center',
    },

    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      // fontSize: 16,
    },

    buttonOutlineText: {
      color: '#0792F9',
      fontWeight: 'bold',
      // fontSize: 16,
    },

    buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#0792F9',
      borderWidth: 2,
    },

})
