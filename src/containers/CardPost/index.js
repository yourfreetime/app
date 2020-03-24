import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigation, StackActions } from "@react-navigation/core";
import { TouchableOpacity, Image, Text, View } from "react-native";
import moment from "moment";

import style from "./CardPost.style";

import Card from "../../components/Card";
import Divider from "../../components/Divider";
import MoreOptionsCard from "./components/MoreOptionsCard";
import Footer from "./components/Footer";

const IMAGE_DEFAULT =
  "https://i6b8b4u5.stackpathcdn.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png";

const CardPostComponent = ({ post, style: newStyle, isOpenDetail }) => {
  const navigation = useNavigation();
  const [author, setAuthor] = useState({
    name: "",
    picture: IMAGE_DEFAULT
  });

  useEffect(() => {
    post.author.get().then(snap => setAuthor({ ...snap.data(), id: snap.id }));
  }, []);

  const objectDispatch = navigation.dangerouslyGetParent() || navigation;

  const openPost = () =>
    objectDispatch.dispatch(StackActions.push("Post", { postId: post.id }));

  return (
    <Card
      onPress={isOpenDetail ? openPost : null}
      style={[{ margin: 3, marginBottom: 16 }, newStyle]}
    >
      <TouchableOpacity
        style={style.rootTitle}
        onPress={() => {
          objectDispatch.dispatch(
            StackActions.push("User", { userId: author.id })
          );
        }}
      >
        <Image style={style.userImage} source={{ uri: author.picture }} />
        <View style={style.contentTitle}>
          <Text style={style.userName}>{author.name}</Text>
          <Text style={style.date}>
            {moment(post.date.toDate()).format("DD/MM/YYYY - hh:mm")}
          </Text>
        </View>
      </TouchableOpacity>
      <Divider />
      <Text style={style.text}>{post.text}</Text>
      <Divider />
      <Footer post={post} author={author} />
      <MoreOptionsCard post={post} />
    </Card>
  );
};

CardPostComponent.propTypes = {
  post: PropTypes.object,
  isOpenDetail: PropTypes.bool
};

CardPostComponent.defaultProps = {
  isOpenDetail: true
};

export default CardPostComponent;
