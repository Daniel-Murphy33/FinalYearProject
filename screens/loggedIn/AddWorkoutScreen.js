import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, SafeAreaView, View, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigation } from '@react-navigation/native';

const AddExerciseScreen = () => {
  const navigation = useNavigation();

  const [day, setDay] = useState('');
  const [description, setDescription] = useState('');
  const [exercises, setExercises] = useState([{ value: '' }]);
  const [trainingType, setTrainingType] = useState('');

  const handleAddField = () => {
    setExercises([...exercises, { value: '' }]);
  };

  const handleChange = (index, text) => {
    const newExercises = [...exercises];
    newExercises[index].value = text;
    setExercises(newExercises);
  };

  //Create in Firesotre
  const AddExercise = async () => {
    if (getAuth().currentUser) {
      try {
        const uidRef = collection(db, 'workout');
        const docRef = await addDoc(uidRef, {
          day: day,
          description: description,
          exercises: exercises,
          trainingType: trainingType,
        });
      } catch (e) {
        console.error('Error adding document: ', e);
      }
      setDay('');
      setDescription('');
      setExercises('');
      setTrainingType('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* heading */}
        <Text style={styles.heading}>Add Workout</Text>


        {/* delete all  */}
        <Pressable>
          <MaterialIcons name="delete" size={32} color="black" />
        </Pressable>
      </View>
      <TextInput
        placeholder='Enter Day'
        placeholderTextColor="black"
        style={styles.input}
        value={day}
        onChangeText={(text) => setDay(text)}
      />
      <TextInput
        placeholder="Enter Description"
        placeholderTextColor="black"
        style={styles.input}
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        placeholder="Enter Training Type"
        placeholderTextColor="black"
        style={styles.input}
        value={trainingType}
        onChangeText={(text) => settrainingType(text)}
      />
      {exercises.map((field, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder="Enter Exercise"
          placeholderTextColor={"black"}
          onChangeText={(text) => handleChange(index, text)}
          value={field.value}
        />
      ))}
      <TouchableOpacity style={styles.button} onPress={handleAddField}>
        <Text style={styles.buttonText}>Add Exercise</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={AddExercise}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancel} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default AddExerciseScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    marginVertical: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#0792F9',
    padding: 15,
    marginTop: 20,
    borderRadius: 20,
    width: '50%'
  },
  cancel: {
    backgroundColor: 'red',
    padding: 15,
    marginTop: 20,
    borderRadius: 20,
    width: '50%'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
})