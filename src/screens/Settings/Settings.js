import React from "react";
import { Text, Button } from "react-native";
import { StackActions } from "@react-navigation/native";
import { firebase } from "@react-native-firebase/auth";

import Root from "../../components/Root";

const Settings = ({ navigation }) => {
  let userId = firebase.auth().currentUser.uid;

  return (
    <Root>
      <Text>Settings Screen</Text>
      {userId && (
        <Button
          variant="primary"
          title="Sair"
          onPress={() => {
            firebase.auth().signOut();
            navigation
              .dangerouslyGetParent()
              .dispatch(StackActions.replace("Login"));
          }}
        />
      )}
    </Root>
  );
};

export default Settings;
