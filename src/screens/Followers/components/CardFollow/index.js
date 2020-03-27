import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Text, TouchableNativeFeedback } from "react-native";
import { useNavigation, StackActions } from "@react-navigation/core";

import style from "./CardFollow.style";

import Avatar from "../../../../components/Avatar";
import Card from "../../../../components/Card";

const CardFollowComponent = ({ userId }) => {
  const navigation = useNavigation();

  const [user, setUser] = useState({
    name: "",
    picture: null
  });

  useEffect(() => {
    userId.get().then(snap => setUser({ ...snap.data(), id: snap.id }));
  }, []);

  return (
    <TouchableNativeFeedback
      onPress={() => {
        navigation.dispatch(StackActions.push("User", { userId: user.id }));
      }}
    >
      <Card style={style.card}>
        <Avatar picture={user.picture} />
        <Text style={style.userName}>{user.name}</Text>
      </Card>
    </TouchableNativeFeedback>
  );
};

CardFollowComponent.propTypes = {
  comment: PropTypes.object
};

export default CardFollowComponent;
