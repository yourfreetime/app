import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableNativeFeedback } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/core';

import style from './CardUser.style';

import Avatar from '../../components/Avatar';
import Card from '../../components/Card';

const CardUserComponent = ({ user }) => {
  const navigation = useNavigation();

  return (
    <TouchableNativeFeedback
      onPress={() => {
        navigation.dispatch(StackActions.push('User', { userId: user.id }));
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
  userRef: PropTypes.object,
  user: PropTypes.object
};

export default CardUserComponent;
