import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { getAuth } from "firebase/auth";
import { doc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigation } from "@react-navigation/native";

const WorkoutForm = () => {

  //navigation through screens
  const navigation = useNavigation();

  // for dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Strength", value: "Strength" },
    { label: "Fitness", value: "Fitness" },
    { label: "Hybrid", value: "Hybrid" },
  ]);

  //use states used to store user data
  const [day, setDay] = useState("");
  const [description, setDescription] = useState("");
  const [trainingType, setTrainingType] = useState("");
  //contains name sets and reps for each exercise
  const [exercises, setExercises] = useState([
    { name: "", sets: "", reps: "", videoLink: "" },
  ]);

  const handleAddField = () => {
    setExercises([...exercises, { name: "" }]);
  };

  const handleChangeExercise = (index, text) => {
    const newExercises = [...exercises];
    newExercises[index].name = text;
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

  const handleChangeVideoLink = (index, text) => {
    const newExercises = [...exercises];
    newExercises[index].videoLink = text;
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
          trainingType: value,
          createdAt: serverTimestamp(),
          client: email,
          trainer: user.email,
        });
      } catch (e) {
        console.log(e);
      }

      setDay("");
      setDescription("");
      setExercises([{ name: "" }]);
      setTrainingType("");
      console.log(exercises);
    }
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Enter Day"
                placeholderTextColor="black"
                value={day}
                onChangeText={(text) => setDay(text)}
                style={styles.input}
                required={true}
              />
              <TextInput
                placeholder="Enter Description"
                placeholderTextColor="black"
                value={description}
                onChangeText={(text) => setDescription(text)}
                style={styles.input}
                required={true}
              />
              <DropDownPicker
                style={styles.dropdown}
                placeholder={"Select a Training Type"}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />

              {exercises.map((field, index) => (
                <View
                  key={index}
                  style={{
                    ...styles.container,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TextInput
                    style={{ ...styles.input, width: "30%" }}
                    placeholder="Enter Exercise"
                    placeholderTextColor={"black"}
                    required={true}
                    onChangeText={(text) => handleChangeExercise(index, text)}
                    value={field.name}
                  />
                  <View style={styles.setsRepsContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Sets"
                      keyboardType="numeric"
                      placeholderTextColor={"black"}
                      required={true}
                      onChangeText={(text) => handleChangeSets(index, text)}
                      value={field.sets}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Reps"
                      keyboardType="numeric"
                      required={true}
                      placeholderTextColor={"black"}
                      onChangeText={(text) => handleChangeReps(index, text)}
                      value={field.reps}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Youtube Video Link"
                      placeholderTextColor={"black"}
                      onChangeText={(text) =>
                        handleChangeVideoLink(index, text)
                      }
                      value={field.videoLink}
                    />
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonOutline]}
                onPress={handleAddField}
              >
                <Text style={styles.buttonOutlineText}>Add Exercise</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addExercise} style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={[styles.button, styles.buttonOutline]}
              >
                <Text style={styles.buttonOutlineText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const NutritionForm = () => {
  const [foodName, setFoodName] = useState("");
  const [foodDescription, setFoodDescription] = useState("");

  const handleAddNutrition = () => {
    // Handle adding the nutrition to Firestore
  };

  return (
    <View>
      <Text>Add Nutrition</Text>

      <Text>Food Name:</Text>
      <TextInput
        value={foodName}
        onChangeText={setFoodName}
        placeholder="Enter food name"
      />

      <Text>Food Description:</Text>
      <TextInput
        value={foodDescription}
        onChangeText={setFoodDescription}
        placeholder="Enter food description"
      />

      <Button title="Add Nutrition" onPress={handleAddNutrition} />
    </View>
  );
};

const AddFormScreen = () => {
  const [formType, setFormType] = useState(null);

  const handleAddWorkoutPress = () => {
    setFormType("workout");
  };

  const handleAddNutritionPress = () => {
    setFormType("nutrition");
  };

  return (
    <SafeAreaView>
      <Button title="Add Workout" onPress={handleAddWorkoutPress} />
      <Button title="Add Nutrition" onPress={handleAddNutritionPress} />

      {formType === "workout" && <WorkoutForm />}
      {formType === "nutrition" && <NutritionForm />}
    </SafeAreaView>
  );
};

export default AddFormScreen;

const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
    },
  
    inputContainer: {
      width: "80%",
    },
    input: {
      backgroundColor: "white",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 12,
    },
    dropdown: {
      backgroundColor: "white",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 12,
      borderColor: "white",
    },
  
    buttonContainer: {
      width: "60%",
      // justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    },
  
    button: {
      backgroundColor: "#0792F9",
      width: "100%",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
    },
  
    buttonText: {
      color: "white",
      fontWeight: "bold",
      // fontSize: 16,
    },
  
    buttonOutlineText: {
      color: "#0792F9",
      fontWeight: "bold",
      // fontSize: 16,
    },
  
    buttonOutline: {
      backgroundColor: "white",
      marginTop: 5,
      borderColor: "#0792F9",
      borderWidth: 2,
    },
  
    heading: {
      fontWeight: "500",
      fontStyle: "bold",
      fontSize: 23,
      textAlign: "center",
    },
  
    logo: {
      resizeMode: "contain",
      height: 160,
      marginTop: 60,
    },
  });
  
