import { StyleSheet } from "react-native";
import colors from "../../core/colors";

const style = StyleSheet.create({
  userArea: { flexDirection: "row", marginBottom: 20, alignItems: "center" },
  userImage: { width: 100, height: 100, borderRadius: 100 },
  userName: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
    fontFamily: "Roboto-Bold",
    color: colors.blueGreyDarken3
  },
  counts: { flexDirection: "row", alignContent: "stretch", marginBottom: 20 }
});

export default style;
