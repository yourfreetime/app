import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import CardPost from '../../../../containers/CardPost';
import Root from '../../../../components/Root';
import Loader from '../../../../components/Loader';

import { LIST_POSTS } from 'yourfreetime/queries';

const PostsContainer = ({ search }) => {
  const { loading, data } = useQuery(LIST_POSTS, {
    variables: { search },
  });

  if (loading) {
    return <Loader show />;
  }

  return (
    <Root>
      <FlatList
        style={{ margin: -3 }}
        data={data.listPostsFeed}
        renderItem={({ item }) => <CardPost post={item} />}
      />
    </Root>
  );
};

export default PostsContainer;
