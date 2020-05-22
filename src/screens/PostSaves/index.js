import React from 'react';
import { FlatList } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { LIST_SAVED_POSTS } from 'yourfreetime/queries';

import Root from '../../components/Root';
import Loader from '../../components/Loader';
import CardPost from '../../containers/CardPost';

const PostSavesScreen = ({ route }) => {
  const { loading, data, refetch } = useQuery(LIST_SAVED_POSTS, {
    variables: { userId: route.params.userId }
  });

  if (loading) {
    return <Loader show />;
  }

  return (
    <Root>
      <FlatList
        onRefresh={() => refetch()}
        refreshing={loading}
        style={{ margin: -3 }}
        data={data.listSavedPosts}
        renderItem={({ item }) => <CardPost post={item.post} />}
      />
    </Root>
  );
};

export default PostSavesScreen;
