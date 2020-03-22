import React from "react";
import { Text, View } from "react-native";

import style from "./Feed.style";
import Card from "../../components/Card";
import CardPost from "../../components/CardPost";

const FeedScreen = () => (
  <View style={style.container}>
    <Card style={{ marginBottom: 16 }}>
      <Text>O que você está fazendo no seu tempo livre?</Text>
    </Card>
    <CardPost />
  </View>
);

export default FeedScreen;
