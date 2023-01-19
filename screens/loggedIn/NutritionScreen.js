import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const workout = [
  { id: 1, name: 'Push Ups', sets: 3, reps: 12 },
  { id: 2, name: 'Squats', sets: 3, reps: 12 },
  { id: 3, name: 'Deadlifts', sets: 3, reps: 12 },
  { id: 4, name: 'Bicep Curls', sets: 3, reps: 12 },
  { id: 5, name: 'Tricep Dips', sets: 3, reps: 12 },
];

const WorkoutScreen = () => {
  const [exercises, setExercises] = useState(workout);

  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.exerciseContainer}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.exerciseSetsReps}>
              Sets: {item.sets} Reps: {item.reps}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
});

export default WorkoutScreen;
