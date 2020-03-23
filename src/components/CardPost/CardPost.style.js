import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  rootTitle: { flexDirection: "row", alignItems: "center" },
  userImage: { width: 40, height: 40, borderRadius: 100 },
  contentTitle: { justifyContent: "center", marginLeft: 16 },
  userName: { fontSize: 18, fontWeight: "900" },
  date: { fontSize: 12 },
  buttons: { flex: 1, flexDirection: "row", alignContent: "stretch" },
  button: { alignItems: "center", flexDirection: "row" }
});

export default style;
