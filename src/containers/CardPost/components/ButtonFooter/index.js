import React from "react";
import PropTypes from "prop-types";
import { Text, TouchableOpacity } from "react-native";

import EntypoIcons from "react-native-vector-icons/Entypo";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";

import style from "./ButtonFooter.style";
import colors from "../../../../core/colors";

const ButtonFooterComponent = ({ onPress, active, text, icon }) => {
  const color = active ? colors.dark : colors.blueGreyDarken3;

  const icons = {
    enhance: <EntypoIcons name="aircraft" size={16} color={color} />,
    reply: <FontAwesomeIcons name="comment" size={16} color={color} />
  };

  const elementIcon = icons[icon];

  return (
    <TouchableOpacity style={style.button} onPress={onPress}>
      {elementIcon}
      <Text style={[style.textButton, active ? style.textActive : {}]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

ButtonFooterComponent.propTypes = {
  onPress: PropTypes.func,
  active: PropTypes.bool,
  text: PropTypes.string.isRequired,
  icon: PropTypes.oneOf(["enhance", "reply"]).isRequired
};

ButtonFooterComponent.defaultProps = {
  active: false
};

export default ButtonFooterComponent;
