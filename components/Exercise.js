import { Pressable, Text, TextInput, View, StyleSheet,
  SafeAreaView, FlatList, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
  import React, { useState, useEffect } from 'react'
  import { MaterialIcons } from '@expo/vector-icons'; 
  import { addDoc, colRef, onSnapshot } from '../firebase'

// exercise object

const Exercise = () => {

    //fields for Exercise in firestore
  const [exerciseTitle, setTitle] = useState('');
  const [exerciseDescription, setExerciseDescription] = useState('');
  
  //setting the state
  const [exercises, setExerciseList] = useState([]);
  const [loading, setLoading] = useState(true);

  //Create in Firesotre
  const addExercise = async() => {
    try {
      const docRef = await addDoc(colRef, {
        title: exerciseTitle,
        description: exerciseDescription,
      });
      console.log("Document written with ID: ", docRef.id);
      setTitle("");
      setExerciseDescription("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  //getting from firestore
  const getExercise = async() => {

    const subscriber = onSnapshot(colRef, (snapshot) => {
      let exercises = []
        snapshot.docs.forEach((doc) => {
          exercises.push({...doc.data(), key: doc.id })
        })
        setExerciseList(exercises);
        setLoading(false);
        console.log(exercises);
    })
    return () => subscriber();
  };

  useEffect ( () => {
    getExercise();
  }, []);
  
  return (
      <SafeAreaView style={styles.heading}>
        <View style={styles.header}> 
          {/* heading */}
          <Text style={styles.heading}>Exercise List</Text>
          {/* delete all  */}
          <Pressable>
            <MaterialIcons name="delete" size={32} color="black" />
          </Pressable>  
        </View>

        {/* For adding an exercise  */}
        <KeyboardAvoidingView>
          <TextInput
            placeholder='Enter Excercise'
            placeholderTextColor="black"
            style={styles.input} 
            value={exerciseTitle} 
            onChangeText={(text) => setTitle(text)} 
            onSubmitEditing={addExercise} 
          /> 
          <TextInput
            placeholder="Enter description"
            placeholderTextColor="black"
            style={styles.input}
            value={exerciseDescription}
            onChangeText={(text) => setExerciseDescription(text)}
            onSubmitEditing={addExercise}
          /> 
        </KeyboardAvoidingView>

        {/* List for rendering items  */}
        <FlatList
        data={exercises}
        renderItem={({item}) => (
          <View style={styles.container}>
            <Text>Exercise Title: {item.title}</Text>
            <Text>Exercise Description: {item.description}</Text>
          </View>
          )}
        />
      </SafeAreaView>
  )
}

export default Exercise

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgrey',
    padding: 10,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 20,
  },

  innerContainer: {
    alignItems: 'center',
    flexDirection: 'column'
  },

  header: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  heading: {
    fontWeight: '900',
    fontStyle: 'bold',
    fontSize: 30,
    flex: 1,
    marginTop: 20,
  },

  noOfExercises: {
    fontSize: 20,
    fontWeight: '500',
    marginRight: 20,
  },

  input: {
    backgroundColor: 'lightgrey',
    padding: 10,
    fontSize: 17,
    width: '90%',
    alignSelf: 'center',
    marginTop: 'auto',
    borderRadius: 10,
  },
})