import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Image, Text, View } from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

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
    <View style={style.root}>
      <Avatar picture={author.picture} />
      <Card style={style.card}>
        <Text style={style.userName}>{author.name}</Text>
        <Text style={style.text}>{comment.text}</Text>
        <MaterialIcons
          name="arrow-drop-up"
          color="white"
          size={35}
          style={style.arrow}
        />
      </Card>
    </View>
  );
};

CardCommentComponent.propTypes = {
  comment: PropTypes.object
};

export default CardCommentComponent;
