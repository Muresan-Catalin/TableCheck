import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { db } from "../firebase";
import Details from "../components/Details";

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Request location permission and get current location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    // Get all documents in Firestore collection
    db.collection("Locations")
      .get()
      .then((querySnapshot) => {
        const updatedLocations = querySnapshot.docs.map((doc) => {
          if (doc.data().location) {
            const availability = doc.data().availability;
            const color = setColor(availability);
            return { ...doc.data(), id: doc.id, availability, color };
          }
        });
        setLocations(updatedLocations);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    // Set up listener to Firestore collection
    const unsubscribe = db.collection("Locations").onSnapshot((snapshot) => {
      const updatedLocations = snapshot.docs.map((doc) => {
        if (doc.data().location) {
          const availability = doc.data().availability;
          const color = setColor(availability);
          return { ...doc.data(), id: doc.id, availability, color };
        }
      });
      setLocations(updatedLocations);
    });

    // Clean up listener on unmount
    return () => unsubscribe();
  }, []);

  const setColor = (data) => {
    if (data == 10) {
      return "red";
    }
    if (data < 10 && data >= 7) {
      return "orange";
    }
    if (data < 7 && data >= 4) {
      return "yellow";
    }
    return "green";
  };

  const updateMarkerColor = (markerId, newColor) => {
    setLocations((prevLocations) => {
      const updatedLocations = [...prevLocations];
      const index = updatedLocations.findIndex((loc) => loc.id === markerId);
      updatedLocations[index] = { ...updatedLocations[index], color: newColor };
      return updatedLocations;
    });
  };

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  } else if (location) {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {locations.map((loc) => (
            <Marker
              key={`${loc.id}-${loc.color}`}
              coordinate={{
                latitude: parseFloat(loc.location[0]),
                longitude: parseFloat(loc.location[1]),
              }}
              pinColor={loc.color}
              title={loc.name}
              description={loc.availability}
              onPress={() => {
                const newColor = setColor(loc.availability);
                updateMarkerColor(loc.id, newColor);
              }}
            >
              <Callout onPress={() => console.log(loc.name)}>
                <Details ownerEmail={loc.ownerEmail} />
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
    );
  } else {
    return <Text>Loading...</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
