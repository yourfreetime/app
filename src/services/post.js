import firestore from "@react-native-firebase/firestore";
import firebase from "@react-native-firebase/app";

export const allByUser = (userId, callback) => {
  const userRef = firebase
    .firestore()
    .collection("users")
    .doc(userId);

  const unsubscribe = firestore()
    .collection("posts")
    .where("author", "==", userRef)
    // .orderBy("date", "desc")
    .onSnapshot(querySnapshot => {
      const docs = querySnapshot.docs.map(documentSnapshot => ({
        ...documentSnapshot.data(),
        id: documentSnapshot.id,
        key: documentSnapshot.id
      }));

      callback(docs);
    });

  return unsubscribe;
};

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
