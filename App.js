import React from "react";
import { Image, View, Text, Button, StyleSheet } from "react-native";
import {
  createAppContainer,
  createBottomTabNavigator,
  createTabNavigator,
  createStackNavigator,
  StackActions,
  NavigationActions
} from "react-navigation"; // Version can be specified in package.json

import { TabNav } from "./src/page/RootPage";
import { HomeStack } from "./src/home/HomeStack";

class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null, //header置空
    title: "设置",
    mode: "modal"
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>SettingsScreen Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => {
            this.props.navigation.navigate("Profile");
          }}
        />
      </View>
    );
  }
}
class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: "文档",
    headerTitleStyle: { flex: 1, textAlign: "center" },
    headerStyle: {
      backgroundColor: "green"
    },
    headerTintColor: "#aaa",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>ProfileScreen Screen</Text>
      </View>
    );
  }
}

class InfoScreen extends React.Component {
  static navigationOptions = {
    title: "资讯"
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>InfoScreen Screen</Text>
      </View>
    );
  }
}

class HeaderBackImage extends React.Component {
  render() {
    return (
      <Image
        source={require("./src/img/swiper_1.jpg")}
        style={{ width: 30, height: 30, marginLeft: 9 }}
      />
    );
  }
}

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
    Profile: ProfileScreen
  },
  {
    defaultNavigationOptions: {
      headerMode: "none",
      headerBackImage: <HeaderBackImage />,
      headerBackTitle: "headerBackTitle&img"
    }
  }
);

const InfoStack = createStackNavigator({
  Infos: InfoScreen
});
const TabNavigator = createBottomTabNavigator(
  {
    首页: HomeStack,
    资讯: InfoStack,
    设置: SettingsStack
  },
  {
    tabBarOptions: {
      activeTintColor: "green",
      activeBackgroundColor: "grey",
      showIcon: true,
      pressColor: "#788493",
      //tab bar的样式
      style: {
        backgroundColor: "#fff",
        paddingBottom: 1,
        borderTopWidth: 0.2,
        paddingTop: 1,
        borderTopColor: "#ccc"
      },
      //tab bar的文本样式
      labelStyle: {
        fontSize: 11,
        margin: 10
      }
    },
    tabBarOptions: "top",
    swipeEnabled: true,
    animationEnabled: true,
    lazy: true,
    backBehavior: "initialRoute",
    initialRouteName: "首页",
    order: ["设置", "首页", "资讯"] //tab显示顺序
  }
);

const styles = StyleSheet.create({
  button: {
    padding: 18,
    marginTop: 8
  }
});

export default createAppContainer(TabNavigator);
