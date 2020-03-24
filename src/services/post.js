import firestore from "@react-native-firebase/firestore";
import firebase from "@react-native-firebase/app";

export const likePost = async (postId, likeObject) => {
  await firestore()
    .collection("posts")
    .doc(postId)
    .set({ likes: [likeObject] }, { merge: true });
};

export const unlikePost = async (postId, likeObject) => {
  await firestore()
    .collection("posts")
    .doc(postId)
    .update({
      likes: firebase.firestore.FieldValue.arrayRemove(likeObject)
    });
};
