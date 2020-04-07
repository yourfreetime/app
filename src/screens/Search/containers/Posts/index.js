import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";

import CardPost from "../../../../containers/CardPost";
import Root from "../../../../components/Root";
import Loader from "../../../../components/Loader";

import { allPosts } from "../../../../services/post";

const PostsContainer = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = allPosts(posts => {
      setPosts(posts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loader show />;
  }

  return (
    <Root>
      <FlatList
        style={{ margin: -3 }}
        data={posts}
        renderItem={({ item }) => <CardPost post={item} />}
      />
    </Root>
  );
};

export default PostsContainer;
