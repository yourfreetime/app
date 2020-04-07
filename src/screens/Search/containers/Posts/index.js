import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";

import CardPost from "../../../../containers/CardPost";
import Root from "../../../../components/Root";
import Loader from "../../../../components/Loader";

import { searchPosts } from "../../../../services/post";

const PostsContainer = ({ search }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = searchPosts(search, posts => {
      setPosts(posts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [search]);

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
