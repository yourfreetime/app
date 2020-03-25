import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Image, Text, View } from "react-native";

import style from "./CardComment.style";

import Avatar from "../../components/Avatar";
import Card from "../../components/Card";

const CardCommentComponent = ({ comment }) => {
  const [author, setAuthor] = useState({
    name: "",
    picture: null
  });

  useEffect(() => {
    comment.author
      .get()
      .then(snap => setAuthor({ ...snap.data(), id: snap.id }));
  }, []);

  return (
    <Card style={style.card}>
      <Avatar picture={author.picture} />
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
