import { StyleSheet } from "react-native";
import colors from "../../core/colors";

const style = StyleSheet.create({
  root: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 200
  },
  logo: { width: 40, height: 40 },
  text: { marginLeft: 16, color: colors.grey, fontSize: 18 }
});

export default style;
