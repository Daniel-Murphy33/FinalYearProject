import { View, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import { usersRef, addDoc } from '../../firebase';


const EditUserScreen = () => {    

  return (
    <Text style={styles.container}>hello</Text>
  )
}

export default EditUserScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },

    inputContainer: {
      width:'80%',
      marginBottom: 450,
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
    },

    buttonOutlineText: {
      color: '#0792F9',
      fontWeight: 'bold',
    },

    buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#0792F9',
      borderWidth: 2,
    },

})

