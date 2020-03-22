import React from "react";
import { View } from "react-native";
import style from "./Divider.style";

const DividerComponent = ({ style: pStyle, ...props }) => (
  <View style={[style.root, pStyle]} {...props} />
);

export default DividerComponent;
