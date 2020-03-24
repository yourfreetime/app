import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import ButtonFooter from "../ButtonFooter";

import style from "./Footer.style";

import { likePost, unlikePost } from "../../../../services/post";

const FooterComponent = ({ post }) => {
  let like;
  if (post.likes) {
    like = post.likes.find(
      item => item.user.id === firebase.auth().currentUser.uid
    );
  }

  return (
    <View style={style.buttons}>
      <ButtonFooter
        onPress={async () => {
          if (!like) {
            await likePost(post.id, {
              user: firestore()
                .collection("users")
                .doc(firebase.auth().currentUser.uid)
            });
          } else {
            await unlikePost(post.id, like);
          }
        }}
        icon="enhance"
        text="Realçar"
        active={!!like}
      />
      <ButtonFooter icon="reply" text="Responder" />
    </View>
  );
};

FooterComponent.propTypes = {
  post: PropTypes.object
};

export default FooterComponent;
