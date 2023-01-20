import {
  Pressable, Text, TextInput, View, StyleSheet,
  SafeAreaView, FlatList, KeyboardAvoidingView, TouchableOpacity
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { addDoc, collection, onSnapshot, doc, db, setDoc } from '../../firebase'
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

// exercise object

const AllWorkoutScreen = () => {

  //setting the state
  const [exercises, setExercises] = useState([]);
  const navigation = useNavigation();

  // getting from firestore
  const getExercise = async () => {

    // get user
    if (getAuth().currentUser) {

      const uidRef = collection(db, 'workout');
      const subscriber = onSnapshot(uidRef, (snapshot) => {
        let exercises = []
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
        <Text style={styles.heading}>Workout List</Text>
        {/* delete all  */}
        <Pressable>
          <MaterialIcons name="delete" size={32} color="black" />
        </Pressable>
      </View>


      {/* List for rendering items  */}
      <FlatList
        data={exercises}
        key={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.exerciseContainer}>
            <Text style={styles.exerciseName}>{item.title}</Text>
            <Text style={styles.exerciseSetsReps}>
              Sets: x{item.sets} Reps: x{item.reps} Weight: {item.weight}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default AllWorkoutScreen

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
    fontSize: 25,
    fontWeight: 'bold',
  },
  exerciseSetsReps: {
    fontSize: 16.5,
    color: 'gray',
    marginTop: 5,
    fontWeight: 'bold',
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