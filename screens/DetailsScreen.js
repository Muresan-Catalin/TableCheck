import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import firebase from "firebase/compat";

const DetailsScreen = () => {
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [menu, setMenu] = useState("");
  const [deal, setDeal] = useState("");
  const [docId, setDocId] = useState("");

  const currentUser = firebase.auth().currentUser;
  const ownerEmail = currentUser.email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const detailsRef = firebase.firestore().collection("Details");
        const snapshot = await detailsRef
          .where("ownerEmail", "==", ownerEmail)
          .get();
        if (snapshot.empty) {
          // No document found, create a new document with the ownerEmail field
          const newDocRef = await detailsRef.add({ ownerEmail });
          setDocId(newDocRef.id);
        } else {
          // Document found, populate state with its data
          snapshot.forEach((doc) => {
            setImage(doc.data().image || "");
            setDescription(doc.data().description || "");
            setMenu(doc.data().menu || "");
            setDeal(doc.data().deal || "");
            setDocId(doc.id);
          });
        }
      } catch (error) {
        console.error("Error fetching data from Firestore: ", error);
      }
    };
    fetchData();
  }, [ownerEmail]);

  const handleSaveData = async () => {
    try {
      const detailsRef = firebase.firestore().collection("Details").doc(docId);
      await detailsRef.set({ image, description, menu, deal }, { merge: true });
      console.log("Data saved to Firestore");
    } catch (error) {
      console.error("Error saving data to Firestore: ", error);
    }
  };
  return (
    <View>
      <Text>DetailsScreen</Text>
      <TextInput
        placeholder="Enter image URL"
        value={image}
        onChangeText={setImage}
      />
      <TextInput
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={5}
      />
      <TextInput placeholder="Enter menu" value={menu} onChangeText={setMenu} />
      <TextInput placeholder="Enter deal" value={deal} onChangeText={setDeal} />
      <Button title="Save Data" onPress={handleSaveData} />
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({});
