import { Pressable, Text, TextInput, View, StyleSheet,
SafeAreaView, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Exercise from '../../components/Exercise'
import { MaterialIcons } from '@expo/vector-icons'; 
import { auth, app, db, getFirestore, collection, addDoc, getDocs } from '../../firebase'
const WorkoutScreen = () => {
  
  const [exerciseTitle, setTitle] = useState('');
  const [exerciseList, setExerciseList] = useState([]);

  const addExercise = async() => {
    try {
      const docRef = await addDoc(collection(db, "Exercise"), {
        exerciseTitle: exerciseTitle,
        isChecked: false,

      });
      console.log("Document written with ID: ", docRef.id);
      setTitle("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getExercise = async() => {
    const querySnapshot = await getDocs(collection(db, "Exercise"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
      setExerciseList({
        ...doc.data(),
        id: doc.id,
      });
    });
  };

  useEffect ( () => {
    getExercise();
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}> 
      {/* heading */}
        <Text style={styles.heading}>Workout List</Text>
      {/* shopping items  */}
        <Text style={styles.noOfExercises}>0</Text>
      {/* delete all  */}
        <Pressable>
        <MaterialIcons name="delete" size={32} color="black" />
        </Pressable>  
      </View>
        {exerciseList.length > 0 ? (
        <FlatList
          data={exerciseList}
          renderItem ={({item}) => <ExerciseItem title={item.title}/>}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <ActivityIndicator />
      )}
        <TextInput
        placeholder='Enter Excercise' 
        style={styles.input} 
        value={exerciseTitle} 
        onChangeText={(text) => setTitle(text)} 
        onSubmitEditing={addExercise} 
        /> 
      </SafeAreaView>
  )
}

export default WorkoutScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  }
})