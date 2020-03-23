import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, TouchableOpacity, FlatList } from "react-native";
import { StackActions } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";

import style from "./Feed.style";
import Card from "../../components/Card";
import CardPost from "../../components/CardPost";

const FeedScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = firestore()
      .collection("posts")
      .onSnapshot(async querySnapshot => {
        setLoading(false);
        setPosts(
          querySnapshot.docs.map(documentSnapshot => ({
            ...documentSnapshot.data(),
            key: documentSnapshot.id
          }))
        );
      });
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(StackActions.push("FormPost"));
          // firestore()
          //   .collection("posts")
          //   .add({
          //     date: firestore.Timestamp.fromDate(new Date()),
          //     author: firestore()
          //       .collection("users")
          //       .doc(firebase.auth().currentUser.uid),
          //     text: "Correr em casa"
          //   });
        }}
      >
        <Card style={{ marginBottom: 16 }}>
          <Text>O que você está fazendo no seu tempo livre?</Text>
        </Card>
      </TouchableOpacity>
      <FlatList
        style={{ margin: -5 }}
        data={posts}
        renderItem={({ item }) => <CardPost post={item} />}
      />
    </SafeAreaView>
  );
};

export default FeedScreen;
