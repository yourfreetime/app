import React from "react";
import { StackActions } from "@react-navigation/native";
import { firebase } from "@react-native-firebase/auth";
import { StyleSheet, Text, View } from "react-native";

import Button from "../../components/Button";

const UserAreaScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text>User Area Screen</Text>
    <Button
      variant="primary"
      title="Sair"
      onPress={async () => {
        firebase.auth().signOut();
        navigation.dispatch(StackActions.replace("Login"));
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

export default UserAreaScreen;
