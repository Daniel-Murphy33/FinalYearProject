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

const AddNutritionScreen = () => {
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
        const docRef = doc(db, "users", user.uid);
        const colRef = collection(docRef, "nutrition");
        addDoc(colRef, {
          day: day,
          name: name,
          meals: meals,
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
        <Text style={styles.title}>Create Meal Plan</Text>
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
                    <Text style={styles.label}>Nutrition Entry {index + 1}:</Text>

                    <TextInput
                      style={styles.input}
                      placeholder="Item Name..."
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

export default AddNutritionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  formWrapper: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: "center",
  },
  formBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginBottom: 20,
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
