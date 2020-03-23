import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import moment from "moment";
import EntypoIcons from "react-native-vector-icons/Entypo";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";

import style from "./CardPost.style";

import Card from "../Card";
import Divider from "../Divider";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

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
      <Divider />
      <View style={style.buttons}>
        <TouchableNativeFeedback>
          <View style={style.button}>
            <EntypoIcons name="aircraft" size={20} />
            <Text>Realçar</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <View style={style.button}>
            <FontAwesomeIcons name="comment" size={20} />
            <Text>Responder</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </Card>
  );
};

export default CardPostComponent;
