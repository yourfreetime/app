import React from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableNativeFeedback, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import style from "./Button.style";

const ButtonComponent = ({
  title,
  variant,
  onPress,
  iconColor,
  size,
  startIcon: startIconProp,
  style: newStyle
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
      <View style={[style.root, style[variant], style[size], newStyle]}>
        {startIcon}
        <Text
          style={[style.text, style[`${variant}Text`], style[`${size}Text`]]}
        >
          {title}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

ButtonComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "active", "white", "transparent"]),
  size: PropTypes.oneOf(["large", "medium", "small"])
};

ButtonComponent.defaultProps = {
  variant: "active",
  size: "medium"
};

export default ButtonComponent;
