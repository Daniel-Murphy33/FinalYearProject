import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import Exercise from '../../components/Exercise'
import {WorkoutTemplate} from '../../components/WorkoutTemplate'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const WorkoutScreen = () => {

  const navigation = useNavigation();

  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Start Workout</Text>
      <MaterialIcons style={styles.icon} name="fitness-center" size={35} color="#0792F9" />
      <Text style={styles.subTitle}>Add Workout Template</Text>
      <TouchableOpacity style={styles.createWorkoutBtn} onPress={() => navigation.navigate("AddWorkout")}>
        <Text style={styles.btnText}>Create Workout Template</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.ViewWorkoutBtn} onPress={() => navigation.navigate("AllWorkout")}>
        <Text style={styles.btnText}>View All Workouts</Text>
      </TouchableOpacity>    
      <Text style={styles.title2}>Recent Workouts</Text>
    </SafeAreaView>
  )
}

export default WorkoutScreen

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#FFF',
    flex: 1,
    marginTop:45,
  },
  title: {
    textAlign: 'left',
    fontSize: 30,
    fontWeight: 'bold',
    top:40,
    left:25
  },
  title2: {
    textAlign: 'left',
    fontSize: 30,
    fontWeight: 'bold',
    top:55,
    left:25
  },
  subTitle: {
    textAlign: 'left',
    fontSize: 20,
    top:40,
    left:25
  },
  icon: {
    alignSelf: 'center',
    left: 120,
    top:5
  },
  createWorkoutBtn: {
    alignSelf:'center',
    top:70,
    backgroundColor: '#0792F9',
    width: '80%',
    height: 30,
    borderRadius: 20,
    margin: 23,
  },
  ViewWorkoutBtn: {
    alignSelf:'center',
    top:55,
    backgroundColor: '#0792F9',
    width: '80%',
    height: 30,
    borderRadius: 20,
    margin: 40,
  },
  btnText: {
    textAlign:'center',
    // alignSelf:'center',
    fontSize: 20,
    color: 'white',
  }
})