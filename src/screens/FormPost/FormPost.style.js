import { StyleSheet } from "react-native";
import colors from "../../core/colors";

const style = StyleSheet.create({
  input: { fontSize: 30, marginVertical: 16 },
  userImage: { width: 30, height: 30, borderRadius: 100, marginRight: 10 },
  user: { flexDirection: "row", alignItems: "center" },
  userName: { fontSize: 23, fontWeight: "bold", color: colors.blueGreyDarken3 }
});

export default style;
