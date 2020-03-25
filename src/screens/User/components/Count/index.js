import React from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity } from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

import style from "./Count.style";
import colors from "../../../../core/colors";

const CountComponent = ({ icon, title, count, onPress }) => {
  const component = (
    <View style={style.root}>
      <View style={style.rootCount}>
        <MaterialIcons color={colors.blueGreyDarken3} name={icon} size={20} />
        <Text style={style.count}>{count}</Text>
      </View>
      <Text style={style.title} numberOfLines={2} ellipsizeMode="tail">
        {title}
      </Text>
    </View>
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{component}</TouchableOpacity>;
  }

  return component;
};

CountComponent.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.number,
  onPress: PropTypes.func
};

export default CountComponent;
