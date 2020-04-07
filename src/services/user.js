import firestore from "@react-native-firebase/firestore";
import firebase from "@react-native-firebase/app";

export const allUsers = callback => {
  const unsubscribe = firestore()
    .collection("users")
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

export const getUser = async userId =>
  await firestore()
    .collection("users")
    .doc(userId)
    .get();

export const setUser = async (userId, userObject) => {
  await firestore()
    .collection("users")
    .doc(userId)
    .update(userObject);
};

export const savePost = async (userId, postId) => {
  const newPostObject = {
    post: firestore()
      .collection("posts")
      .doc(postId),
    date: firestore.Timestamp.fromDate(new Date())
  };

  await firestore()
    .collection("users")
    .doc(userId)
    .update({
      saves: firebase.firestore.FieldValue.arrayUnion(newPostObject)
    });
};
