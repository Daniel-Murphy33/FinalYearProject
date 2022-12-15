import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, StyleSheet, View, FlatList } from 'react-native'
import { doc, collection, db, onSnapshot } from '../../firebase';
import {getAuth} from 'firebase/auth';

const ProfileScreen = () => {

  const [user, setUser] = useState();
  const navigation = useNavigation();

  const AdduserScreenPage = () => {
    navigation.navigate('AddUser')
  }

  const getUser = async() => {

    if(getAuth().currentUser) {
      const uidRef = doc(db, 'users', getAuth().currentUser.uid);

      const subscriber = onSnapshot(uidRef, async (doc) => {
        let user =[]
          setUser({...doc.data(), key: doc.id})
      })
      console.log(user);
    }
    else {
      //not logged in
    }
  };

  useEffect ( () => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={user}
        renderItem={({item}) => (
          <View style={styles.container}>
            <Text>Exercise Title: {item.name}</Text>
            <Text>Exercise Description: {item.age}</Text>
          </View>
          )}
        />
      <TouchableOpacity onPress={getUser} style={[styles.button, styles.buttonOutline]} >
        <Text style={styles.buttonOutlineText}>Register</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent:'center',
      alignItems:'center',
  },

  inputContainer: {
    width:'80%'
    },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,

  },

  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },

  button: {
    backgroundColor: '#0792F9',
    width: '100%',
    padding: 15,
    borderRadius: 10, 
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    // fontSize: 16,
  },

  buttonOutlineText: {
    color: '#0792F9',
    fontWeight: 'bold',
    // fontSize: 16,
  },

  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0792F9',
    borderWidth: 2,
  },

  heading: {
    fontWeight: '500',
    fontStyle: 'bold',
    fontSize: 23  ,
    textAlign: 'center',
  },

  logo: {
    resizeMode: "contain",
    height: 160,
    marginBottom: 60
  },

})

