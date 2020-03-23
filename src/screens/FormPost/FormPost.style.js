import { StyleSheet } from "react-native";
import colors from "../../core/colors";

const style = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.background },
  input: { fontSize: 30, marginVertical: 16 },
  userImage: { width: 30, height: 30, borderRadius: 100, marginRight: 10 },
  user: { flexDirection: "row", alignItems: "center" },
  userName: { fontSize: 20, fontWeight: "600" }
});

export default style;
