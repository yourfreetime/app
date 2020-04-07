import { StyleSheet } from "react-native";
import colors from "../../core/colors";

const style = StyleSheet.create({
  logo: { width: 150, height: 150, marginBottom: 30 },
  container: { flex: 1, backgroundColor: colors.primary },
  scroll: { padding: 25, alignItems: "center" },
  input: {
    fontSize: 20,
    width: "100%",
    color: colors.white,
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 15
  }
});

export default style;
