import React from 'react';
import { StatusBar } from 'react-native';
import { StorageProvider } from './src/provider/StorageProvider';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/react-hooks';

import colors from './src/core/colors';
import Routes from './src/core/Routes';
import Location from './src/core/Location';
import apolloClient from './src/core/apolloClient';

const App = () => (
  <ApolloProvider client={apolloClient}>
    <StorageProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={colors.dark} barStyle="light-content" />
        <Location />
        <Routes />
      </NavigationContainer>
    </StorageProvider>
  </ApolloProvider>
);

export default App;
