import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import style from './UserAvatar.style';
import Avatar from '../../components/Avatar';
import readCurrentUser from '../../helpers/readCurrentUser';

const UserAvatar = () => {
  const [picture, setPicture] = useState();

  useEffect(() => {
    const getData = async () => {
      const currentUser = await readCurrentUser();
      setPicture(currentUser.picture);
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
