import React, { useState, useEffect } from "react";
import { StackActions } from "@react-navigation/native";
import { firebase } from "@react-native-firebase/auth";
import { Image, Text, SafeAreaView, FlatList, View } from "react-native";

import style from "./User.style";

import CardPost from "../../containers/CardPost";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import { getUser } from "../../services/user";
import { allByUser } from "../../services/post";

const UserScreen = ({ navigation, route }) => {
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

    const unsubscribe = allByUser(userId, posts => setPosts(posts));
    getData();

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loader show />;
  }

  return (
    <SafeAreaView style={style.container}>
      <View style={style.userArea}>
        <Image style={style.userImage} source={{ uri: user.picture }} />
        <Text style={style.userName}>{user.name}</Text>
      </View>
      <FlatList
        style={{ margin: -5, marginBottom: 10 }}
        data={posts}
        renderItem={({ item }) => <CardPost post={item} />}
      />
      <Button
        variant="primary"
        title="Sair"
        onPress={async () => {
          firebase.auth().signOut();
          navigation
            .dangerouslyGetParent()
            .dispatch(StackActions.replace("Login"));
        }}
      />
    </SafeAreaView>
  );
};

export default UserScreen;
