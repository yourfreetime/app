import { StyleSheet } from "react-native";
import colors from "../../core/colors";

const style = StyleSheet.create({
  input: { fontSize: 30, marginTop: -20, flex: 1 },
  userImage: { width: 30, height: 30, borderRadius: 100, marginRight: 10 },
  post: { flexDirection: "row", alignItems: "center" },
  textPost: { fontSize: 20 },
  form: { flexDirection: "row", marginVertical: 16 },
  titleAnswer: {
    marginTop: 16,
    fontWeight: "bold",
    color: colors.blueGreyDarken3
  }
});

export default style;
