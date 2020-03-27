import React from "react";
import Geolocation from "@react-native-community/geolocation";
import { StatusBar, TouchableOpacity } from "react-native";
import "react-native-gesture-handler";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "./src/core/colors";

import HomeScreen from "./src/screens/Home";
import LoginScreen from "./src/screens/Login";
import FormPostScreen from "./src/screens/FormPost";
import UserScreen from "./src/screens/User";
import PostScreen from "./src/screens/Post";
import SettingsScreen from "./src/screens/Settings";
import FormCommentScreen from "./src/screens/FormComment";
import PostSavesScreen from "./src/screens/PostSaves";

import Header from "./src/containers/Header";
import UserAvatar from "./src/containers/UserAvatar";

import { setUser } from "./src/services/user";
import SearchScreen from "./src/screens/Search";

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
            headerTitle: props => <Header {...props} />,
            headerStyle: {
              backgroundColor: colors.white,
              borderBottomWidth: 1,
              borderBottomColor: colors.primary
            },
            headerRight: () => (
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
          name="Settings"
          component={SettingsScreen}
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
        <Stack.Screen
          name="PostSaves"
          component={PostSavesScreen}
          options={{ headerTitle: "Salvos" }}
        />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
