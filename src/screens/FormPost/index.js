import React, { useState } from "react";
import { Image, Text, View, TextInput } from "react-native";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { StackActions } from "@react-navigation/core";

import style from "./FormPost.style";

import Button from "../../components/Button";
import Root from "../../components/Root";

import { createPost } from "../../services/post";

const FormPostScreen = ({ navigation }) => {
  const [text, setText] = useState("");

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
        title="Publicar"
        onPress={async () => {
          await createPost({
            author: firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid),
            text
          });

          navigation.dispatch(StackActions.pop());
        }}
      />
    </Root>
  );
};

export default FormPostScreen;
