import firestore from "@react-native-firebase/firestore";

export const getUser = async userId =>
  await firestore()
    .collection("users")
    .doc(userId)
    .get();
