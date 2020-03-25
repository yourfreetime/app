import firestore from "@react-native-firebase/firestore";

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
