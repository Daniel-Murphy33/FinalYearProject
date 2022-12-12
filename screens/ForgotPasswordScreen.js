import React, { useState } from 'react'
import { View, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'

const ForgotPasswordScreen = () => {

    const [email, setEmail] = useState('')
    

  return (
    <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      }}>
        <View style={styles.container}>
            <View style={styles.inputContainer}>
            <TextInput placeholder='Email'
            placeholderTextColor="black"
            value={email}
            onChangeText={text => setEmail(text)} style={styles.input} />
            </View>
        </View>
    </TouchableWithoutFeedback>
  )
}

export default ForgotPasswordScreen

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

