import { StyleSheet, Text, TouchableOpacity, TextInput, SafeAreaView, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';

const AddExerciseScreen = () => {

    const [day, setDay] = useState('');
    const [description, setDescription] = useState('');
    const [exercises, setExercises] = useState([]);
    const [trainingType, settrainingType] = useState('');

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
            }
            catch (e) {
                console.error("Error adding document: ", e);
            }
            setDay("");
            setDescription("");
            setExercises("");
            settrainingType("");
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
                placeholder="Enter Exercise"
                placeholderTextColor="black"
                keyboardType=''
                style={styles.input}
                value={exercises}
                onChangeText={(text) => setExercises(text)}
            />
            <TextInput
                placeholder="Enter Training Type"
                placeholderTextColor="black"
                style={styles.input}
                value={trainingType}
                onChangeText={(text) => settrainingType(text)}
            />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
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