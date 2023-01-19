import { Pressable, Text, TextInput, View, StyleSheet,
  SafeAreaView, FlatList, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
  import React, { useState, useEffect } from 'react'
  import { MaterialIcons } from '@expo/vector-icons'; 
  import { addDoc, collection, onSnapshot, doc, db, setDoc } from '../firebase'
  import {getAuth} from 'firebase/auth';

// exercise object

const Exercise = () => {

    //fields for Exercise in firestore
  const [exerciseTitle, setTitle] = useState('');
  const [exerciseDescription, setDescription] = useState('');
  const uid = getAuth().currentUser.uid;
  
  //setting the state
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  //Create in Firesotre
  const AddExercise = async() => {

    if(uid) {
      try {
        const uidRef = collection(db, 'workout');
        const docRef = await addDoc(uidRef, {
          title: exerciseTitle,
          description: exerciseDescription,
        });
      } 
      catch (e) {
        console.error("Error adding document: ", e);
      }
      setTitle("");
      setDescription("");
    }
};

  // getting from firestore
  const getExercise = async() => {

    // get user
    if(getAuth().currentUser) {

    const uidRef = collection(db, 'workout');
    const subscriber = onSnapshot(uidRef, (snapshot) => {
      // let exercises = []
        snapshot.docs.forEach((doc) => {
          exercises.push({...doc.data(), key: doc.id })
        })
        setExercises(exercises);
        console.log(exercises);
    })
    return () => subscriber();
  }
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
          /> 
          <TextInput
            placeholder="Enter description"
            placeholderTextColor="black"
            style={styles.input}
            value={exerciseDescription}
            onChangeText={(text) => setDescription(text)}
          /> 
        </KeyboardAvoidingView>

        <TouchableOpacity onPress={AddExercise} style={styles.button} >
          <Text style={styles.buttonText}>Add Excercise</Text>
        </TouchableOpacity>

        {/* List for rendering items  */}
        <FlatList
        data={exercises}
        // keyExtractor={item => item.id}
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