import { StyleSheet } from "react-native";
import colors from "../../core/colors";

const style = StyleSheet.create({
  logo: { width: 250, height: 250, marginBottom: 60 },
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
