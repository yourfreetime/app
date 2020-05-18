import React from 'react';
import { Text, Button } from 'react-native';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { t } from '../../i18n';

import Root from '../../components/Root';

const SettingsScreen = ({ navigation }) => (
  <Root>
    <Text>Settings Screen</Text>
    <Button
      variant="primary"
      title={t('EXIT')}
      onPress={async () => {
        await AsyncStorage.removeItem('@yourfreetime:token');
        await AsyncStorage.removeItem('@yourfreetime:user');
        navigation.dispatch(StackActions.replace('Login'));
      }}
    />
  </Root>
);

export default SettingsScreen;
