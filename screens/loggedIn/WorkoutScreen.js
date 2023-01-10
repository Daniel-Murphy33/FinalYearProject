import { StyleSheet, View } from 'react-native'
import Exercise from '../../components/Exercise'
import {WorkoutTemplate} from '../../components/WorkoutTemplate'



const WorkoutScreen = () => {

  return(
    <View style={styles.container}>
      <Exercise/>
      <WorkoutTemplate/>
    </View>
  )
}

export default WorkoutScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
})