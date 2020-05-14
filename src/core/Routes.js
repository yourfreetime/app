import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { StorageProvider } from '../provider/StorageProvider';
import colors from '../core/colors';
import { t } from '../i18n';

import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import FormPostScreen from '../screens/FormPost';
import UserScreen from '../screens/User';
import PostScreen from '../screens/Post';
import SettingsScreen from '../screens/Settings';
import FormCommentScreen from '../screens/FormComment';
import PostSavesScreen from '../screens/PostSaves';
import SearchScreen from '../screens/Search';
import FollowersScreen from '../screens/Followers';
import RegisterScreen from '../screens/Register';

import Header from '../containers/Header';
import UserAvatar from '../containers/UserAvatar';

const Stack = createStackNavigator();

const RoutesCore = () => {
  const [screen, setScreen] = useState();

  useEffect(() => {
    const getData = async () => {
      const result = await AsyncStorage.getItem('@yourfreetime:token');
      setScreen(result ? 'Home' : 'Login');
    };
    getData();
  }, []);

  if (!screen) {
    return <View />;
  }

  return (
    <StorageProvider>
      <Stack.Navigator initialRouteName={screen}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerTitle: props => <Header {...props} />,
            headerStyle: {
              backgroundColor: colors.white,
              borderBottomWidth: 1,
              borderBottomColor: colors.primary
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <UserAvatar />
              </TouchableOpacity>
            )
          })}
        />
        <Stack.Screen
          name="FormPost"
          component={FormPostScreen}
          options={{
            headerTitle: '',
            headerStyle: { backgroundColor: colors.background, elevation: 0 }
          }}
        />
        <Stack.Screen
          name="User"
          component={UserScreen}
          options={{
            headerTitle: '',
            headerStyle: { backgroundColor: colors.background, elevation: 0 }
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerTitle: '',
            headerStyle: { backgroundColor: colors.background, elevation: 0 }
          }}
        />
        <Stack.Screen
          name="Post"
          component={PostScreen}
          options={{
            headerTitle: '',
            headerStyle: { backgroundColor: colors.background, elevation: 0 }
          }}
        />
        <Stack.Screen
          name="FormComment"
          component={FormCommentScreen}
          options={{
            headerTitle: '',
            headerStyle: { backgroundColor: colors.background, elevation: 0 }
          }}
        />
        <Stack.Screen
          name="PostSaves"
          component={PostSavesScreen}
          options={{ headerTitle: t('SAVED') }}
        />
        <Stack.Screen
          name="Followers"
          component={FollowersScreen}
          options={{ headerTitle: t('FOLLOWERS') }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerStyle: { elevation: 0 }
          }}
        />
      </Stack.Navigator>
    </StorageProvider>
  );
};

export default RoutesCore;
