import { StyleSheet } from "react-native";
import colors from "../../core/colors";

const style = StyleSheet.create({
  userImage: { width: 20, height: 20, borderRadius: 100 },
  card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginBottom: 16
  },
  userName: {
    fontSize: 24,
    fontWeight: "900",
    marginLeft: 8,
    fontWeight: "bold",
    color: colors.blueGreyDarken3
  }
});

export default style;
