import firestore from '@react-native-firebase/firestore';

export const searchPosts = (search, callback) => {
  const unsubscribe = firestore()
    .collection('posts')
    .where('text', '>=', search)
    .where('text', '<=', search + '\uf8ff')
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

export const allSaveByUser = async userId => {
  const user = await firestore()
    .collection('users')
    .doc(userId)
    .get();

  let posts = [];
  let saves = user.data().saves;

  if (saves) {
    for (let i = 0; i < saves.length; i++) {
      const post = await saves[i].post.get();

      posts.push({
        ...post.data(),
        id: post.id,
        key: post.id
      });
    }

    return posts;
  }

  return [];
};

export const deletePost = async postId => {
  await firestore()
    .collection('posts')
    .doc(postId)
    .delete();
};
