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
  Button
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { getAuth } from "firebase/auth";
import { doc, addDoc, collection, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";


const FormOne = () => {
  //navigation through screens
  const navigation = useNavigation();
  const route = useRoute(); 
  const { email } = route.params;

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
        const colRef = collection(db, "workouts");
        addDoc(colRef, {
          day: day,
          name: name,
          trainingType: value,
          exercises: exercises,
          client: email,
          trainer: user.email,
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
              placeholder={"Select an Account Type"}
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

const FormTwo = () => {
  const [day, setDay] = useState("");
  const [name, setName] = useState("");
  const [meals, setMeals] = useState([
    { name: "", calories: "", fat: "", carbohydrates: "", protein: "" },
  ]);

  const HandleAddMeal = () => {
    setMeals([
      ...meals,
      { name: "", calories: "", fat: "", carbohydrates: "", protein: "" },
    ]);
  };

  const HandleRemoveMeal = (index) => {
    const newMeals = [...meals];
    newMeals.splice(index, 1);
    setMeals(newMeals);
  };

  const HandleMealChange = (index, field, value) => {
    const newMeals = [...meals];
    newMeals[index][field] = value;
    setMeals(newMeals);
  };

  //Create in Firesotre
  const AddNutrition = async () => {
    const user = getAuth().currentUser;
    if (user) {
      try {
        const colRef = collection(db, "nutrition");
        addDoc(colRef, {
          day: day,
          name: name,
          meals: meals,
          client: email,
          trainer: user.email,
          createdAt: serverTimestamp(),
        });
      } catch (e) {
        console.log(e);
      }

      setDay("");
      setName("");
      setMeals([{ name: "" }]);
      console.log(meals);
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
          <View style={styles.formWrapper}>
            <View style={styles.formBox}>
              <Text style={styles.label}>Day of the week:</Text>
              <TextInput
                style={styles.input}
                placeholder="Day..."
                placeholderTextColor={"grey"}
                value={day}
                onChangeText={setDay}
              />

              <Text style={styles.label}>Name:</Text>
              <TextInput
                style={styles.input}
                placeholder={"Name..."}
                placeholderTextColor={"grey"}
                value={name}
                onChangeText={setName}
              />

              <View>
                {meals.map((meal, index) => (
                  <View style={styles.exerciseBox} key={index}>
                    <Text style={styles.label}>Meal {index + 1}:</Text>

                    <TextInput
                      style={styles.input}
                      placeholder="Meal Name..."
                      placeholderTextColor={"grey"}
                      value={meal.name}
                      onChangeText={(text) =>
                        HandleMealChange(index, "name", text)
                      }
                    />

                    <TextInput
                      style={styles.input}
                      placeholder="Calories..."
                      placeholderTextColor={"grey"}
                      keyboardType="numeric"
                      value={meal.calories}
                      onChangeText={(text) =>
                        HandleMealChange(index, "calories", text)
                      }
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Fat..."
                      keyboardType="numeric"
                      placeholderTextColor={"grey"}
                      value={meal.fat}
                      onChangeText={(text) =>
                        HandleMealChange(index, "fat", text)
                      }
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Carbohydrates..."
                      keyboardType="numeric"
                      placeholderTextColor={"grey"}
                      value={meal.carbohydrates}
                      onChangeText={(text) =>
                        HandleMealChange(index, "carbohydrates", text)
                      }
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Protein..."
                      keyboardType="numeric"
                      placeholderTextColor={"grey"}
                      value={meal.protein}
                      onChangeText={(text) =>
                        HandleMealChange(index, "protein", text)
                      }
                    />
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={HandleAddMeal}
                    >
                      <Text style={styles.addButtonText}>Add Meal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => HandleRemoveMeal(index)}
                    >
                      <Text style={styles.removeButtonText}>Remove Meal</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={AddNutrition}>
              <Text style={styles.addButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


const SingleClientScreen = () => {
  const [showFormOne, setShowFormOne] = useState(true);

  const toggleForm = () => {
    setShowFormOne(!showFormOne);
  };

  return (
    <View style={styles.container}>
      {showFormOne ? <FormOne /> : <FormTwo />}
      <View style={styles.buttonContainer}>
        <Button style={{marginBottom:20}} title={showFormOne ? 'Show Nutrition' : 'Show Workout'} onPress={toggleForm} />
      </View>
    </View>
  );
};

export default SingleClientScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  form: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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

