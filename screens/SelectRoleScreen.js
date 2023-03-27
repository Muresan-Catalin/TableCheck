import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SelectRoleScreen = () => {
  const navigation = useNavigation();

  const User = () => {
    navigation.navigate("Register");
  };

  const Owner = () => {
    navigation.navigate("Owner");
  };

  return (
    <View>
      <TouchableOpacity
        onPress={User}
        style={[styles.button, styles.buttonOutline]}
      >
        <Text style={styles.buttonOutlineText}>Customer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={Owner}
        style={[styles.button, styles.buttonOutline]}
      >
        <Text style={styles.buttonOutlineText}>Owner</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectRoleScreen;

const styles = StyleSheet.create({
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
});
