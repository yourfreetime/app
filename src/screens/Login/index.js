import React from "react";
import { Image, Button, SafeAreaView } from "react-native";
import { StackActions } from "@react-navigation/native";
import style from "./Login.style";

const LoginScreen = ({ navigation }) => (
  <SafeAreaView style={style.container}>
    <Image
      resizeMode="contain"
      source={require("../../assets/logo.png")}
      style={style.logo}
    />
    <Button
      title="Login com o Facebook"
      style={style.button}
      onPress={() => navigation.dispatch(StackActions.replace("Home"))}
    />
  </SafeAreaView>
);

export default LoginScreen;
