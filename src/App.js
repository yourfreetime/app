import React from "react";
import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import { firebase } from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "./core/colors";

import HomeScreen from "./screens/Home";
import LoginScreen from "./screens/Login";
import FormPostScreen from "./screens/FormPost";
import UserScreen from "./screens/User";
import PostScreen from "./screens/Post";
import FormCommentScreen from "./screens/FormComment";

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <StatusBar backgroundColor={colors.dark} barStyle="light-content" />
    <Stack.Navigator
      initialRouteName={firebase.auth().currentUser ? "Home" : "Login"}
    >
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
      <Stack.Screen
        name="FormPost"
        component={FormPostScreen}
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: colors.background, elevation: 0 }
        }}
      />
      <Stack.Screen
        name="User"
        component={UserScreen}
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: colors.background, elevation: 0 }
        }}
      />
      <Stack.Screen
        name="Post"
        component={PostScreen}
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: colors.background, elevation: 0 }
        }}
      />
      <Stack.Screen
        name="FormComment"
        component={FormCommentScreen}
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: colors.background, elevation: 0 }
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
