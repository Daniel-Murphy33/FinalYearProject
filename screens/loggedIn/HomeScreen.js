import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { auth } from '../../firebase'
import { useNavigation } from '@react-navigation/core'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = () => {
  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
    .signOut()
    .catch(error => alert(error.message))
  }

  const WorkoutScreenPage= () => {
    //works for screens in same stack
    navigation.navigate("Workouts")
  }
  const AnalyticsScreenPage= () => {
    //works for screens in same stack
    navigation.navigate("Analytics")
  }
  const ProfileScreenPage= () => {
    //works for screens in same stack
    navigation.navigate("Profile")
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Welcome {auth.currentUser?.email} !</Text>
        <View style={styles.container}>
        <TouchableOpacity onPress={WorkoutScreenPage} style={styles.button}>
            <Text style={styles.buttonText}>Workouts</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={AnalyticsScreenPage} style={styles.button}>
            <Text style={styles.buttonText}>Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ProfileScreenPage} style={styles.button}>
            <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={handleSignOut}
        style={styles.button}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignitems: 'center',
  },
  
  button: {
    backgroundColor: '#0792F9',
    width: '95%',
    padding: 15,
    borderRadius: 10, 
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center'
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  heading: {
    fontWeight: '900',
    fontStyle: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
  },
})