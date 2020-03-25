import { StyleSheet } from "react-native";
import colors from "../../core/colors";

const style = StyleSheet.create({
  rootTitle: { flexDirection: "row", alignItems: "center" },
  userImage: { width: 40, height: 40, borderRadius: 100 },
  contentTitle: { justifyContent: "center", marginLeft: 16 },
  userName: { fontSize: 18, fontWeight: "900" },
  date: { fontSize: 12 },
  text: { fontSize: 20, color: colors.blueGreyDarken3 }
});

export default style;
