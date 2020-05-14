import React, { useEffect } from "react";
import Geolocation from "@react-native-community/geolocation";
import { StatusBar, PermissionsAndroid } from "react-native";
import "react-native-gesture-handler";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { NavigationContainer } from "@react-navigation/native";

import colors from "./src/core/colors";
import Routes from "./src/core/Routes";

import { setUser } from "./src/services/user";

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
      <Routes />
    </NavigationContainer>
  );
};

export default App;
