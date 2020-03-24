import React, { useState, useEffect } from "react";
import { Image, Text, View, TextInput } from "react-native";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { StackActions } from "@react-navigation/core";

import style from "./FormPost.style";

import Button from "../../components/Button";
import Root from "../../components/Root";

import { createPost, updatePost } from "../../services/post";

const FormPostScreen = ({ navigation, route }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (route) {
      setText(route.params.post.text);
    }
  }, []);

  const currentUser = firebase.auth().currentUser;

  return (
    <Root>
      <View style={style.user}>
        <Image style={style.userImage} source={{ uri: currentUser.photoURL }} />
        <Text style={style.userName}>{currentUser.displayName}</Text>
      </View>
      <TextInput
        style={style.input}
        textAlignVertical="top"
        placeholder="Peça ou sugira algo para fazer no tempo livre..."
        multiline
        numberOfLines={4}
        onChangeText={newText => setText(newText)}
        value={text}
      />
      <Button
        variant="primary"
        title={route ? "Atualizar" : "Enviar"}
        onPress={async () => {
          if (!route) {
            await createPost({
              author: firestore()
                .collection("users")
                .doc(firebase.auth().currentUser.uid),
              text
            });
          } else {
            await updatePost(route.params.post.id, text);
          }

          navigation.dispatch(StackActions.pop());
        }}
      />
    </Root>
  );
};

export default FormPostScreen;
