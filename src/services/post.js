import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import gql from 'graphql-tag';

export const LIST_POSTS_FEED = gql`
  query listPostsFeed {
    listPostsFeed {
      id
      text
      dateCreated
      author {
        id
        name
        picture
      }
      likes {
        date
        user {
          id
        }
      }
      comments {
        dateCreated
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($text: String!) {
    createPost(input: { text: $text }) {
      id
      text
      dateCreated
      author {
        id
        name
        picture
      }
      likes {
        date
        user {
          id
        }
      }
      comments {
        dateCreated
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost($text: String!, $postId: String!) {
    updatePost(input: { text: $text, postId: $postId }) {
      id
      text
      dateCreated
      author {
        id
        name
        picture
      }
      likes {
        date
        user {
          id
        }
      }
      comments {
        dateCreated
      }
    }
  }
`;

export const GET_POST = gql`
  query getPost($postId: String!) {
    getPost(postId: $postId) {
      id
      text
      dateCreated
      author {
        id
        name
        picture
      }
      likes {
        date
        user {
          id
        }
      }
      comments {
        id
        text
        user {
          id
          name
          picture
        }
        dateCreated
      }
    }
  }
`;

export const allPosts = (callback) => {
  const unsubscribe = firestore()
    .collection('posts')
    .orderBy('date', 'desc')
    .onSnapshot((querySnapshot) => {
      callback(
        querySnapshot.docs.map((documentSnapshot) => ({
          ...documentSnapshot.data(),
          id: documentSnapshot.id,
          key: documentSnapshot.id,
        }))
      );
    });

  return unsubscribe;
};

export const searchPosts = (search, callback) => {
  const unsubscribe = firestore()
    .collection('posts')
    .where('text', '>=', search)
    .where('text', '<=', search + '\uf8ff')
    .onSnapshot((querySnapshot) => {
      callback(
        querySnapshot.docs.map((documentSnapshot) => ({
          ...documentSnapshot.data(),
          id: documentSnapshot.id,
          key: documentSnapshot.id,
        }))
      );
    });

  return unsubscribe;
};

export const getPost = (postId, callback) => {
  const unsubscribe = firestore()
    .collection('posts')
    .doc(postId)
    .onSnapshot((docSnapshot) => {
      callback({
        ...docSnapshot.data(),
        id: docSnapshot.id,
        key: docSnapshot.id,
      });
    });

  return unsubscribe;
};

export const allSaveByUser = async (userId) => {
  const user = await firestore().collection('users').doc(userId).get();

  let posts = [];
  let saves = user.data().saves;

  if (saves) {
    for (let i = 0; i < saves.length; i++) {
      const post = await saves[i].post.get();

      posts.push({
        ...post.data(),
        id: post.id,
        key: post.id,
      });
    }

    return posts;
  }

  return [];
};

export const createPost = async (postObject) => {
  await firestore()
    .collection('posts')
    .add({
      ...postObject,
      date: firestore.Timestamp.fromDate(new Date()),
    });
};

export const deletePost = async (postId) => {
  await firestore().collection('posts').doc(postId).delete();
};

export const updatePost = async (postId, text) => {
  await firestore().collection('posts').doc(postId).update({ text });
};

export const likePost = async (postId, likeObject) => {
  const newLikeObject = {
    ...likeObject,
    date: firestore.Timestamp.fromDate(new Date()),
  };

  await firestore()
    .collection('posts')
    .doc(postId)
    .update({
      likes: firebase.firestore.FieldValue.arrayUnion(newLikeObject),
    });
};

export const unlikePost = async (postId, likeObject) => {
  await firestore()
    .collection('posts')
    .doc(postId)
    .update({
      likes: firebase.firestore.FieldValue.arrayRemove(likeObject),
    });
};

export const createComment = async (postId, commentObject) => {
  const newCommentObject = {
    ...commentObject,
    date: firestore.Timestamp.fromDate(new Date()),
  };

  await firestore()
    .collection('posts')
    .doc(postId)
    .update({
      comments: firebase.firestore.FieldValue.arrayUnion(newCommentObject),
    });
};
