import { StyleSheet } from "react-native";
import colors from "../../core/colors";

const style = StyleSheet.create({
  logo: {
    width: 250,
    height: 250,
    marginBottom: 80
  },
  container: {
    flex: 1,
    padding: 25,
    alignItems: "center",
    backgroundColor: colors.primary
  },
  button: {
    backgroundColor: colors.white
  }
});

export default style;
