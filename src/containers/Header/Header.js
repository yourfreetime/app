import React from "react";
import { Text, Image, View, TouchableOpacity } from "react-native";
import { useNavigation, StackActions } from "@react-navigation/core";
import { t } from "../../i18n";

import style from "./Header.style";

const HeaderContainer = () => {
  const navigation = useNavigation();

  return (
    <View style={style.root}>
      <Image
        resizeMode="contain"
        style={style.logo}
        source={require("../../assets/logo-inverse.png")}
      />
      <TouchableOpacity
        onPress={() => navigation.dispatch(StackActions.push("Search"))}
      >
        <Text style={style.text}>{t("SEARCH")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderContainer;
