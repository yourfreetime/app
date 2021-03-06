import React from 'react';
import { FlatList, Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { GET_POST } from 'yourfreetime/queries';
import { t } from '../../i18n';

import CardPost from '../../containers/CardPost';
import Root from '../../components/Root';
import Loader from '../../components/Loader';
import CardComment from '../../containers/CardComment';

import style from './Post.style';

const PostScreen = ({ route }) => {
  const { loading, data } = useQuery(GET_POST, {
    variables: { postId: route.params.postId }
  });

  if (loading) {
    return <Loader show />;
  }

  const post = data.getPost;

  return (
    <Root style={{ paddingTop: 3 }}>
      <CardPost post={post} style={{ margin: 0 }} isOpenDetail={false} />
      <Text style={style.title}>{t('ANSWERS')}</Text>
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
