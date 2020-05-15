import React, { useState, useEffect } from 'react';
import { Image, Text, View, TextInput } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { StackActions } from '@react-navigation/core';
import { CREATE_POST, UPDATE_POST } from 'yourfreetime/mutations';
import { uCreatePost, uUpdatePost } from 'yourfreetime/cache';
import { t } from '../../i18n';

import style from './FormPost.style';

import Button from '../../components/Button';
import Root from '../../components/Root';

import { useStorage } from '../../provider/StorageProvider';

const FormPostScreen = ({ navigation, route }) => {
  const { currentUser } = useStorage();
  const [text, setText] = useState('');
  const onCompleted = () => navigation.dispatch(StackActions.pop());

  const [createPost] = useMutation(CREATE_POST, {
    onCompleted,
    update: uCreatePost.bind(this, null)
  });
  const [updatePost] = useMutation(UPDATE_POST, {
    onCompleted,
    update: uUpdatePost.bind(this, {
      postId: route.params && route.params.post.id
    })
  });

  useEffect(() => {
    if (route.params) {
      setText(route.params.post.text);
    }
  }, []);

  return (
    <Root style={{ paddingTop: 0 }}>
      <View style={style.user}>
        <Image style={style.userImage} source={{ uri: currentUser.picture }} />
        <Text style={style.userName}>{currentUser.name}</Text>
      </View>
      <TextInput
        style={style.input}
        textAlignVertical="top"
        placeholder={t('PLACEHOLDER_POST')}
        multiline
        numberOfLines={4}
        onChangeText={newText => setText(newText)}
        value={text}
        autoFocus
      />
      <Button
        variant="primary"
        title={route.params ? t('UPDATE') : t('SEND')}
        onPress={() => {
          if (!route.params) {
            createPost({ variables: { text } });
          } else {
            updatePost({ variables: { text, postId: route.params.post.id } });
          }
        }}
      />
    </Root>
  );
};

export default FormPostScreen;
