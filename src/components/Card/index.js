import React from "react";
import { View } from "react-native";
import style from "./Card.style";

const CardComponent = ({ children, style: pStyle, ...props }) => (
  <View style={[style.root, pStyle]} {...props}>
    {children}
  </View>
);

export default CardComponent;
