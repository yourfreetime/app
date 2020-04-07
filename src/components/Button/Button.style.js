import { StyleSheet } from "react-native";
import colors from "../../core/colors";

const style = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 15,
    paddingBottom: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1
  },
  primary: { backgroundColor: colors.primary },
  active: { backgroundColor: colors.dark },
  white: { backgroundColor: colors.white },
  primaryText: { color: colors.white },
  activeText: { color: colors.white },
  whiteText: {},
  transparentText: { color: colors.white },
  text: {
    fontSize: 15,
    textTransform: "uppercase",
    fontWeight: "900"
  },
  startIcon: {
    marginRight: 8,
    marginLeft: -4
  },
  iconSizeMedium: {
    width: 20,
    height: 20
  },
  small: { paddingTop: 7, paddingBottom: 7 },
  medium: { paddingTop: 15, paddingBottom: 15 },
  large: { paddingTop: 22, paddingBottom: 22 },
  smallText: { fontSize: 12 },
  mediumText: { fontSize: 15 },
  largeText: { fontSize: 18 }
});

export default style;
