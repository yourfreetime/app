import React, { useState, useEffect } from "react";
import { StackActions } from "@react-navigation/native";
import { firebase } from "@react-native-firebase/auth";
import { Image, Text, FlatList, View } from "react-native";

import style from "./User.style";

import CardPost from "../../containers/CardPost";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import Root from "../../components/Root";
import Count from "./components/Count";

import { getUser } from "../../services/user";
import { allByUser } from "../../services/post";

const UserScreen = ({ route }) => {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let userId = firebase.auth().currentUser.uid;
    if (route && route.params && route.params.userId) {
      userId = route.params.userId;
    }

    const getData = async () => {
      const result = await getUser(userId);
      setUser(result.data());
      setLoading(false);
    };
    getData();

    const unsubscribe = allByUser(userId, posts => {
      setPosts(posts);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loader show />;
  }
  return (
    <Root style={route.params ? { paddingTop: 0 } : {}}>
      <View style={style.userArea}>
        <View style={{ alignItems: "center", marginRight: 16, flex: 0.5 }}>
          <Image style={style.userImage} source={{ uri: user.picture }} />
          <Text style={style.userName}>{user.name}</Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <View style={style.counts}>
            <Count count={posts.length} title="Publicações" icon="desk-lamp" />
            <Count count={0} title="Salvos" icon="bookmark" />
            <Count count={0} title="Amigos" icon="account-heart" />
          </View>
          <Button size="small" variant="white" title="Ouvir sugestões" />
        </View>
      </View>
      <FlatList
        style={{ margin: -3, marginBottom: 0 }}
        data={posts}
        renderItem={({ item }) => <CardPost post={item} />}
      />
    </Root>
  );
};

export default UserScreen;
