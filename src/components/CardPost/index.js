import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import moment from "moment";

import style from "./CardPost.style";

import Card from "../Card";
import Divider from "../Divider";

const IMAGE_DEFAULT =
  "https://i6b8b4u5.stackpathcdn.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png";

const CardPostComponent = ({ post }) => {
  const [author, setAuthor] = useState({
    name: "",
    picture: IMAGE_DEFAULT
  });

  useEffect(() => {
    post.author.get().then(snap => setAuthor(snap.data()));
  }, []);

  return (
    <Card style={{ margin: 5, marginBottom: 16 }}>
      <View style={style.rootTitle}>
        <Image style={style.userImage} source={{ uri: author.picture }} />
        <View style={style.contentTitle}>
          <Text style={style.userName}>{author.name}</Text>
          <Text style={style.date}>
            {moment(post.date.toDate()).format("DD/MM/YYYY - hh:mm")}
          </Text>
        </View>
      </View>
      <Divider />
      <Text>{post.text}</Text>
    </Card>
  );
};

export default CardPostComponent;
