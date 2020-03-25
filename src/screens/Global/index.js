import React, { useState, useEffect } from "react";
import { FlatList, Text } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

import style from "./Global.style";

import Root from "../../components/Root";
import Loader from "../../components/Loader";
import Card from "../../components/Card";
import CardPost from "../../containers/CardPost";

import { allByLocation } from "../../services/post";

const GlobalScreen = () => {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Geolocation.getCurrentPosition(async info => {
      const posts = await allByLocation(info.coords);
      setPosts(posts);
      setLoading(false);
    });
  });

  if (loading) {
    return <Loader show />;
  }

  return (
    <Root>
      <Card style={style.title}>
        <MaterialIcons name="access-point" size={25} style={style.icon} />
        <Text>O que pessoas próximas fazem no tempo livre?</Text>
      </Card>
      <FlatList
        style={{ margin: -3 }}
        data={posts}
        columnWrapperStyle
        numColumns={2}
        renderItem={({ item }) => (
          <CardPost post={item} style={style.cardPost} simple />
        )}
      />
    </Root>
  );
};

export default GlobalScreen;
