import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { firebase } from "@react-native-firebase/auth";

import { getUser } from "../../services/user";

import style from "./UserAvatar.style";
import Avatar from "../../components/Avatar";

const UserAvatar = () => {
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    let userId = firebase.auth().currentUser.uid;

    const getData = async () => {
      const result = await getUser(userId);
      setPicture(result.data().picture);
    };

    getData();
  }, []);

  return (
    <View style={style.root}>
      <Avatar picture={picture} />
    </View>
  );
};

export default UserAvatar;
