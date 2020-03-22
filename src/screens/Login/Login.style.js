import { StyleSheet } from "react-native";
import colors from "../../core/colors";

const style = StyleSheet.create({
  logo: {
    width: 250,
    height: 250,
    marginBottom: 10,
    paddingTop: 20
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary
  }
});

export default style;
