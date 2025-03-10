import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import StakingScreen from "./src/screens/StakingScreen";

// Define the types for the stack navigator
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Staking: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Staking" component={StakingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
