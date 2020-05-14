import React from 'react';
import { Text, FlatList } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { StackActions } from '@react-navigation/native';

import { t } from '../../i18n';

import Card from '../../components/Card';
import Loader from '../../components/Loader';
import CardPost from '../../containers/CardPost';
import Root from '../../components/Root';

import { LIST_POSTS_FEED } from '../../services/post';

const FeedScreen = ({ navigation }) => {
  const { loading, data } = useQuery(LIST_POSTS_FEED);

  if (loading) {
    return <Loader />;
  }

  if (loading) {
    return <Loader show />;
  }

  return (
    <Root>
      <Card
        onPress={() => navigation.dispatch(StackActions.push('FormPost'))}
        style={{ marginBottom: 16 }}
      >
        <Text>{t('PHRASE_FEED')}</Text>
      </Card>
      <FlatList
        style={{ margin: -3 }}
        data={data.listPostsFeed}
        renderItem={({ item }) => <CardPost post={item} />}
      />
    </Root>
  );
};

export default FeedScreen;
