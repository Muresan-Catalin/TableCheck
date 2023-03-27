import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import firebase from "firebase/compat";
import { useNavigation } from "@react-navigation/native";

const db = firebase.firestore();

const RegisterOwnerScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");

  const navigation = useNavigation();

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       navigation.navigate("Login");
  //     }
  //   });

  //   return unsubscribe;
  // }, []);

  const addEmailToFirestore = async (ownerEmail) => {
    try {
      const ownersRef = firebase.firestore().collection("Owners");
      await ownersRef.add({ ownerEmail });
      console.log("Email added to Owners collection");

      const detailsRef = firebase.firestore().collection("Details");
      const querySnapshot = await detailsRef
        .where("ownerEmail", "==", ownerEmail)
        .get();

      if (!querySnapshot.empty) {
        console.log("Document with matching ownerEmail exists");
      } else {
        await detailsRef.add({ ownerEmail });
        console.log(
          "Document with matching ownerEmail created in Details collection"
        );
      }
    } catch (error) {
      console.error("Error adding email to Firestore", error);
    }
  };

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        addEmailToFirestore(user.email);
        console.log("registered in with: ", user.email, typeof user.email);
      })
      .catch((error) => alert(error.message));
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        onPress={handleSignUp}
        style={[styles.button, styles.buttonOutline]}
      >
        <Text style={styles.buttonOutlineText}>Register</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default RegisterOwnerScreen;

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
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
