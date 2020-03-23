import React from "react";
import { View, Text, TouchableNativeFeedback, Image } from "react-native";
import style from "./Button.style";

const ButtonComponent = ({
  title,
  variant,
  onPress,
  startIcon: startIconProp
}) => {
  const startIcon = startIconProp ? (
    <View style={style.startIcon}>
      <Image
        style={style.iconSizeMedium}
        resizeMode="contain"
        source={startIconProp}
      />
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
