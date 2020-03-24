import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MaterialCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import colors from "../../core/colors";

import FeedScreen from "../Feed";
import GlobalScreen from "../Global";
import UserScreen from "../User";

const Tab = createBottomTabNavigator();

const HomeScreen = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: colors.dark,
      inactiveTintColor: colors.blueGreyDarken3,
      indicatorStyle: { backgroundColor: colors.dark, top: 1 },
      labelStyle: { fontSize: 10, marginTop: 0, marginBottom: 0 },
      iconStyle: { marginBottom: 0, marginTop: 0 }
    }}
  >
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
      name="User"
      component={UserScreen}
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
