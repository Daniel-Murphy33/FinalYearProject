import {
  Pressable, Text, TextInput, View, StyleSheet,
  SafeAreaView, FlatList, KeyboardAvoidingView, TouchableOpacity
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { addDoc, collection, onSnapshot, doc, db, setDoc } from '../firebase'
import { getAuth } from 'firebase/auth';

// exercise object

const Exercise = () => {

  //fields for Exercise in firestore
  const [exerciseTitle, setTitle] = useState('');
  const [exerciseDescription, setDescription] = useState('');
  const [startWeight, setStartWeight] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [bodyPart, setBodyPart] = useState('');
  const uid = getAuth().currentUser.uid;

  //setting the state
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  //Create in Firesotre
  const AddExercise = async () => {

    if (uid) {
      try {
        const uidRef = collection(db, 'workout');
        const docRef = await addDoc(uidRef, {
          title: exerciseTitle,
          description: exerciseDescription,
          startWeight: startWeight,
          weight: weight,
          reps: reps,
          sets: sets,
          bodyPart: bodyPart,
        });
      }
      catch (e) {
        console.error("Error adding document: ", e);
      }
      //sets field empty
      setTitle("");
      setDescription("");
      setStartWeight("");
      setWeight("");
      setReps("");
      setSets('');
      setBodyPart('');
    }
  };

  // getting from firestore
  const getExercise = async () => {

    // get user
    if (getAuth().currentUser) {

      const uidRef = collection(db, 'workout');
      const subscriber = onSnapshot(uidRef, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          exercises.push({ ...doc.data(), key: doc.id })
        })
        setExercises(exercises);
        console.log(exercises);
      })
      return () => subscriber();
    }
  };

  useEffect(() => {
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
          placeholder="Enter Description"
          placeholderTextColor="black"
          style={styles.input}
          value={exerciseDescription}
          onChangeText={(text) => setDescription(text)}
        />
        <TextInput
          placeholder="Enter Starting Weight"
          placeholderTextColor="black"
          style={styles.input}
          value={startWeight}
          onChangeText={(text) => setStartWeight(text)}
        />
        <TextInput
          placeholder="Enter Weight"
          placeholderTextColor="black"
          style={styles.input}
          value={weight}
          onChangeText={(text) => setWeight(text)}
        />
        <TextInput
          placeholder="Enter Reps"
          placeholderTextColor="black"
          style={styles.input}
          value={reps}
          onChangeText={(text) => setReps(text)}
        />
        <TextInput
          placeholder="Enter Sets"
          placeholderTextColor="black"
          style={styles.input}
          value={sets}
          onChangeText={(text) => setSets(text)}
        />
        <TextInput
          placeholder="Enter Body Part"
          placeholderTextColor="black"
          style={styles.input}
          value={bodyPart}
          onChangeText={(text) => setBodyPart(text)}
        />
      </KeyboardAvoidingView>

      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Add Excercise</Text>
      </TouchableOpacity>

      {/* List for rendering items  */}
      <FlatList
          data={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.exerciseContainer}>
              <Text style={styles.exerciseName}>{item.name}</Text>
              <Text style={styles.exerciseDescription}>
                Sets: {item.sets} Reps: {item.reps}
              </Text>
            </View>
          )}
        />
    </SafeAreaView>
  )
}

export default Exercise

const styles = StyleSheet.create({

  container2: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 10,
  },
  exerciseContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  exerciseSetsReps: {
    fontSize: 15,
    color: 'gray',
    marginTop: 5,
  },

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