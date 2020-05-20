import firestore from '@react-native-firebase/firestore';

export const allSaveByUser = async (userId) => {
  const user = await firestore().collection('users').doc(userId).get();

  let posts = [];
  let saves = user.data().saves;

  if (saves) {
    for (let i = 0; i < saves.length; i++) {
      const post = await saves[i].post.get();

      posts.push({
        ...post.data(),
        id: post.id,
        key: post.id,
      });
    }

    return posts;
  }

  return [];
};
