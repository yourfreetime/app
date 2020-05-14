import React from 'react';
import { View } from 'react-native';

import style from './UserAvatar.style';
import Avatar from '../../components/Avatar';
import { useStorage } from '../../provider/StorageProvider';

const UserAvatarContainer = () => {
  const { currentUser } = useStorage();
  return (
    <View style={style.root}>
      <Avatar picture={currentUser.picture} />
    </View>
  );
};

export default UserAvatarContainer;
