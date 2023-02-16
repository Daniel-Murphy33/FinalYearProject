import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const CreatedWorkout = ({ route, navigation }) => {
  const { day, exercises, name, trainingType } = route.params;

  const handleExercisePress = (exercise) => {
    navigation.navigate('CreatedExerciseScreen', { exercise });
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.header} value={day}/>
      <View style={styles.workoutContainer}>
        <Text style={styles.workoutTitle}>{name} - {trainingType}</Text>
        {exercises.map((exercise, index) => (
          <TouchableOpacity key={index} style={styles.exerciseContainer} onPress={() => handleExercisePress(exercise)}>
            <Text style={styles.exerciseTitle}>Exercise {index + 1}  -  {exercise.name}</Text>
            <Text style={styles.exerciseInfo}>
              Sets x{exercise.sets} - Reps x{exercise.reps} - Weight : {exercise.weight}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CreatedWorkout;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 25,
      backgroundColor: '#fff',
    },
    header: {
      fontSize: 35,
      fontWeight: 'bold',
      marginVertical: 35,
      alignSelf: 'center',
    },
    workoutContainer: {
      backgroundColor: '#f2f2f2',
      padding: 20,
      borderRadius: 10,
      marginVertical: 5,
      alignItems: 'center',
    },
    workoutTitle: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    exerciseContainer: {
      marginVertical: 20,
    },
    exerciseTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    exerciseInfo: {
      fontSize: 14,
      textAlign: 'center',
      marginTop: 5,
    },
  });
