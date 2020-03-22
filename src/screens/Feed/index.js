import React from "react";
import { StyleSheet, Text, View } from "react-native";

const FeedScreen = () => (
  <View style={styles.container}>
    <Text>Feed Screen</Text>
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

export default FeedScreen;
