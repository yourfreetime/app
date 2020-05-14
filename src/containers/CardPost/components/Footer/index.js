import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, StackActions } from '@react-navigation/core';
import { t } from '../../../../i18n';

import ButtonFooter from '../ButtonFooter';

import style from './Footer.style';

import { likePost, unlikePost } from '../../../../services/post';
import { useStorage } from '../../../../provider/StorageProvider';

const FooterComponent = ({ post }) => {
  const { currentUser } = useStorage();
  const navigation = useNavigation();

  const isLike = post.likes.some(item => item.user.id === currentUser.id);
  const objectDispatch = navigation.dangerouslyGetParent() || navigation;
  const countLikes = post.likes ? post.likes.length : 0;
  const countComments = post.comments ? post.comments.length : 0;

  return (
    <View style={style.buttons}>
      <ButtonFooter
        onPress={async () => {
          if (!isLike) {
            await likePost(post.id, {
              user: firestore()
                .collection('users')
                .doc(firebase.auth().currentUser.uid)
            });
          } else {
            await unlikePost(post.id, isLike);
          }
        }}
        icon="enhance"
        text={`${countLikes} ${t('ENHANCE')}`}
        active={isLike}
      />
      <ButtonFooter
        onPress={() =>
          objectDispatch.dispatch(StackActions.push('FormComment', { post }))
        }
        icon="reply"
        text={`${countComments} ${t('ANSWER')}`}
      />
    </View>
  );
};

FooterComponent.propTypes = {
  post: PropTypes.object.isRequired
};

export default FooterComponent;
