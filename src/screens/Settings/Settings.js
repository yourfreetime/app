import React from "react";
import { Text, Button } from "react-native";
import { StackActions } from "@react-navigation/native";
import { firebase } from "@react-native-firebase/auth";
import { t } from "../../i18n";

import Root from "../../components/Root";

const Settings = ({ navigation }) => {
  let userId = firebase.auth().currentUser.uid;

  return (
    <Root>
      <Text>Settings Screen</Text>
      {userId && (
        <Button
          variant="primary"
          title={t("EXIT")}
          onPress={() => {
            firebase.auth().signOut();
            navigation.dispatch(StackActions.replace("Login"));
          }}
        />
      )}
    </Root>
  );
};

export default Settings;
