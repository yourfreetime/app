import React from "react";
import { Image, SafeAreaView } from "react-native";
import { StackActions } from "@react-navigation/native";
import { firebase } from "@react-native-firebase/auth";
import { AccessToken, LoginManager } from "react-native-fbsdk";

import style from "./Login.style";

import Button from "../../components/Button";

const LoginScreen = ({ navigation }) => (
  <SafeAreaView style={style.container}>
    <Image
      resizeMode="contain"
      source={require("../../assets/logo.png")}
      style={style.logo}
    />
    <Button
      variant="white"
      title="Login com o Facebook"
      onPress={async () => {
        const result = await LoginManager.logInWithPermissions([
          "public_profile",
          "email"
        ]);
        console.log(result);
        const data = await AccessToken.getCurrentAccessToken();

        const credential = firebase.auth.FacebookAuthProvider.credential(
          data.accessToken
        );

        const result1 = await firebase.auth().signInWithCredential(credential);
        console.log(result1);
      }}
    />
  </SafeAreaView>
);

export default LoginScreen;
