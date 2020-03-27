import firestore from "@react-native-firebase/firestore";
import { firebase } from "@react-native-firebase/auth";

export const createFollow = async (userId, userFollowId) => {
  await firestore()
    .collection("follows")
    .add({
      user: firestore()
        .collection("users")
        .doc(userId),
      userFollow: firestore()
        .collection("users")
        .doc(userFollowId),
      date: firestore.Timestamp.fromDate(new Date())
    });
};

export const removeFollow = async (userId, userFollowId) => {
  const result = await firestore()
    .collection("follows")
    .where(
      "user",
      "==",
      firestore()
        .collection("users")
        .doc(userId)
    )
    .where(
      "userFollow",
      "==",
      firestore()
        .collection("users")
        .doc(userFollowId)
    )
    .get();

  await result.docs[0].ref.delete();
};

export const listFollow = (userId, callback) => {
  const unsubscribe = firestore()
    .collection("follows")
    .where(
      "userFollow",
      "==",
      firestore()
        .collection("users")
        .doc(userId)
    )
    .onSnapshot(querySnapshot => {
      const followers = querySnapshot.docs;

      const isFollow = followers.some(
        item => item.data().user.id === firebase.auth().currentUser.uid
      );

      callback(querySnapshot.docs, isFollow);
    });

  return unsubscribe;
};
