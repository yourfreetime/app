import React from "react";
import PropTypes from "prop-types";
import { View, ActivityIndicator } from "react-native";

import style from "./Loader.style";

const LoaderComponent = ({ show, background }) =>
  show ? (
    <View
      style={[style.root, background ? { backgroundColor: background } : {}]}
    >
      <View style={style.content}>
        <ActivityIndicator color="white" />
      </View>
    </View>
  ) : (
    <View />
  );

LoaderComponent.propTypes = {
  show: PropTypes.bool,
  background: PropTypes.string
};

LoaderComponent.defaultProps = {
  show: false
};

export default LoaderComponent;
