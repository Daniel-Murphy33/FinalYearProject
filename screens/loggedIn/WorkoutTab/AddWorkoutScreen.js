import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { getAuth } from "firebase/auth";
import { doc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigation } from "@react-navigation/native";

const AddWorkoutScreen = () => {
  //navigation through screens
  const navigation = useNavigation();

  //for changing metric system
  const [weightUnitOpen, setWeightUnitOpen] = useState(false);
  const [weightUnitValue, setWeightUnitValue] = useState("kg");
  const [weightUnitItems, setWeightUnitItems] = useState([
    { label: "kg", value: "kg" },
    { label: "lbs", value: "lbs" },
  ]);

  // for dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Strength", value: "Strength" },
    { label: "Fitness", value: "Fitness" },
    { label: "Hybrid", value: "Hybrid" },
  ]);

  const [day, setDay] = useState("");
  const [name, setName] = useState("");
  const [exercises, setExercises] = useState([
    { name: "", sets: "", reps: "", weight: "", videoLink: "" },
  ]);

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      { name: "", sets: "", reps: "", weight: "", videoLink: "" },
    ]);
  };

  const handleRemoveExercise = (index) => {
    const newExercises = [...exercises];
    newExercises.splice(index, 1);
    setExercises(newExercises);
  };

  const handleExerciseChange = (index, field, value) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    setExercises(newExercises);
  };

  //Create in Firesotre
  const AddWorkout = async () => {
    const user = getAuth().currentUser;
    if (user) {
      try {
        const docRef = doc(db, "users", user.uid);
        const colRef = collection(docRef, "workouts");
        addDoc(colRef, {
          day: day,
          name: name,
          trainingType: value,
          exercises: exercises,
          createdAt: serverTimestamp(),
        });
      } catch (e) {
        console.log(e);
      }

      setDay("");
      setName("");
      setExercises([{ name: "" }]);
      console.log(exercises);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.title}>Create Workout Template</Text>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          nestedScrollEnabled={true}
        >
          <View style={styles.formBox}>
            <Text style={styles.label}>Day of the week:</Text>
            <TextInput
              style={styles.input}
              placeholder="Day..."
              placeholderTextColor={"grey"}
              value={day}
              onChangeText={setDay}
            />

            <Text style={styles.label}>Workout Name:</Text>
            <TextInput
              style={styles.input}
              placeholder={"Name..."}
              placeholderTextColor={"grey"}
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.label}>Select Training Type:</Text>
            <DropDownPicker
              style={styles.input}
              placeholder={"Select Training Type"}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              required={true}
              listMode="SCROLLVIEW"
            />
            <View>
              {exercises.map((exercise, index) => (
                <View style={styles.exerciseBox} key={index}>
                  <Text style={styles.label}>Exercise {index + 1}:</Text>

                  <TextInput
                    style={styles.input}
                    placeholder="Exercise Name..."
                    placeholderTextColor={"grey"}
                    value={exercise.name}
                    onChangeText={(text) =>
                      handleExerciseChange(index, "name", text)
                    }
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Sets..."
                    placeholderTextColor={"grey"}
                    keyboardType="numeric"
                    value={exercise.sets}
                    onChangeText={(text) =>
                      handleExerciseChange(index, "sets", text)
                    }
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Reps..."
                    keyboardType="numeric"
                    placeholderTextColor={"grey"}
                    value={exercise.reps}
                    onChangeText={(text) =>
                      handleExerciseChange(index, "reps", text)
                    }
                  />

                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TextInput
                      style={styles.input}
                      placeholder={
                        weightUnitValue === "kg"
                          ? "Weight in kg..."
                          : "Weight in lbs..."
                      }
                      keyboardType="numeric"
                      placeholderTextColor={"grey"}
                      value={exercise.weight}
                      onChangeText={(text) =>
                        handleExerciseChange(index, "weight", text)
                      }
                    />
                    <View style={{ marginLeft: 10 }}>
                      <DropDownPicker
                        open={weightUnitOpen}
                        value={weightUnitValue}
                        items={weightUnitItems}
                        setOpen={setWeightUnitOpen}
                        setValue={setWeightUnitValue}
                        setItems={setWeightUnitItems}
                        listMode="SCROLLVIEW"
                        style={styles.dropdown}
                        containerStyle={{width: 80,}}
                      />
                    </View>
                  </View>

                  <TextInput
                    style={styles.input}
                    placeholder="Youtube Video Link..."
                    placeholderTextColor={"grey"}
                    value={exercise.videoLink}
                    onChangeText={(text) =>
                      handleExerciseChange(index, "videoLink", text)
                    }
                  />
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddExercise}
                  >
                    <Text style={styles.addButtonText}>Add Exercise</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveExercise(index)}
                  >
                    <Text style={styles.removeButtonText}>Remove Exercise</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={AddWorkout}>
            <Text style={styles.addButtonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddWorkoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  formBox: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    width: "90%",
    maxWidth: "90%",
    padding: 20,
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
    alignSelf: "center",
    fontSize: 23,
    fontWeight: "bold",
    padding: 15,
    marginBottom: 10,
  },
  dropdown: {
    marginTop: 8,
    marginBottom: 16,
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#0792F9",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  removeButton: {
    backgroundColor: "#FF5722",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  removeButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  exerciseBox: {
    marginBottom: 10,
  },
});
