import React, { useState, useEffect } from "react";
import { StackActions } from "@react-navigation/native";
import { firebase } from "@react-native-firebase/auth";
import { Image, Text, FlatList, View } from "react-native";

import style from "./User.style";

import CardPost from "../../containers/CardPost";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import Root from "../../components/Root";

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
        <Image style={style.userImage} source={{ uri: user.picture }} />
        <View style={{ flex: 1 }}>
          <Text style={style.userName}>{user.name}</Text>
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
