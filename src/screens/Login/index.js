import React from "react";
import { Image, SafeAreaView } from "react-native";
import { StackActions } from "@react-navigation/native";
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
      onPress={() => navigation.dispatch(StackActions.replace("Home"))}
    />
  </SafeAreaView>
);

export default LoginScreen;
