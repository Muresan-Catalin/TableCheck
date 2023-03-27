import { View, TextInput, Button, Text } from "react-native";
import React from "react";
import { useState } from "react";
import firebase from "firebase/compat";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [productName, setProductName] = useState("");
  const [products, setProducts] = useState([]);

  const addProduct = () => {
    if (productName) {
      const db = firebase.firestore();
      const productRef = db.collection("Product");
      productRef
        .add({
          name: productName,
        })
        .then(() => {
          console.log("Product added successfully!");
          setProductName("");
        })
        .catch((error) => {
          console.error("Error adding product: ", error);
        });
    }
  };

  const getProducts = () => {
    const db = firebase.firestore();
    const productRef = db.collection("Product");
    productRef
      .get()
      .then((querySnapshot) => {
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setProducts(products);
      })
      .catch((error) => {
        console.error("Error retrieving products: ", error);
      });
  };

  const deleteProduct = (productId) => {
    const db = firebase.firestore();
    const productRef = db.collection("Product").doc(productId);
    productRef
      .delete()
      .then(() => {
        console.log("Product deleted successfully!");
        const updatedProducts = products.filter(
          (product) => product.id !== productId
        );
        setProducts(updatedProducts);
      })
      .catch((error) => {
        console.error("Error deleting product: ", error);
      });
  };

  const updateProduct = (productId, newName) => {
    const db = firebase.firestore();
    const productRef = db.collection("Product").doc(productId);
    productRef
      .update({
        name: newName,
      })
      .then(() => {
        console.log("Product updated successfully!");
        const updatedProducts = products.map((product) => {
          if (product.id === productId) {
            return { ...product, name: newName };
          } else {
            return product;
          }
        });
        setProducts(updatedProducts);
      })
      .catch((error) => {
        console.error("Error updating product: ", error);
      });
  };

  const navigation = useNavigation();

  const goToMaps = () => {
    navigation.navigate("Maps");
  };

  return (
    <View>
      <TextInput
        placeholder="Product name"
        value={productName}
        onChangeText={(text) => setProductName(text)}
      />
      <Button title="Add" onPress={addProduct} />
      <Button title="Get Products" onPress={getProducts} />
      {products.map((product) => (
        <View
          key={product.id}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <TextInput
            style={{ flex: 1 }}
            value={product.name}
            onChangeText={(text) => updateProduct(product.id, text)}
          />
          <Button title="Delete" onPress={() => deleteProduct(product.id)} />
        </View>
      ))}
      <View>
        <Button title="Map" onPress={goToMaps} />
      </View>
    </View>
  );
};

export default HomeScreen;
