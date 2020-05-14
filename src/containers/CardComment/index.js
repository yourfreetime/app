import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import style from './CardComment.style';

import Avatar from '../../components/Avatar';
import Card from '../../components/Card';

const CardCommentComponent = ({ comment }) => (
  <View style={style.root}>
    <Avatar picture={comment.user.picture} />
    <Card style={style.card}>
      <Text style={style.userName}>{comment.user.name}</Text>
      <Text style={style.text}>{comment.text}</Text>
      <MaterialIcons
        name="arrow-drop-up"
        color="white"
        size={35}
        style={style.arrow}
      />
    </Card>
  </View>
);

CardCommentComponent.propTypes = {
  comment: PropTypes.object
};

export default CardCommentComponent;
