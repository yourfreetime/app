import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";

import Root from "../../components/Root";
import Loader from "../../components/Loader";
import CardUser from "../../containers/CardUser";

import { listFollow } from "../../services/follow";

const FollowersScreen = ({ route }) => {
  const [followers, setFollowers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listFollow(route.params.userId, followers => {
      setFollowers(followers);
      setLoading(false);
    });

    return () => unsubscribe();
  });

  if (loading) {
    return <Loader show />;
  }

  return (
    <Root>
      <FlatList
        style={{ margin: -3 }}
        data={followers}
        renderItem={({ item }) => <CardUser userRef={item.data().user} />}
      />
    </Root>
  );
};

export default FollowersScreen;
