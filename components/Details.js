import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Svg, Image as ImageSvg } from "react-native-svg";
import { db } from "../firebase";
import { useState, useEffect } from "react";

const Details = ({ ownerEmail }) => {
  const [details, setDetails] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!ownerEmail) {
        return;
      }
      const detailsRef = db.collection("Details");
      const query = ownerEmail
        ? await detailsRef.where("ownerEmail", "==", ownerEmail).get()
        : null;

      if (query.empty) {
        console.log("No matching documents");
        return;
      }

      const data = query.docs[0].data();
      setDetails({
        image: data.image,
        description: data.description,
        menu: data.menu,
        deal: data.deal,
      });
      setLoaded(true);
    };

    fetchDetails();
  }, [ownerEmail]);

  if (!loaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <>
        <Svg width={120} height={120}>
          {details && details.image && (
            <ImageSvg
              width={"100%"}
              height={"100%"}
              preserveAspectRatio="xMidYMid slice"
              href={{
                uri: details.image,
              }}
            />
          )}
        </Svg>
        <Text>{details.description}</Text>
        <Text>{details.menu}</Text>
        <Text>{details.deal}</Text>
      </>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 250,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
  },
  img: {
    height: 100,
    position: "relative",
    bottom: 40,
  },
});
