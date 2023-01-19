import { StyleSheet, Text, KeyboardAvoidingView, TextInput, SafeAreaView } from 'react-native'
import React, { useState } from 'react'

const AddExerciseScreen = () => {

    const [exerciseTitle, setTitle] = useState('');
    const [exerciseDescription, setDescription] = useState('');
    const [startWeight, setStartWeight] = useState('');
    const [weight, setWeight] = useState('');
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');
    const [bodyPart, setBodyPart] = useState('');
    
    //setting the state
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);

    //Create in Firesotre
    const AddExercise = async () => {

        if (getAuth().currentUser) {
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
            setTitle("");
            setDescription("");
            setStartWeight("");
            setWeight("");
            setReps("");
            setSets('');
            setBodyPart('');
        }
    };

    return (
        <SafeAreaView>
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
        </SafeAreaView>
    )
}

export default AddExerciseScreen

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#0792F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
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