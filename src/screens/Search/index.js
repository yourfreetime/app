import React, { useState } from "react";
import { View, TextInput, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { t } from "../../i18n";

import style from "./Search.style";
import colors from "../../core/colors";

import Root from "../../components/Root";
import Posts from "./containers/Posts";
import Users from "./containers/Users";

const SearchScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);

  navigation.setOptions({
    headerTitle: () => (
      <TextInput
        style={style.search}
        numberOfLines={1}
        textAlignVertical="top"
        placeholder={t("SEARCH")}
      />
    )
  });

  const renderScene = SceneMap({ publications: Posts, users: Users });
  const routes = [
    { key: "publications", title: t("PUBLICATIONS") },
    { key: "users", title: t("USERS") }
  ];

  return (
    <Root style={{ padding: 0 }}>
      <TabView
        renderTabBar={props => (
          <TabBar
            indicatorStyle={style.indicator}
            style={style.tab}
            activeColor={colors.primary}
            inactiveColor={colors.grey}
            {...props}
          />
        )}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={index => setIndex(index)}
        initialLayout={{ width: Dimensions.get("window").width }}
      />
    </Root>
  );
};

export default SearchScreen;
