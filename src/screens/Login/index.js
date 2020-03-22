import React from "react";
import { Image, Button, View } from "react-native";
import { StackActions } from "@react-navigation/native";
import style from "./Login.style";

const LoginScreen = ({ navigation }) => (
  <View style={style.container}>
    <Image
      resizeMode="contain"
      source={require("../../assets/logo.png")}
      style={style.logo}
    />
    <Button
      title="Entrar"
      onPress={() => navigation.dispatch(StackActions.replace("Home"))}
    />
  </View>
);

export default LoginScreen;
