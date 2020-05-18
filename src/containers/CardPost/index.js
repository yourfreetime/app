import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation, StackActions } from '@react-navigation/core';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import moment from 'moment';

import style from './CardPost.style';

import Card from '../../components/Card';
import Divider from '../../components/Divider';
import MoreOptionsCard from './components/MoreOptionsCard';
import Footer from './components/Footer';

const CardPostComponent = ({ post, style: newStyle, isOpenDetail, simple }) => {
  const navigation = useNavigation();
  const objectDispatch = navigation.dangerouslyGetParent() || navigation;
  const openPost = () =>
    objectDispatch.dispatch(StackActions.push('Post', { postId: post.id }));

  return (
    <Card
      onPress={isOpenDetail ? openPost : null}
      style={[{ margin: 3, marginBottom: 16 }, newStyle]}
    >
      <TouchableOpacity
        style={style.rootTitle}
        onPress={() =>
          objectDispatch.dispatch(
            StackActions.push('User', { userId: post.author.id })
          )
        }
      >
        <Image style={style.userImage} source={{ uri: post.author.picture }} />
        <View style={style.contentTitle}>
          <Text style={style.userName}>{post.author.name}</Text>
          <Text style={style.date}>
            {moment(post.dateCreated).format('DD/MM/YYYY - hh:mm')}
          </Text>
        </View>
      </TouchableOpacity>
      <Divider />
      <Text style={style.text}>{post.text}</Text>
      {!simple && (
        <>
          <Divider />
          <Footer post={post} />
          <MoreOptionsCard post={post} />
        </>
      )}
    </Card>
  );
};

CardPostComponent.propTypes = {
  post: PropTypes.object,
  isOpenDetail: PropTypes.bool,
  simple: PropTypes.bool
};

CardPostComponent.defaultProps = {
  isOpenDetail: true,
  simple: false
};

export default CardPostComponent;
