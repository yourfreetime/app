import { StyleSheet } from "react-native";
import colors from "../../../../core/colors";

const style = StyleSheet.create({
  button: { flex: 1, alignItems: "center", flexDirection: "row" },
  textButton: { fontSize: 15, marginLeft: 5, fontWeight: "bold" },
  textActive: { color: colors.dark }
});

export default style;
