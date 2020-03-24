import React, { useState, useEffect } from "react";

import CardPost from "../../containers/CardPost";
import Root from "../../components/Root";
import Loader from "../../components/Loader";

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
    </Root>
  );
};

export default PostScreen;
