import React, { useState, useEffect } from "react";
import { FlatList, Text } from "react-native";

import CardPost from "../../containers/CardPost";
import Root from "../../components/Root";
import Loader from "../../components/Loader";
import CardComment from "../../containers/CardComment";

import { getPost } from "../../services/post";

const PostScreen = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);

  useEffect(() => {
    const unsubscribe = getPost(route.params.postId, post => {
      setPost(post);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loader show />;
  }

  return (
    <Root style={{ paddingTop: 3 }}>
      <CardPost post={post} style={{ margin: 0 }} isOpenDetail={false} />
      <Text style={{ marginBottom: 16 }}>Respostas:</Text>
      <FlatList
        style={{ margin: -3 }}
        data={post.comments}
        renderItem={({ item }) => <CardComment comment={item} />}
        keyExtractor={item => item.text + item.date + item.author}
      />
    </Root>
  );
};

export default PostScreen;
