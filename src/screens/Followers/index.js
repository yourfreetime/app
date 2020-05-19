import React from 'react';
import { FlatList } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { LIST_FOLLOWERS } from 'yourfreetime/queries';

import Root from '../../components/Root';
import Loader from '../../components/Loader';
import CardUser from '../../containers/CardUser';

const FollowersScreen = ({ route }) => {
  const { loading, error, data } = useQuery(LIST_FOLLOWERS, {
    variables: { userId: route.params.userId }
  });

  if (loading) {
    return <Loader show />;
  }

  return (
    <Root>
      <FlatList
        style={{ margin: -3 }}
        data={data.listFollowers}
        keyExtractor={item => item.user.id}
        renderItem={({ item }) => <CardUser user={item.user} />}
      />
    </Root>
  );
};

export default FollowersScreen;
