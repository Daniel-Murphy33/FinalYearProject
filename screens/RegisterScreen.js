import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput,
TouchableWithoutFeedback, Keyboard } from 'react-native'
import { auth } from '../firebase';


const RegisterScreen = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

    //function for signing up
  const handleSignUp = () => {
    auth
    .createUserWithEmailAndPassword(email, password)
    .then(UserCredentials => {
      const user = UserCredentials.user;
      console.log("Registered with: ", user.email);
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
            <TouchableOpacity onPress={handleSignUp} style={[styles.button]} >
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    </View>
    </TouchableWithoutFeedback>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
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
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },

    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
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
})