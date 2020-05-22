import firestore from '@react-native-firebase/firestore';

export const searchUsers = (search, callback) => {
  const unsubscribe = firestore()
    .collection('users')
    .where('name', '>=', search)
    .where('name', '<=', search + '\uf8ff')
    .onSnapshot(querySnapshot => {
      callback(
        querySnapshot.docs.map(documentSnapshot => ({
          ...documentSnapshot.data(),
          id: documentSnapshot.id,
          key: documentSnapshot.id
        }))
      );
    });

  return unsubscribe;
};
