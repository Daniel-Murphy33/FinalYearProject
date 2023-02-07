import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CreatedWorkout = ({ route, navigation }) => {
  const { day, exercises, description, trainingType } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{day} Workout</Text>
      <View style={styles.workoutContainer}>
        <Text style={styles.workoutTitle}>{description} - {trainingType}</Text>
        {exercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseContainer}>
            <Text style={styles.exerciseTitle}>Exercise {index + 1}  -  {exercise.name}</Text>
            <Text style={styles.exerciseInfo}>
              Sets x{exercise.sets} - Reps x{exercise.reps}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CreatedWorkout;

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 20,
    },
    workoutContainer: {
      backgroundColor: '#f2f2f2',
      padding: 20,
      borderRadius: 10,
      marginVertical: 10,
    },
    workoutTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    workoutInfo: {
      fontSize: 14,
      marginBottom: 10,
    },
    exerciseContainer: {
      marginVertical: 10,
    },
    exerciseTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    exerciseInfo: {
      fontSize: 14,
    },
  });