import { StyleSheet } from "react-native";
import colors from "../../../../core/colors";

const style = StyleSheet.create({
  button: { flex: 1, alignItems: "center", flexDirection: "row" },
  textButton: { fontSize: 17, marginLeft: 7 },
  textActive: { color: colors.dark }
});

export default style;
