import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";

import Root from "../../components/Root";
import Loader from "../../components/Loader";
import CardPost from "../../containers/CardPost";

import { allSaveByUser } from "../../services/post";

const PostSavesScreen = ({ route }) => {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const newPosts = await allSaveByUser(route.params.userId);
      setPosts(newPosts);
      setLoading(false);
    };

    getData();
  });

  if (loading) {
    return <Loader show />;
  }

  return (
    <Root>
      <FlatList
        style={{ margin: -3 }}
        data={posts}
        renderItem={({ item }) => <CardPost post={item} simple />}
      />
    </Root>
  );
};

export default PostSavesScreen;
