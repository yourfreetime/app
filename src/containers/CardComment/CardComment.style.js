import { StyleSheet } from "react-native";
import colors from "../../core/colors";

const style = StyleSheet.create({
  root: { margin: 3, flexDirection: "row", marginBottom: 16 },
  userImage: { width: 40, height: 40, borderRadius: 100 },
  card: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 16,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  arrow: {
    position: "absolute",
    top: -2,
    left: -20,
    textShadowRadius: 1,
    textShadowColor: "rgba(100, 100, 100, 0.2)",
    textShadowOffset: { width: 0, height: -1 },
    transform: [{ rotate: "270deg" }]
  },
  userName: { fontSize: 14, fontWeight: "900", marginBottom: 8 },
  text: { fontSize: 20, color: colors.blueGreyDarken3 }
});

export default style;
