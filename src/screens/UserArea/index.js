import React from "react";
import { StyleSheet, Text, View } from "react-native";

const UserAreaScreen = () => (
  <View style={styles.container}>
    <Text>User Area Screen</Text>
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
