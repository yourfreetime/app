import { StyleSheet } from "react-native";
import colors from "../../core/colors";

const style = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: "center"
  },
  primary: { backgroundColor: colors.primary },
  active: { backgroundColor: colors.dark },
  white: { backgroundColor: colors.white },
  text: {
    fontSize: 15,
    textTransform: "uppercase",
    fontWeight: "900"
  }
});

export default style;
