import firestore from "@react-native-firebase/firestore";
import firebase from "@react-native-firebase/app";

export const createPost = async postObject => {
  await firestore()
    .collection("posts")
    .add({
      ...postObject,
      date: firestore.Timestamp.fromDate(new Date())
    });
};

export const likePost = async (postId, likeObject) => {
  const newLikeObject = {
    ...likeObject,
    date: firestore.Timestamp.fromDate(new Date())
  };

  await firestore()
    .collection("posts")
    .doc(postId)
    .set({ likes: [newLikeObject] }, { merge: true });
};

export const unlikePost = async (postId, likeObject) => {
  await firestore()
    .collection("posts")
    .doc(postId)
    .update({
      likes: firebase.firestore.FieldValue.arrayRemove(likeObject)
    });
};
