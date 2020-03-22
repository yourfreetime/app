import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FeedScreen from "../Feed";
import GlobalScreen from "../Global";
import UserAreaScreen from "../UserArea";

const Tab = createBottomTabNavigator();

const HomeScreen = () => (
  <Tab.Navigator>
    <Tab.Screen name="Feed" component={FeedScreen} />
    <Tab.Screen name="Global" component={GlobalScreen} />
    <Tab.Screen name="UserArea" component={UserAreaScreen} />
  </Tab.Navigator>
);

export default HomeScreen;
