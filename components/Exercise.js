import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'; 

// exercise object

const Exercise = (props) => {
  return (
    <View style={styles.container}>
      {/*checked item */}
      <Pressable>
      <AntDesign name="checkcircleo" size={24} color="black" />
      </Pressable>
      {/*workout text */}
      <Text style={styles.title}>{props.title}</Text>
      {/*delete button */}
      <Pressable>
      <MaterialIcons name="delete" size={24} color="black" />
      </Pressable>    
    </View>
  )
}

export default Exercise

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 20,
  },

  title: {
    flex: 1,
    marginLeft: 10,
    fontWeight: 'bold',
  }
})