import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import firebase from "firebase/compat";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import Locations from "../components/Locations";
import { Pressable } from "react-native";
import Availability from "../components/Availability";
import { auth } from "../firebase";
import { AppContext } from "../AppContext";
import { useContext } from "react";

const db = firebase.firestore();

const AdminScreen = () => {
  const [locations, setLocations] = useState([]);
  const { setAvailability } = useContext(AppContext);

  useEffect(() => {
    handleGetLocations();
  }, []);
  // the empty array [] ensures that the function is only called once when the component mounts

  const handleGetLocations = async () => {
    try {
      const locationsRef = db.collection("Locations");
      const snapshot = await locationsRef.get();
      const locationsArray = snapshot.docs.map((doc) => doc.data());
      const filteredLocationsArray = locationsArray.filter(
        (location) => location.ownerEmail === firebase.auth().currentUser.email // Replace with the specific ownerEmail value you want to filter by
      );
      console.log(filteredLocationsArray[0]);
      setLocations(filteredLocationsArray);
    } catch (error) {
      console.log("Error getting locations: ", error);
    }
  };

  const currentUserEmail = firebase.auth().currentUser.email;

  // Function to update availability field in Firestore
  const updateAvailability = async (value) => {
    const locationRef = db.collection("Locations");
    const query = locationRef.where("ownerEmail", "==", currentUserEmail);
    const querySnapshot = await query.get();
    querySnapshot.forEach(async (doc) => {
      await doc.ref.update({ availability: value });
    });
    setAvailability(parseInt(value));
  };

  const navigation = useNavigation();

  const Add = () => {
    navigation.navigate("Add");
  };

  const Details = () => {
    navigation.navigate("Details");
  };

  return (
    <View>
      <ScrollView>
        <Pressable onPress={Details}>
          <Locations locations={locations} />
        </Pressable>
      </ScrollView>
      <View>
        <Text>Update availability: 1-FREE, 10 - FULL</Text>
        <Button title="1" onPress={() => updateAvailability("1")} />
        <Button title="2" onPress={() => updateAvailability("2")} />
        <Button title="3" onPress={() => updateAvailability("3")} />
        <Button title="4" onPress={() => updateAvailability("4")} />
        <Button title="5" onPress={() => updateAvailability("5")} />
        <Button title="6" onPress={() => updateAvailability("6")} />
        <Button title="7" onPress={() => updateAvailability("7")} />
        <Button title="8" onPress={() => updateAvailability("8")} />
        <Button title="9" onPress={() => updateAvailability("9")} />
        <Button title="10" onPress={() => updateAvailability("10")} />
      </View>
      <View>{<Button title="Add" onPress={Add} />}</View>
    </View>
  );
};

export default AdminScreen;
