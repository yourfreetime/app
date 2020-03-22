import React from "react";
import { Image, Text, View } from "react-native";

import style from "./CardPost.style";

import Card from "../Card";
import Divider from "../Divider";

const CardPostComponent = () => (
  <Card>
    <View style={style.rootTitle}>
      <Image
        style={style.userImage}
        source={{
          uri:
            "https://i6b8b4u5.stackpathcdn.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
        }}
      />
      <View style={style.contentTitle}>
        <Text style={style.userName}>André Lins</Text>
        <Text style={style.date}>01/02/2019 - 08:15</Text>
      </View>
    </View>
    <Divider />
    <Text>Minha sugestão</Text>
  </Card>
);

export default CardPostComponent;
