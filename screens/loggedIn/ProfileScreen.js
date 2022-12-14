import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { usersRef, onSnapshot } from '../../firebase';

const ProfileScreen = () => {

  const [user, setUser] = useState();
  const navigation = useNavigation();

  const AdduserScreenPage = () => {
    navigation.navigate('AddUser')
  }

  const getUser = async() => {

    const subscriber = onSnapshot(usersRef, (snapshot) => {
      let user = []
        snapshot.docs.forEach((doc) => {
          user.push({...doc.data(), key: doc.id })
        })
        setUser(user);
        // setLoading(false);
        console.log(user);
    })
    return () => subscriber();
  };

  useEffect ( () => {
    getUser();
  }, []);

  return (
    <TouchableOpacity onPress={AdduserScreenPage} style={[styles.button, styles.buttonOutline]} >
      <Text style={styles.buttonOutlineText}>Register</Text>
    </TouchableOpacity>
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

