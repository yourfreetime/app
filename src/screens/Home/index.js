import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MaterialCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import FeedScreen from "../Feed";
import GlobalScreen from "../Global";
import UserAreaScreen from "../UserArea";

const Tab = createBottomTabNavigator();

const HomeScreen = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Feed"
      component={FeedScreen}
      options={{
        title: "Nosso tempo",
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="toys" size={30} color={color} />
        )
      }}
    />
    <Tab.Screen
      name="Global"
      component={GlobalScreen}
      options={{
        title: "Próximo",
        tabBarIcon: ({ color }) => (
          <MaterialCIcons name="access-point" size={30} color={color} />
        )
      }}
    />
    <Tab.Screen
      name="UserArea"
      component={UserAreaScreen}
      options={{
        title: "Eu",
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="face" size={30} color={color} />
        )
      }}
    />
  </Tab.Navigator>
);

export default HomeScreen;
