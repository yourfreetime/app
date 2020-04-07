import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Text, TouchableNativeFeedback } from "react-native";
import { useNavigation, StackActions } from "@react-navigation/core";

import style from "./CardUser.style";

import Avatar from "../../components/Avatar";
import Card from "../../components/Card";

const CardUserComponent = ({ userId, user: userExist }) => {
  const navigation = useNavigation();

  const [user, setUser] = useState({
    name: "",
    picture: null
  });

  useEffect(() => {
    if (userExist) {
      setUser(userExist);
    } else {
      userId.get().then(snap => setUser({ ...snap.data(), id: snap.id }));
    }
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

CardUserComponent.propTypes = {
  userId: PropTypes.string,
  user: PropTypes.object
};

export default CardUserComponent;
