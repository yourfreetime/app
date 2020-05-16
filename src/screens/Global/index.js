import React, { useEffect } from 'react';
import { FlatList, Text, ToastAndroid } from 'react-native';
import { useLazyQuery } from '@apollo/react-hooks';
import { t } from '../../i18n';

import Geolocation from '@react-native-community/geolocation';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import style from './Global.style';

import Root from '../../components/Root';
import Loader from '../../components/Loader';
import Card from '../../components/Card';
import CardPost from '../../containers/CardPost';

import { LIST_POSTS_BY_LOCATION } from 'yourfreetime/queries';

const GlobalScreen = () => {
  const [listPosts, { called, loading, data }] = useLazyQuery(
    LIST_POSTS_BY_LOCATION
  );

  const successPosition = (info) => {
    const { latitude, longitude } = info.coords;
    listPosts({ variables: { filter: { latitude, longitude } } });
  };
  const errorPosition = (err) =>
    ToastAndroid.showWithGravity(
      err.message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    );

  useEffect(() => {
    Geolocation.getCurrentPosition(successPosition, errorPosition);
  }, []);

  if (!called || loading) {
    return <Loader show />;
  }

  return (
    <Root>
      <Card style={style.title}>
        <MaterialIcons name="access-point" size={25} style={style.icon} />
        <Text>{t('PHRASE_RADAR')}</Text>
      </Card>
      <FlatList
        style={{ margin: -3 }}
        data={data?.listPostsByLocation}
        columnWrapperStyle
        numColumns={2}
        renderItem={({ item }) => (
          <CardPost post={item} style={style.cardPost} simple />
        )}
      />
    </Root>
  );
};

export default GlobalScreen;
