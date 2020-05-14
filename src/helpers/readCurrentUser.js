import AsyncStorage from '@react-native-community/async-storage';

const readCurrentUser = async () => {
  const userData = await AsyncStorage.getItem('@yourfreetime:user');
  return JSON.parse(userData);
};

export default readCurrentUser;
