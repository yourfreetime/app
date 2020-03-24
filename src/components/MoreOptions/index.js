import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import OptionsMenu from "react-native-options-menu";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const MoreOptionsComponent = ({ style: newStyle, options, actions }) => (
  <View style={newStyle}>
    <OptionsMenu
      customButton={<MaterialIcons name="more-vert" size={25} />}
      buttonStyle={newStyle}
      destructiveIndex={1}
      options={options}
      actions={actions}
    />
  </View>
);

MoreOptionsComponent.propTypes = {
  options: PropTypes.array.isRequired,
  actions: PropTypes.array.isRequired
};

export default MoreOptionsComponent;
