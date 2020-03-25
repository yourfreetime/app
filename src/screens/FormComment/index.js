import React, { useState } from "react";
import { Image, Text, View, TextInput } from "react-native";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { StackActions } from "@react-navigation/core";

import style from "./FormComment.style";

import Button from "../../components/Button";
import Root from "../../components/Root";
import Card from "../../components/Card";

import { createComment } from "../../services/post";

const FormCommentScreen = ({ navigation, route }) => {
  const [text, setText] = useState("");

  const currentUser = firebase.auth().currentUser;
  const post = route.params.post;
  const author = route.params.author;

  return (
    <Root style={{ paddingTop: 3 }}>
      <Card style={style.post}>
        <Image style={style.userImage} source={{ uri: author.picture }} />
        <Text style={style.textPost}>{post.text}</Text>
      </Card>
      <Text style={style.titleAnswer}>Sua resposta:</Text>
      <View style={style.form}>
        <Image style={style.userImage} source={{ uri: currentUser.photoURL }} />
        <TextInput
          style={style.input}
          textAlignVertical="top"
          placeholder="Sugira algo para fazer..."
          multiline
          numberOfLines={4}
          onChangeText={newText => setText(newText)}
          value={text}
        />
      </View>
      <Button
        variant="primary"
        title="Responder"
        onPress={async () => {
          await createComment(post.id, {
            author: firestore()
              .collection("users")
              .doc(currentUser.uid),
            text
          });

          navigation.dispatch(StackActions.pop());
        }}
      />
    </Root>
  );
};

export default FormCommentScreen;
