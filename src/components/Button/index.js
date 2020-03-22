import React from "react";
import { View, Text, TouchableNativeFeedback } from "react-native";
import style from "./Button.style";

const ButtonComponent = ({ title, variant, onPress }) => (
  <TouchableNativeFeedback
    onPress={onPress}
    background={TouchableNativeFeedback.SelectableBackground()}
  >
    <View style={[style.root, style[variant]]}>
      <Text style={style.text}>{title}</Text>
    </View>
  </TouchableNativeFeedback>
);

ButtonComponent.defaultProps = {
  variant: "active"
};

export default ButtonComponent;
