import { View, TextInput, Button, Text } from "react-native";
import React from "react";
import { useState } from "react";
import firebase from "firebase/compat";
import { useNavigation } from "@react-navigation/native";

const db = firebase.firestore();

const AddScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState("");
  const [location, setLocation] = useState("");

  const handleAddLocation = async () => {
    try {
      const newLocation = {
        name,
        price,
        availability,
        location: location.split(","),
        ownerEmail: firebase.auth().currentUser.email, // Add ownerEmail to the newLocation object
      };

      await db.collection("Locations").add(newLocation);

      setName("");
      setPrice("");
      setAvailability("");
      setLocation("");
    } catch (error) {
      console.log("Error adding location: ", error);
    }
  };

  const navigation = useNavigation();
  const goToMaps = () => {
    navigation.navigate("Maps");
  };

  return (
    <View>
      <Text>Name:</Text>
      <TextInput value={name} onChangeText={setName} />
      <Text>Price:</Text>
      <TextInput value={price} onChangeText={setPrice} />
      <Text>Availability:</Text>
      <TextInput value={availability} onChangeText={setAvailability} />
      <Text>Location:</Text>
      <TextInput value={location} onChangeText={setLocation} />
      <Button title="Add Location" onPress={handleAddLocation} />
      <View>
        <Button title="Map" onPress={goToMaps} />
      </View>
    </View>
  );
};

export default AddScreen;
