import React, { useEffect } from "react";
import Geolocation from "@react-native-community/geolocation";
import { StatusBar, TouchableOpacity, PermissionsAndroid } from "react-native";
import "react-native-gesture-handler";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { t } from "./src/i18n";

import colors from "./src/core/colors";

import HomeScreen from "./src/screens/Home";
import LoginScreen from "./src/screens/Login";
import FormPostScreen from "./src/screens/FormPost";
import UserScreen from "./src/screens/User";
import PostScreen from "./src/screens/Post";
import SettingsScreen from "./src/screens/Settings";
import FormCommentScreen from "./src/screens/FormComment";
import PostSavesScreen from "./src/screens/PostSaves";
import SearchScreen from "./src/screens/Search";
import FollowersScreen from "./src/screens/Followers";
import RegisterScreen from "./src/screens/Register";

import Header from "./src/containers/Header";
import UserAvatar from "./src/containers/UserAvatar";

import { setUser } from "./src/services/user";

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    let watchId = null;

    const runLocation = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        watchId = Geolocation.watchPosition(async info => {
          if (firebase.auth().currentUser) {
            await setUser(firebase.auth().currentUser.uid, {
              position: new firestore.GeoPoint(
                info.coords.latitude,
                info.coords.longitude
              )
            });
          }
        });
      }
    };

    runLocation();

    return () => {
      if (watchId) Geolocation.clearWatch(watchId);
    };
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
          name="Register"
          component={RegisterScreen}
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
          options={{ headerTitle: t("SAVED") }}
        />
        <Stack.Screen
          name="Followers"
          component={FollowersScreen}
          options={{ headerTitle: t("FOLLOWERS") }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerStyle: { elevation: 0 }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
