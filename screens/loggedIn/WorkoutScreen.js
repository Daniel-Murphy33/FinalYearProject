import { Pressable, Text, TextInput, View, StyleSheet,
SafeAreaView, FlatList, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Exercise from '../../components/Exercise'
import { MaterialIcons } from '@expo/vector-icons'; 
import { auth, app, db, getFirestore, collection, addDoc, getDocs, colRef, onSnapshot } from '../../firebase'
import { doc, getDoc } from 'firebase/firestore';
const WorkoutScreen = () => {

  return(
    <Exercise/>
  )
}

export default WorkoutScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})