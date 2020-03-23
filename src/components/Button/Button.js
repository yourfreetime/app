import React from "react";
import { View, Text, TouchableNativeFeedback, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import style from "./Button.style";

const ButtonComponent = ({
  title,
  variant,
  onPress,
  iconColor,
  startIcon: startIconProp
}) => {
  const startIcon = startIconProp ? (
    <View style={style.startIcon}>
      <Icon name={startIconProp} size={20} color={iconColor} />
    </View>
  ) : null;

  return (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.SelectableBackground()}
    >
      <View style={[style.root, style[variant]]}>
        {startIcon}
        <Text style={[style.texte, style[`${variant}Text`]]}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

ButtonComponent.defaultProps = {
  variant: "active",
  size: "medium"
};

export default ButtonComponent;
