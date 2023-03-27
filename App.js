import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import MapsScreen from "./screens/MapsScreen";
import AdminScreen from "./screens/AdminScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SelectRoleScreen from "./screens/SelectRoleScreen";
import RegisterOwnerScreen from "./screens/RegisterOwnerScreen";
import AddScreen from "./screens/AddScreen";
import DetailsScreen from "./screens/DetailsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { AppContext, AppProvider } from "./AppContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const User = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{ headerShown: false }}
        name="Maps"
        component={MapsScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

const Admin = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Admin" component={AdminScreen} />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Maps"
        component={MapsScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Admin" component={Admin} />
      <Stack.Screen name="Role" component={SelectRoleScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Owner" component={RegisterOwnerScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
