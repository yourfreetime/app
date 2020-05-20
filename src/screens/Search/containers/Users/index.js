import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import CardUser from '../../../../containers/CardUser';
import Root from '../../../../components/Root';
import Loader from '../../../../components/Loader';

import { LIST_USERS } from 'yourfreetime/queries';

const UsersContainer = ({ search }) => {
  const { loading, data } = useQuery(LIST_USERS, {
    variables: { search },
  });

  if (loading) {
    return <Loader show />;
  }

  return (
    <Root>
      <FlatList
        style={{ margin: -3 }}
        data={data.listUsers}
        renderItem={({ item }) => <CardUser user={item} />}
      />
    </Root>
  );
};

export default UsersContainer;
