import React, { useState, useEffect } from "react";
import { StackActions } from "@react-navigation/native";
import { firebase } from "@react-native-firebase/auth";
import { Image, Text, FlatList, View } from "react-native";
import { t } from "../../i18n";

import style from "./User.style";

import CardPost from "../../containers/CardPost";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import Root from "../../components/Root";
import Count from "./components/Count";

import { getUser } from "../../services/user";
import { allByUser } from "../../services/post";
import { createFollow, removeFollow, listFollow } from "../../services/follow";

const UserScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);

  const [countFollow, setCountFollow] = useState(0);
  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    let userId = firebase.auth().currentUser.uid;
    if (route && route.params && route.params.userId) {
      userId = route.params.userId;
    }

    const getData = async () => {
      const result = await getUser(userId);
      setUser({ ...result.data(), id: userId });

      navigation.setOptions({ headerTitle: result.data().name });

      setLoading(false);
    };
    getData();

    const unsubscribe = allByUser(userId, posts => {
      setPosts(posts);
    });

    const unsubscribeFollow = listFollow(userId, (followers, newIsFollow) => {
      setCountFollow(followers.length);
      setIsFollow(newIsFollow);
    });

    return () => {
      unsubscribe();
      unsubscribeFollow();
    };
  }, []);

  if (loading) {
    return <Loader show />;
  }
  return (
    <Root style={route.params ? { paddingTop: 0 } : {}}>
      <View style={style.userArea}>
        <View style={{ alignItems: "center", marginRight: 16, flex: 0.5 }}>
          <Image style={style.userImage} source={{ uri: user.picture }} />
        </View>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <View style={style.counts}>
            <Count
              count={posts.length}
              title={t("PUBLICATIONS")}
              icon="desk-lamp"
            />
            <Count
              count={user.saves ? user.saves.length : 0}
              title={t("SAVED")}
              icon="bookmark"
              onPress={() =>
                navigation.dispatch(
                  StackActions.push("PostSaves", { userId: user.id })
                )
              }
            />
            <Count
              count={countFollow}
              title={t("FOLLOWERS")}
              icon="account-heart"
              onPress={() =>
                navigation.dispatch(
                  StackActions.push("Followers", { userId: user.id })
                )
              }
            />
          </View>
          {route.params &&
            route.params.userId !== firebase.auth().currentUser.uid && (
              <Button
                onPress={async () => {
                  if (!isFollow) {
                    await createFollow(
                      firebase.auth().currentUser.uid,
                      route.params.userId
                    );
                  } else {
                    await removeFollow(
                      firebase.auth().currentUser.uid,
                      route.params.userId
                    );
                  }
                }}
                size="small"
                variant="white"
                title={isFollow ? t("FOLLOWING") : t("FOLLOW")}
              />
            )}
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
