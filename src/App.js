import React from "react";
import Geolocation from "@react-native-community/geolocation";
import { StatusBar, TouchableOpacity } from "react-native";
import "react-native-gesture-handler";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "./core/colors";

import HomeScreen from "./screens/Home";
import LoginScreen from "./screens/Login";
import FormPostScreen from "./screens/FormPost";
import UserScreen from "./screens/User";
import PostScreen from "./screens/Post";
import SettingsScreen from "./screens/Settings";
import FormCommentScreen from "./screens/FormComment";

import Logo from "./components/Logo";
import UserAvatar from "./containers/UserAvatar";

import { setUser } from "./services/user";

const Stack = createStackNavigator();

const App = () => {
  Geolocation.watchPosition(async info => {
    await setUser(firebase.auth().currentUser.uid, {
      position: new firestore.GeoPoint(
        info.coords.latitude,
        info.coords.longitude
      )
    });
  });

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.dark} barStyle="light-content" />
      <Stack.Navigator
        initialRouteName={firebase.auth().currentUser ? "Home" : "Login"}
        screenOptions={{ headerStyle: { elevation: 0 } }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerTitle: props => <Logo {...props} />,
            headerStyle: { backgroundColor: colors.primary },
            headerRight: props => (
              <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                <UserAvatar />
              </TouchableOpacity>
            )
          })}
        />
        <Stack.Screen
          name="FormPost"
          component={FormPostScreen}
          options={{
            headerTitle: "",
            headerStyle: { backgroundColor: colors.background }
          }}
        />
        <Stack.Screen
          name="User"
          component={UserScreen}
          options={{
            headerTitle: "",
            headerStyle: { backgroundColor: colors.background }
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerTitle: "",
            headerStyle: { backgroundColor: colors.background }
          }}
        />
        <Stack.Screen
          name="Post"
          component={PostScreen}
          options={{
            headerTitle: "",
            headerStyle: { backgroundColor: colors.background }
          }}
        />
        <Stack.Screen
          name="FormComment"
          component={FormCommentScreen}
          options={{
            headerTitle: "",
            headerStyle: { backgroundColor: colors.background }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
