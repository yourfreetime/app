import React, { useState, useEffect } from "react";
import { Image, Text, View, TextInput } from "react-native";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { StackActions } from "@react-navigation/core";
import { t } from "../../i18n";

import style from "./FormPost.style";

import Button from "../../components/Button";
import Root from "../../components/Root";

import { createPost, updatePost } from "../../services/post";

const FormPostScreen = ({ navigation, route }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (route.params) {
      setText(route.params.post.text);
    }
  }, []);

  const currentUser = firebase.auth().currentUser;

  return (
    <Root style={{ paddingTop: 0 }}>
      <View style={style.user}>
        <Image style={style.userImage} source={{ uri: currentUser.photoURL }} />
        <Text style={style.userName}>{currentUser.displayName}</Text>
      </View>
      <TextInput
        style={style.input}
        textAlignVertical="top"
        placeholder={t("PLACEHOLDER_POST")}
        multiline
        numberOfLines={4}
        onChangeText={newText => setText(newText)}
        value={text}
        autoFocus
      />
      <Button
        variant="primary"
        title={route.params ? t("UPDATE") : t("SEND")}
        onPress={async () => {
          if (!route.params) {
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
