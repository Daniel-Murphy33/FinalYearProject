import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { doc, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";

const AddWorkoutScreen = () => {
  //navigation through screens
  const navigation = useNavigation();

  //use states used to store user data
  const [day, setDay] = useState("");
  const [description, setDescription] = useState("");
  const [trainingType, setTrainingType] = useState("");
  //contains name sets and reps for each exercise
  const [exercises, setExercises] = useState([
    { value: "", sets: "", reps: "" },
  ]);

  const handleAddField = () => {
    setExercises([...exercises, { name: "" }]);
  };

  const handleChangeExercise = (index, text) => {
    const newExercises = [...exercises];
    newExercises[index].value = text;
    setExercises(newExercises);
  };

  const handleChangeSets = (index, text) => {
    const newExercises = [...exercises];
    newExercises[index].sets = text;
    setExercises(newExercises);
  };

  const handleChangeReps = (index, text) => {
    const newExercises = [...exercises];
    newExercises[index].reps = text;
    setExercises(newExercises);
  };

  //Create in Firesotre
  const addExercise = async () => {
    const user = getAuth().currentUser;
    if (user) {
      try {
        const docRef = doc(db, "users", user.uid);
        const colRef = collection(docRef, "workouts");
        addDoc(colRef, {
          day: day,
          description: description,
          exercises: exercises,
          trainingType: trainingType,
        });
      } catch (e) {
        console.log(e);
      }

      setDay("");
      setDescription("");
      setExercises([{ value: "" }]);
      setTrainingType("");
      console.log(exercises);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* heading */}
          <Text style={styles.heading}>Add Workout</Text>

          {/* delete all  */}
          <Pressable>
            <MaterialIcons name="delete" size={32} color="black" />
          </Pressable>
        </View>
        <TextInput
          placeholder="Enter Day"
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
          onChangeText={(text) => setTrainingType(text)}
        />
        {exercises.map((field, index) => (
          <View key={index} style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Enter Exercise"
              placeholderTextColor={"black"}
              onChangeText={(text) => handleChangeExercise(index, text)}
              value={field.value}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Sets"
              placeholderTextColor={"black"}
              onChangeText={(text) => handleChangeSets(index, text)}
              value={field.sets}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Reps"
              placeholderTextColor={"black"}
              onChangeText={(text) => handleChangeReps(index, text)}
              value={field.reps}
            />
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={handleAddField}>
          <Text style={styles.buttonText}>Add Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={addExercise}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancel}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddWorkoutScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "90%",
    height: 40,
    borderColor: "black",
    borderWidth: 2,
    marginVertical: 10,
    padding: 10,
  },
  button: {
    backgroundColor: "#0792F9",
    padding: 15,
    marginTop: 20,
    borderRadius: 20,
    width: "50%",
  },
  cancel: {
    backgroundColor: "red",
    padding: 15,
    marginTop: 20,
    borderRadius: 20,
    width: "50%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  heading: {
    fontWeight: "900",
    fontStyle: "bold",
    fontSize: 30,
    flex: 1,
    marginTop: 20,
  },
});
