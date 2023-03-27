import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Locations = ({ locations }) => {
  return (
    <View style={styles.container}>
      {locations.map((location) => (
        <View key={location.name} style={styles.location}>
          <Text style={styles.title}>{location.name}</Text>
          <Text style={styles.text}>Price: {location.price}</Text>
          <Text style={styles.text}>Availability: {location.availability}</Text>
          <Text style={styles.text}>
            Location: {location.location.join(", ")}
          </Text>
          <Text style={styles.text}>Owner Email: {location.ownerEmail}</Text>
          {location.ownerEmail && (
            <Text style={styles.text}>
              Owner: {location.ownerEmail.split("@")[0]}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  location: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 3,
  },
});

export default Locations;
