import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { doc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
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
    { name: "", sets: "", reps: "", videoLink: "", },
  ]);
  const [selectedOption, setSelectedOption] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const options = ['Option 1', 'Option 2', 'Option 3'];

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
          trainingType: trainingType,
          createdAt: serverTimestamp(),
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
          <View
          key={index}
          style={{ ...styles.container, flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}
        >
          <TextInput
            style={{ ...styles.input2, width: "30%", }}
            placeholder="Enter Exercise"
            placeholderTextColor={"black"}
            onChangeText={(text) => handleChangeExercise(index, text)}
            value={field.name}
          />  
          <View style={styles.setsRepsContainer}>
            <TextInput
              style={styles.input2}
              placeholder="Sets"
              placeholderTextColor={"black"}
              onChangeText={(text) => handleChangeSets(index, text)}
              value={field.sets}
            />
            <TextInput
              style={styles.input2}
              placeholder="Reps"
              placeholderTextColor={"black"}
              onChangeText={(text) => handleChangeReps(index, text)}
              value={field.reps}
            />
            <TextInput
              style={styles.input2}
              placeholder="Youtube Video Link"
              placeholderTextColor={"black"}
              onChangeText={(text) => handleChangeVideoLink(index, text)}
              value={field.videoLink}
            />
          </View>
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
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button2: {
    fontSize: 20,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  modalContainer: {
    padding: 20,
  },
  exercise: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },


  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
    marginVertical: 20,
  },
  setsRepsContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent:'space-between',
    alignItems: 'center',
  },
  input2: {
    height: 40,
    borderColor: "black",
    borderWidth: 2,
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
    marginHorizontal: 5,
  }, 
  heading: {
    fontWeight: "900",
    fontStyle: "bold",
    fontSize: 30,
    flex: 1,
    marginTop: 20,
    textAlign: "center",
  },
  input: {
    width: "90%",
    height: 40,
    borderColor: "black",
    borderWidth: 2,
    marginVertical: 10,
    padding: 10,
    fontSize: 18,
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
    fontSize: 18,
  },
});
