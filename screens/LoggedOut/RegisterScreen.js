import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { auth, setDoc, doc, db } from "../../firebase";
import { useNavigation } from "@react-navigation/core";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");

  const navigation = useNavigation();

  //navigating to screens
  const LoginScreenPage = () => {
    navigation.navigate("Login");
  };

  //navigating through screens
  const ForgotPasswordScreen = () => {
    navigation.navigate("Forgot Password?");
  };

  //function for signing up
  const handleSignUp = async () => {
    auth
      //creates with email and password and uid
      .createUserWithEmailAndPassword(email, password)
      .then(async (UserCredentials) => {
        const user = UserCredentials.user;
        console.log("Registered with: ", user.email);
        //Adding extra user details to users and linking with uid
        try {
          const uidRef = doc(db, "users", user.uid);
          await setDoc(uidRef, {
            firstName: firstName,
            lastName: lastName,
            age: age,
            currentWeight: currentWeight,
            goalWeight: goalWeight,
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    //allows for dismissing keyboard
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require("../../assets/logo-no-bg.png")}
          style={styles.logo}
        />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="black"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="black"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="black"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="black"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Age"
            placeholderTextColor="black"
            keyboardType="numeric"
            value={age}
            onChangeText={(text) => setAge(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Current Weight"
            placeholderTextColor="black"
            keyboardType="numeric"
            value={currentWeight}
            onChangeText={(text) => setCurrentWeight(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Goal Weight"
            placeholderTextColor="black"
            keyboardType="numeric"
            value={goalWeight}
            onChangeText={(text) => setGoalWeight(text)}
            style={styles.input}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={LoginScreenPage}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Back To Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={ForgotPasswordScreen}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Forgot Password ?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 12,
  },

  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },

  button: {
    backgroundColor: "#0792F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    // fontSize: 16,
  },

  buttonOutlineText: {
    color: "#0792F9",
    fontWeight: "bold",
    // fontSize: 16,
  },

  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0792F9",
    borderWidth: 2,
  },

  heading: {
    fontWeight: "500",
    fontStyle: "bold",
    fontSize: 23,
    textAlign: "center",
  },

  logo: {
    resizeMode: "contain",
    height: 160,
    marginTop: 60,
  },
});
