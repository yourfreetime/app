import React from "react";
import { SafeAreaView } from "react-native";

import style from "./Root.style";

const RootComponent = ({ style: newStyle, children, ...props }) => (
  <SafeAreaView style={[style.container, newStyle]} {...props}>
    {children}
  </SafeAreaView>
);

export default RootComponent;
