import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Image, Text, View } from "react-native";

import style from "./CardComment.style";

import Card from "../../components/Card";

const IMAGE_DEFAULT =
  "https://i6b8b4u5.stackpathcdn.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png";

const CardCommentComponent = ({ comment }) => {
  const [author, setAuthor] = useState({
    name: "",
    picture: IMAGE_DEFAULT
  });

  useEffect(() => {
    comment.author
      .get()
      .then(snap => setAuthor({ ...snap.data(), id: snap.id }));
  }, []);

  return (
    <Card style={style.card}>
      <Image style={style.userImage} source={{ uri: author.picture }} />
      <View style={style.contentTitle}>
        <Text style={style.userName}>{author.name}</Text>
        <Text style={style.text}>{comment.text}</Text>
      </View>
    </Card>
  );
};

CardCommentComponent.propTypes = {
  comment: PropTypes.object
};

export default CardCommentComponent;
