import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { t } from '../../../../i18n';

import Button from '../../../../components/Button';

import { CREATE_FOLLOW, DELETE_FOLLOW } from '../../../../services/follow';
import { GET_USER } from '../../../../services/user';

const FollowButtonComponent = ({ isFollow, userId }) => {
  const update = (cache, { data }) => {
    const dataUser = cache.readQuery({
      query: GET_USER,
      variables: { userId }
    });
    const follows = data.createFollow || data.deleteFollow;
    cache.writeQuery({
      query: GET_USER,
      variables: { userId },
      data: { ...dataUser, listFollowers: follows }
    });
  };
  const [createFollow] = useMutation(CREATE_FOLLOW, { update });
  const [deleteFollow] = useMutation(DELETE_FOLLOW, { update });

  return (
    <Button
      onPress={() => {
        if (!isFollow) {
          createFollow({ variables: { userFollowId: userId } });
        } else {
          deleteFollow({ variables: { userFollowId: userId } });
        }
      }}
      size="small"
      variant="white"
      title={isFollow ? t('FOLLOWING') : t('FOLLOW')}
    />
  );
};

export default FollowButtonComponent;
