import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import firebase from "firebase/compat";
import { auth } from "../firebase";
import { useState } from "react";

const db = firebase.firestore();

const Availability = () => {
  const [availability, setAvailability] = useState("");

  return (
    <View>
      <Text>Update availability:</Text>
      <TouchableOpacity onPress={() => updateAvailability("1")}>
        <Text>1</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => updateAvailability("2")}>
        <Text>2</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => updateAvailability("3")}>
        <Text>3</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => updateAvailability("4")}>
        <Text>4</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => updateAvailability("5")}>
        <Text>5</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => updateAvailability("6")}>
        <Text>6</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => updateAvailability("7")}>
        <Text>7</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => updateAvailability("8")}>
        <Text>8</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => updateAvailability("9")}>
        <Text>9</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => updateAvailability("10")}>
        <Text>10</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Availability;
