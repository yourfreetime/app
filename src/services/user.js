import firestore from "@react-native-firebase/firestore";
import firebase from "@react-native-firebase/app";
import md5 from "js-md5";

export const createUser = async userObject => {
  const idImage = md5(userObject.email.toLowerCase());

  const data = await firebase
    .auth()
    .createUserWithEmailAndPassword(userObject.email, userObject.password);

  const user = await firestore()
    .collection("users")
    .doc(data.user.uid)
    .set({
      ...userObject,
      picture: `https://www.gravatar.com/avatar/${idImage}?s=500`,
      dateCreated: firestore.Timestamp.fromDate(new Date()),
      dateUpdated: firestore.Timestamp.fromDate(new Date())
    });

  await firebase
    .auth()
    .signInWithEmailAndPassword(userObject.email, userObject.password);

  return user;
};

export const searchUsers = (search, callback) => {
  const unsubscribe = firestore()
    .collection("users")
    .where("name", ">=", search)
    .where("name", "<=", search + "\uf8ff")
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
