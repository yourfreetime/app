import React from "react";
import { TouchableNativeFeedback, View } from "react-native";
import style from "./Card.style";

const CardComponent = ({ children, style: pStyle, onPress, ...props }) => {
  if (onPress) {
    return (
      <TouchableNativeFeedback onPress={onPress}>
        <View style={[style.root, pStyle]} {...props}>
          {children}
        </View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <View style={[style.root, pStyle]} {...props}>
      {children}
    </View>
  );
};

export default CardComponent;
