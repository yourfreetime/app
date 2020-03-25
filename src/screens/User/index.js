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

const UserScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let userId = firebase.auth().currentUser.uid;
    if (route && route.params && route.params.userId) {
      userId = route.params.userId;
    }

    const unsubscribe = allByUser(userId, posts => {
      setLoading(false);
      setPosts(posts);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loader show />;
  }

  let userId = firebase.auth().currentUser.uid;
  if (route && route.params && route.params.userId) {
    userId = route.params.userId;
  }

  const isMyUser = userId === firebase.auth().currentUser.uid;

  return (
    <Root>
      <FlatList
        style={{ margin: -3, marginBottom: isMyUser ? 10 : 0 }}
        data={posts}
        renderItem={({ item }) => <CardPost post={item} />}
      />
      {isMyUser && (
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
      )}
    </Root>
  );
};

export default UserScreen;
