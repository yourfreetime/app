import { StyleSheet } from "react-native";
import colors from "../../core/colors";

const style = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: colors.background
  },
  userArea: { alignItems: "center" },
  userImage: { width: 150, height: 150, borderRadius: 100, marginRight: 10 },
  userName: { marginVertical: 16, fontWeight: "900", fontSize: 35 }
});

export default style;
