import React from "react";
import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "./core/colors";

import HomeScreen from "./screens/Home";
import LoginScreen from "./screens/Login";

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <StatusBar backgroundColor={colors.dark} barStyle="light-content" />
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: "Your Free Time" }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
