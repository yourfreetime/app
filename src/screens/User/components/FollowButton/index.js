import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { t } from '../../../../i18n';
import { CREATE_FOLLOW, DELETE_FOLLOW } from 'yourfreetime/mutations';
import { uCreateFollow, uDeleteFollow } from 'yourfreetime/cache';

import Button from '../../../../components/Button';

const FollowButtonComponent = ({ isFollow, userId }) => {
  const [createFollow] = useMutation(CREATE_FOLLOW, {
    update: uCreateFollow.bind(this, { userId })
  });
  const [deleteFollow] = useMutation(DELETE_FOLLOW, {
    update: uDeleteFollow.bind(this, { userId })
  });

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
