import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import StorageContext from './Context';

const StorageProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const userData = await AsyncStorage.getItem('@yourfreetime:user');
      setUser(JSON.parse(userData));
    };
    getData();
  }, []);

  const propsProvider = {
    currentUser: user,
    setCurrentUser: user => {
      setUser(false);
      AsyncStorage.setItem('@yourfreetime:user', JSON.stringify(user));
      setUser(user);
    }
  };

  return (
    <StorageContext.Provider value={propsProvider}>
      {user === false ? <View /> : children}
    </StorageContext.Provider>
  );
};

export default StorageProvider;
