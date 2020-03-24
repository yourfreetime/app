import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation, StackActions } from "@react-navigation/core";

import ButtonFooter from "../ButtonFooter";

import style from "./Footer.style";

import { likePost, unlikePost } from "../../../../services/post";

const FooterComponent = ({ post, author }) => {
  const navigation = useNavigation();

  let like;
  if (post.likes) {
    like = post.likes.find(
      item => item.user.id === firebase.auth().currentUser.uid
    );
  }

  const objectDispatch = navigation.dangerouslyGetParent() || navigation;
  const countLikes = post.likes ? post.likes.length : 0;
  const countComments = post.comments ? post.comments.length : 0;

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
        text={`${countLikes} Realçar`}
        active={!!like}
      />
      <ButtonFooter
        onPress={() =>
          objectDispatch.dispatch(
            StackActions.push("FormComment", { post, author })
          )
        }
        icon="reply"
        text={`${countComments} Responder`}
      />
    </View>
  );
};

FooterComponent.propTypes = {
  post: PropTypes.object,
  author: PropTypes.object
};

export default FooterComponent;
