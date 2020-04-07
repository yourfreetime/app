import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";

import CardUser from "../../../../containers/CardUser";
import Root from "../../../../components/Root";
import Loader from "../../../../components/Loader";

import { searchUsers } from "../../../../services/user";

const UsersContainer = ({ search }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = searchUsers(search, users => {
      setUsers(users);
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
        data={users}
        renderItem={({ item }) => <CardUser user={item} />}
      />
    </Root>
  );
};

export default UsersContainer;
