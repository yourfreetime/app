import React from "react";
import { Image, View } from "react-native";

import style from "./Logo.style";

const Logo = () => (
  <View style={style.root}>
    <Image
      resizeMode="contain"
      style={style.logo}
      source={require("../../assets/logo-inverse.png")}
    />
  </View>
);

export default Logo;
