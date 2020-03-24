import React, { useState, useEffect } from "react";
import { Text, TouchableNativeFeedback, FlatList } from "react-native";
import { StackActions } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";

import Card from "../../components/Card";
import Loader from "../../components/Loader";
import CardPost from "../../containers/CardPost";
import Root from "../../components/Root";

const FeedScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = firestore()
      .collection("posts")
      .orderBy("date", "desc")
      .onSnapshot(async querySnapshot => {
        setLoading(false);
        setPosts(
          querySnapshot.docs.map(documentSnapshot => ({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
            key: documentSnapshot.id
          }))
        );
      });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loader show />;
  }

  return (
    <Root>
      <Card
        onPress={() => navigation.dispatch(StackActions.push("FormPost"))}
        style={{ marginBottom: 16 }}
      >
        <Text>O que você está fazendo no seu tempo livre?</Text>
      </Card>
      <FlatList
        style={{ margin: -3 }}
        data={posts}
        renderItem={({ item }) => <CardPost post={item} />}
      />
    </Root>
  );
};

export default FeedScreen;
