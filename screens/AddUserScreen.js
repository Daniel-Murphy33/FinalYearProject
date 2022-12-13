import { View, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { usersRef, addDoc } from '../firebase';


const AddUserScreen = () => {

    const [displayName, setDisplayName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [age, setAge] = useState('');
    const [currentWeight, setCurrentWeight] = useState('');
    const [goal, setGoal] = useState('');

    const addUser = async() => {
        try {
          const docRef = await addDoc(usersRef, {
            displayName: displayNamem,
            firstName: firstName,
            surname: surname,
            age: age,
            currentWeight: currentWeight,
            goal: goal,
          });
          console.log("Document written with ID: ", docRef.id);
          setFirstName("");
          setSurname("");
          setAge("");
          setCurrentWeight(""),
          setGoal("");
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      };
    

  return (
    <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      }}>
        <View style={styles.container}>
            <View style={styles.inputContainer}>
            <TextInput placeholder='First Name'
            placeholderTextColor="black"
            value={firstName}
            onSubmitEditing={addUser} 
            onChangeText={text => setFirstName(text)} style={styles.input} />
            <TextInput placeholder='Last Name'
            placeholderTextColor="black" 
            value={surname} 
            onSubmitEditing={addUser} 
            onChangeText={text => setSurname(text)} style={styles.input} />
            <TextInput placeholder='Age'
            placeholderTextColor="black"
            keyboardType='numeric'
            value={age} 
            onSubmitEditing={addUser} 
            onChangeText={text => setAge(text)} style={styles.input} />
            <TextInput placeholder='Current Weight'
            placeholderTextColor="black"
            keyboardType='numeric'
            value={currentWeight} 
            onSubmitEditing={addUser} 
            onChangeText={text => setCurrentWeight(text)} style={styles.input} />
            <TextInput placeholder='Goal Weight'
            placeholderTextColor="black"
            keyboardType='numeric'
            value={goal} 
            onSubmitEditing={addUser} 
            onChangeText={text => setGoal(text)} style={styles.input} />
            </View>
        </View>
    </TouchableWithoutFeedback>
  )
}

export default AddUserScreen

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

