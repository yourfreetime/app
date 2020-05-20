import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

export const savePost = async (userId, postId) => {
  const newPostObject = {
    post: firestore().collection('posts').doc(postId),
    date: firestore.Timestamp.fromDate(new Date()),
  };

  await firestore()
    .collection('users')
    .doc(userId)
    .update({
      saves: firebase.firestore.FieldValue.arrayUnion(newPostObject),
    });
};
