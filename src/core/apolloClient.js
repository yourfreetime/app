import AsyncStorage from '@react-native-community/async-storage';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

import { URL } from './constants';

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('@yourfreetime:token');
  return {
    headers: {
      ...headers,
      Authorization: token
    }
  };
});

const httpLink = createHttpLink({ uri: `${URL}/graphql` });

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default apolloClient;
