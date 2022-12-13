import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { usersRef, onSnapshot } from '../../firebase';

const ProfileScreen = () => {

  const [user, setUser] = useState();

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
      <Text> Profile</Text>
  )
}

export default ProfileScreen
