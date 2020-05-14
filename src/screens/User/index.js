import React from 'react';
import { StackActions } from '@react-navigation/native';
import { Image, FlatList, View } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { t } from '../../i18n';

import style from './User.style';

import CardPost from '../../containers/CardPost';
import Loader from '../../components/Loader';
import Root from '../../components/Root';
import Count from './components/Count';
import FollowButton from './components/FollowButton';

import { useStorage } from '../../provider/StorageProvider';
import { GET_USER } from '../../services/user';

const getUserId = (route, currentUser) => {
  let userId = currentUser.id;
  if (route && route.params && route.params.userId) {
    userId = route.params.userId;
  }
  return userId;
};

const UserScreen = ({ navigation, route }) => {
  const { currentUser } = useStorage();
  const userId = getUserId(route, currentUser);
  const { loading, data } = useQuery(GET_USER, { variables: { userId } });

  if (loading) {
    return <Loader show />;
  }

  const isFollow = data.listFollowers.some(
    follow => follow.userFollow.id === userId
  );
  const user = data.getUser;

  return (
    <Root style={route.params ? { paddingTop: 0 } : {}}>
      <View style={style.userArea}>
        <View style={{ alignItems: 'center', marginRight: 16, flex: 0.5 }}>
          <Image style={style.userImage} source={{ uri: user.picture }} />
        </View>
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <View style={style.counts}>
            <Count
              count={data.listPosts.length}
              title={t('PUBLICATIONS')}
              icon="desk-lamp"
            />
            <Count
              count={user.savedPosts.length}
              title={t('SAVED')}
              icon="bookmark"
              onPress={() =>
                navigation.dispatch(
                  StackActions.push('PostSaves', { userId: user.id })
                )
              }
            />
            <Count
              count={data.listFollowers.length}
              title={t('FOLLOWERS')}
              icon="account-heart"
              onPress={() =>
                navigation.dispatch(
                  StackActions.push('Followers', { userId: user.id })
                )
              }
            />
          </View>
          {userId !== currentUser.id && (
            <FollowButton userId={userId} isFollow={isFollow} />
          )}
        </View>
      </View>
      <FlatList
        style={{ margin: -3, marginBottom: 0 }}
        data={data.listPosts}
        renderItem={({ item }) => <CardPost post={item} />}
      />
    </Root>
  );
};

export default UserScreen;
