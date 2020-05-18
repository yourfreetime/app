import React, { useState } from 'react';
import { Image, Text, View, TextInput } from 'react-native';
import { StackActions } from '@react-navigation/core';
import { useMutation } from '@apollo/react-hooks';
import { uCreateComment } from 'yourfreetime/cache';
import { CREATE_COMMENT } from 'yourfreetime/mutations';
import { t } from '../../i18n';

import style from './FormComment.style';

import Button from '../../components/Button';
import Root from '../../components/Root';
import Card from '../../components/Card';

import { useStorage } from '../../provider/StorageProvider';

const FormCommentScreen = ({ navigation, route }) => {
  const { currentUser } = useStorage();
  const [text, setText] = useState('');
  const [createComment] = useMutation(CREATE_COMMENT, {
    onCompleted: () => navigation.dispatch(StackActions.pop()),
    update: uCreateComment.bind(this, { postId: route.params.post.id })
  });

  const post = route.params.post;

  return (
    <Root style={{ paddingTop: 3 }}>
      <Card style={style.post}>
        <Image style={style.userImage} source={{ uri: post.author.picture }} />
        <Text style={style.textPost}>{post.text}</Text>
      </Card>
      <Text style={style.titleAnswer}>{t('YOUR_ANSWER')}</Text>
      <View style={style.form}>
        <Image style={style.userImage} source={{ uri: currentUser.picture }} />
        <TextInput
          style={style.input}
          textAlignVertical="top"
          placeholder={t('PLACEHOLDER_COMMENT')}
          multiline
          numberOfLines={4}
          onChangeText={newText => setText(newText)}
          value={text}
          autoFocus
        />
      </View>
      <Button
        variant="primary"
        title={t('ANSWER')}
        onPress={() => createComment({ variables: { text, postId: post.id } })}
      />
    </Root>
  );
};

export default FormCommentScreen;
