import { StyleSheet, Text, TouchableOpacity, TextInput, SafeAreaView, View, Pressable, Button } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';

const AddExerciseScreen = () => {

    const [exerciseTitle, setTitle] = useState('');
    const [exerciseDescription, setDescription] = useState('');
    const [startWeight, setStartWeight] = useState('');
    const [weight, setWeight] = useState('');
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');
    const [bodyPart, setBodyPart] = useState('');


    //letting user add exercise fields
    const [fields, setFields] = useState([{ value: '' }]);

    //setting the state
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleAddField = () => {
        setExercises([...fields, { value: '' }]);
      };

    //Create in Firesotre
    const AddExercise = async () => {

        if (getAuth().currentUser) {
            try {
                const uidRef = collection(db, 'exercise');
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
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                {/* heading */}
                <Text style={styles.heading}>Add Exercise</Text>
                {/* delete all  */}
                <Pressable>
                    <MaterialIcons name="delete" size={32} color="black" />
                </Pressable>
            </View>
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
                keyboardType=''
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
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <Button title="Add Field" onPress={handleAddField} />
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