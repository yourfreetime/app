import gql from 'graphql-tag';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';

export const CREATE_FOLLOW = gql`
  mutation($userFollowId: String!) {
    createFollow(input: { userFollowId: $userFollowId }) {
      user {
        id
        name
      }
      userFollow {
        id
        name
      }
    }
  }
`;

export const DELETE_FOLLOW = gql`
  mutation($userFollowId: String!) {
    deleteFollow(input: { userFollowId: $userFollowId }) {
      user {
        id
        name
      }
      userFollow {
        id
        name
      }
    }
  }
`;

export const listFollow = (userId, callback) => {
  const unsubscribe = firestore()
    .collection('follows')
    .where(
      'userFollow',
      '==',
      firestore()
        .collection('users')
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
