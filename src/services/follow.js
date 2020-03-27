import firestore from "@react-native-firebase/firestore";
// import firebase from "@react-native-firebase/app";

export const createFollow = async (userId, userFollowId) => {
  await firestore()
    .collection("follow")
    .add({
      userId,
      userFollowId,
      date: firestore.Timestamp.fromDate(new Date())
    });
};
