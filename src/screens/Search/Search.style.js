import { StyleSheet } from "react-native";
import colors from "../../core/colors";

const style = StyleSheet.create({
  indicator: { backgroundColor: colors.primary, height: 5 },
  tab: { backgroundColor: colors.white, color: colors.primary },
  search: {
    flex: 1,
    marginLeft: -20,
    color: colors.blueGreyDarken3,
    fontSize: 18
  }
});

export default style;
