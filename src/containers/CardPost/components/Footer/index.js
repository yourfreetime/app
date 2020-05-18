import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/core';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_LIKE, DELETE_LIKE } from 'yourfreetime/mutations';
import { uCreateLike, uDeleteLike } from 'yourfreetime/cache';
import { t } from '../../../../i18n';

import ButtonFooter from '../ButtonFooter';

import style from './Footer.style';

import { useStorage } from '../../../../provider/StorageProvider';

const FooterComponent = ({ post }) => {
  const { currentUser } = useStorage();
  const navigation = useNavigation();
  const [createLike] = useMutation(CREATE_LIKE, {
    update: uCreateLike.bind(this, { postId: post.id })
  });
  const [deleteLike] = useMutation(DELETE_LIKE, {
    update: uDeleteLike.bind(this, { postId: post.id })
  });

  const isLiked = post.likes.some(item => item.user.id === currentUser.id);
  const objectDispatch = navigation.dangerouslyGetParent() || navigation;

  return (
    <View style={style.buttons}>
      <ButtonFooter
        onPress={() => {
          if (!isLiked) {
            createLike({ variables: { postId: post.id } });
          } else {
            deleteLike({ variables: { postId: post.id } });
          }
        }}
        icon="enhance"
        text={`${post.likes.length} ${t('ENHANCE')}`}
        active={isLiked}
      />
      <ButtonFooter
        onPress={() =>
          objectDispatch.dispatch(StackActions.push('FormComment', { post }))
        }
        icon="reply"
        text={`${post.comments.length} ${t('ANSWER')}`}
      />
    </View>
  );
};

FooterComponent.propTypes = {
  post: PropTypes.object.isRequired
};

export default FooterComponent;
