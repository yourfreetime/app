import React, { useState } from "react";
import { Image, SafeAreaView } from "react-native";
import { StackActions } from "@react-navigation/native";
import { firebase } from "@react-native-firebase/auth";
import { AccessToken, LoginManager } from "react-native-fbsdk";

import style from "./Login.style";

import Button from "../../components/Button";
import Loader from "../../components/Loader";

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={style.container}>
      <Loader show={loading} />
      <Image
        resizeMode="contain"
        source={require("../../assets/logo.png")}
        style={style.logo}
      />
      <Button
        variant="white"
        title="Login com o Facebook"
        onPress={async () => {
          setLoading(true);

          await LoginManager.logInWithPermissions(["public_profile", "email"]);
          const data = await AccessToken.getCurrentAccessToken();

          const credential = firebase.auth.FacebookAuthProvider.credential(
            data.accessToken
          );

          await firebase.auth().signInWithCredential(credential);

          setLoading(false);

          navigation.dispatch(StackActions.replace("Home"));
        }}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
