import { StyleSheet,
    Text,
    TextInput, 
    TouchableOpacity, 
    View, 
    TouchableWithoutFeedback,
    Keyboard, 
    Button,
    Image, 
    ScrollView} from 'react-native'
  import React, { useState } from 'react'
  import { auth, usersRef, addDoc, setDoc, doc, db } from '../firebase';
  import { useNavigation } from '@react-navigation/core';
  
  const LoginScreen = () => {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [currentWeight, setCurrentWeight] = useState('');
    const [goalWeight, setGoalWeight] = useState('');

    const navigation = useNavigation()
  
    //navigating to screens
    const LoginScreenPage = () => {
      navigation.navigate('Login');
    }
    
    //navigating through screens
    const ForgotPasswordScreen = () => {
      navigation.navigate("ForgotPassword")
    }
  
    //function for signing up
    const handleSignUp = async () => {
      auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (UserCredentials) => {
        const user = UserCredentials.user;
        console.log("Registered with: ", user.email);

        try {
          const uidRef = doc(db, 'users', user.uid);

          const docRef = await setDoc(uidRef, {
            name: name,
            age: age,
            currentWeight: currentWeight,
            goalWeight: goalWeight,
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }

        // AddDetails();
      })
      .catch(error => alert(error.message))
    }
    

    const AddDetails = async() => {      

      try {
        const docRef = await addDoc(usersRef, {
          name: name,
          age: age,
          currentWeight: currentWeight,
          goalWeight: goalWeight,
        });
        console.log("Document written with ID: ", docRef.id);
        setName("");
        setAge("");
        setCurrentWeight(""),
        setGoalWeight ("");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      //has to be called or else details dont get added untill signout ??
      // handleSignUp();
    };
  
  
    return (
      //allows for dismissing keyboard
      <ScrollView>
        <View style={styles.container}>
        <Image source={require('../assets/logo-no-bg.png')} style={styles.logo} />
          <View style={styles.inputContainer}>
            <TextInput placeholder='Email'
            placeholderTextColor="black"
            keyboardType='email-address'
            value={email}
            onChangeText={text => setEmail(text)} style={styles.input} />
            <TextInput placeholder='Password'
            placeholderTextColor="black" 
            value={password} 
            onChangeText={text => setPassword(text)} style={styles.input} secureTextEntry />
            <TextInput placeholder='Full Name'
            placeholderTextColor="black" 
            value={name} 
            onChangeText={text => setName(text)} style={styles.input} />
            <TextInput placeholder='Age'
            placeholderTextColor="black"
            keyboardType='numeric' 
            value={age} 
            onChangeText={text => setAge(text)} style={styles.input} />
            <TextInput placeholder='Current Weight'
            placeholderTextColor="black" 
            keyboardType='numeric'
            value={currentWeight} 
            onChangeText={text => setCurrentWeight(text)} style={styles.input} />
            <TextInput placeholder='Goal Weight'
            placeholderTextColor="black" 
            keyboardType='numeric'
            value={goalWeight} 
            onChangeText={text => setGoalWeight(text)} style={styles.input} />
          </View>
  
          <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSignUp} style={styles.button} >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={LoginScreenPage} style={[styles.button, styles.buttonOutline]} >
            <Text style={styles.buttonOutlineText}>Back To Login</Text>
          </TouchableOpacity>
          <Button title={"Forgot Password ?"} onPress={ForgotPasswordScreen} style={styles.button} />
        </View>
        </View>
      </ScrollView>
    )
  }
  
  export default LoginScreen
  
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
        marginTop: 12,
  
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
        marginTop: 60,
      },
  
  })
  