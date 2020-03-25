import firestore from "@react-native-firebase/firestore";
import firebase from "@react-native-firebase/app";

export const getPost = (postId, callback) => {
  const unsubscribe = firestore()
    .collection("posts")
    .doc(postId)
    .onSnapshot(docSnapshot => {
      callback({
        ...docSnapshot.data(),
        id: docSnapshot.id,
        key: docSnapshot.id
      });
    });

  return unsubscribe;
};

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

export const deletePost = async postId => {
  await firestore()
    .collection("posts")
    .doc(postId)
    .delete();
};

export const updatePost = async (postId, text) => {
  await firestore()
    .collection("posts")
    .doc(postId)
    .update({ text });
};

export const likePost = async (postId, likeObject) => {
  const newLikeObject = {
    ...likeObject,
    date: firestore.Timestamp.fromDate(new Date())
  };

  await firestore()
    .collection("posts")
    .doc(postId)
    .update({
      likes: firebase.firestore.FieldValue.arrayUnion(newLikeObject)
    });
};

export const unlikePost = async (postId, likeObject) => {
  await firestore()
    .collection("posts")
    .doc(postId)
    .update({
      likes: firebase.firestore.FieldValue.arrayRemove(likeObject)
    });
};

export const createComment = async (postId, commentObject) => {
  const newCommentObject = {
    ...commentObject,
    date: firestore.Timestamp.fromDate(new Date())
  };

  await firestore()
    .collection("posts")
    .doc(postId)
    .update({
      comments: firebase.firestore.FieldValue.arrayUnion(newCommentObject)
    });
};
