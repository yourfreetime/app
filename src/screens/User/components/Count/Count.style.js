import { StyleSheet } from "react-native";
import colors from "../../../../core/colors";

const style = StyleSheet.create({
  root: { flex: 1, alignItems: "center", paddingHorizontal: 2 },
  rootCount: { flexDirection: "row", alignItems: "center" },
  count: {
    fontWeight: "bold",
    fontFamily: "Roboto-Bold",
    fontSize: 20,
    marginLeft: 5,
    color: colors.blueGreyDarken3
  },
  title: { textAlign: "center", color: colors.blueGreyDarken3 }
});

export default style;
