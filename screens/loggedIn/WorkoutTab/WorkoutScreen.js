import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import RecentWorkoutCard from "../../../components/RecentWorkoutCard";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { collection, db, doc } from "../../../firebase";
import { getDocs, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

const WorkoutScreen = () => {
  const navigation = useNavigation();
  const user = getAuth().currentUser;
  const [workouts, setWorkouts] = useState("");

  // getting from firestore
  const GetWorkout = async () => {
    // get user
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const colRef = collection(docRef, "workouts");
      const q = await query(colRef, orderBy("createdAt", "desc"), limit(3));

      const sub = await getDocs(q)
      sub.forEach(subs => {
        console.log(subs.data())
      })
    }
  };

  useEffect(() => {
    GetWorkout();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
      <Text style={styles.title}>Start Workout</Text>
      <MaterialIcons
        style={styles.icon}
        name="fitness-center"
        size={35}
        color="#0792F9"
      />
      <Text style={styles.subTitle}>Add Workout Template</Text>
      <TouchableOpacity
        style={styles.createWorkoutBtn}
        onPress={() => navigation.navigate("AddWorkout")}
      >
        <Text style={styles.btnText}>Create Workout Template</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.ViewWorkoutBtn}
        onPress={() => navigation.navigate("AllWorkout")}
      >
        <Text style={styles.btnText}>View All Workouts</Text>
      </TouchableOpacity>
      
      <Text style={styles.title2}>Recent Workouts</Text>
      </View>
      <RecentWorkoutCard style={styles.card}/>
    </SafeAreaView>
  );
};

export default WorkoutScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    marginTop: 45,
    height:'90%'
  },
  card: {
    
  },
  title: {
    textAlign: "left",
    fontSize: 30,
    fontWeight: "bold",
    top: 40,
    left: 25,
  },
  title2: {
    textAlign: "left",
    fontSize: 30,
    fontWeight: "bold",
    top: 55,
    left: 25,
  },
  subTitle: {
    textAlign: "left",
    fontSize: 20,
    top: 40,
    left: 25,
  },
  icon: {
    alignSelf: "center",
    left: 120,
    top: 5,
  },
  createWorkoutBtn: {
    alignSelf: "center",
    top: 70,
    backgroundColor: "#0792F9",
    width: "80%",
    height: 30,
    borderRadius: 20,
    margin: 23,
  },
  ViewWorkoutBtn: {
    alignSelf: "center",
    top: 55,
    backgroundColor: "#0792F9",
    width: "80%",
    height: 30,
    borderRadius: 20,
    margin: 40,
  },
  btnText: {
    textAlign: "center",
    // alignSelf:'center',
    fontSize: 20,
    color: "white",
  },
});
