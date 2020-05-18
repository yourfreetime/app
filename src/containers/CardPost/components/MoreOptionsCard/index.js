import React from 'react';
import PropTypes from 'prop-types';
import { Alert, ToastAndroid } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/core';
import { useMutation } from '@apollo/react-hooks';
import { uDeletePost } from 'yourfreetime/cache';
import { DELETE_POST } from 'yourfreetime/mutations';
import { t } from '../../../../i18n';

import MoreOptions from '../../../../components/MoreOptions';

import { savePost } from '../../../../services/user';
import { useStorage } from '../../../../provider/StorageProvider';

const MoreOptionsCardComponent = ({ post }) => {
  const { currentUser } = useStorage();
  const [deletePost] = useMutation(DELETE_POST, {
    onCompleted: () =>
      ToastAndroid.showWithGravity(
        t('SUCCESS_DELETE_POST'),
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      ),
    onError: () =>
      ToastAndroid.showWithGravity(
        t('ERROR_DELETE_POST'),
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      ),
    update: uDeletePost.bind(this, { postId: post.id })
  });
  const navigation = useNavigation();

  const objectDispatch = navigation.dangerouslyGetParent() || navigation;

  const onEdit = () => {
    objectDispatch.dispatch(StackActions.push('FormPost', { post }));
  };

  const onDelete = () => {
    Alert.alert(
      '',
      'Tem certeza que deseja deletar essa sugestão?',
      [
        { text: t('CANCEL'), style: 'cancel' },
        {
          text: t('CONFIRM'),
          onPress: () => deletePost({ variables: { postId: post.id } })
        }
      ],
      { cancelable: false }
    );
  };

  const onSave = async () => {
    try {
      await savePost(currentUser.id, post.id);
      ToastAndroid.showWithGravity(
        t('SUCCESS_SAVE_POST'),
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    } catch {
      ToastAndroid.showWithGravity(
        t('ERROR_SAVE_POST'),
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    }
  };

  let options = [t('SAVE'), t('DENOUNCE')];
  let actions = [onSave, () => {}];

  if (post.author.id === currentUser.id) {
    options = [t('EDIT'), t('DELETE'), ...options];
    actions = [onEdit, onDelete, ...actions];
  }

  return (
    <MoreOptions
      style={{ position: 'absolute', right: 5, top: 10 }}
      options={options}
      actions={actions}
    />
  );
};

MoreOptionsCardComponent.propTypes = {
  post: PropTypes.object.isRequired
};

export default MoreOptionsCardComponent;
