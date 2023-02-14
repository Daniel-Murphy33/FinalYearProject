import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

const RecentWorkoutCard = () => {
  const user = getAuth().currentUser;
  const [workouts, setWorkouts] = useState([]);
  const navigation = useNavigation();

  // getting from firestore
  const GetWorkout = async () => {
    // get user
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const colRef = collection(docRef, "workouts");
      const q = await query(
        colRef,
        orderBy("createdAt", "desc"),
        limit(3),
        // Add a where clause to filter by documents created within the last 3 items
        where("createdAt", ">", new Date(Date.now() - 3 * 24 * 60 * 60 * 1000))
      );
      const subscriber = onSnapshot(q, (snapshot) => {
        let newWorkouts = [];
        snapshot.docs.forEach((doc) => {
          newWorkouts.push({ ...doc.data(), key: doc.id });
        });
        setWorkouts(newWorkouts);
        console.log(newWorkouts);
      });
      return () => subscriber();
    }
  };

  useEffect(() => {
    GetWorkout();
  }, []);

  return (
    <View style={{ height: "90%" }}>
      <Text style={styles.title2}>Recent Workouts</Text>
      {/* List for rendering items  */}
      <FlatList
        data={workouts}
        key={(item) => item.id}
        style={{ maxHeight: '60%%', overflow: 'scroll' }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.exerciseContainer}
            onPress={() =>
              navigation.navigate("CreatedWorkout", {
                day: item.day,
                exercises: item.exercises,
                id: item.id,
                description: item.description,
                trainingType: item.trainingType,
              })
            }
          >
            <Text style={styles.title}>{item.day}</Text>
            <Text style={styles.exerciseSetsReps}>
              {item.description} - {item.trainingType}
            </Text>
            {item.exercises.map((exercise, index) => (
              <Text key={index} style={styles.exerciseSetsReps}>
                {exercise.name} - Sets x{exercise.sets} - Reps x{exercise.reps}
              </Text>
            ))}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default RecentWorkoutCard;

const styles = StyleSheet.create({
  exerciseContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  title2: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 20
  },
  exerciseSetsReps: {
    fontSize: 16.5,
    color: "gray",
    marginTop: 5,
    fontWeight: "bold",
  },
});
