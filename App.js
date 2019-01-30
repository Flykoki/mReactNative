import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import {
  createAppContainer,
  createBottomTabNavigator,
  createTabNavigator,
  createStackNavigator,
  StackActions,
  NavigationActions
} from "react-navigation"; // Version can be specified in package.json

import { TabNav } from "./src/page/RootPage";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "首页"
  };
  componentDidMount() {
    console.log("HomeScreen componentDidMount");
  }
  componentWillUnmount() {
    console.log("HomeScreen componentWillUnmount");
  }
  render() {
    console.log("HomeScreen navigation:" + this.props.navigation.title);
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => {
            this.props.navigation.navigate("Details", {
              param1: "this is a param",
              param2: 11111
            });
          }}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = ({
    navigation,
    screenProps,
    navigationOptions
  }) => {
    return {
      title: navigation.getParam("param1", "A Nested Details Screen")
    };
  };
  componentDidMount() {
    console.log("DetailsScreen componentDidMount");
  }
  componentWillUnmount() {
    console.log("DetailsScreen componentWillUnmount");
  }

  render() {
    console.log("detaiScreen navigation:" + this.props.navigation.title);
    const pa = this.props.navigation.getParam("param1");
    const intParam = this.props.navigation.getParam("param2");
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
          margin: 8
        }}
      >
        <Text>
          Details screen {pa} {intParam}
        </Text>
        <Button
          style={styles.button}
          title="update title"
          onPress={() => this.props.navigation.setParams({param1:'update title content'})}
        />
        <Button
          style={styles.button}
          title="Go to Home"
          onPress={() => this.props.navigation.navigate("Home")}
        />
        <Button
          style={styles.button}
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
        <Button
          style={styles.button}
          title="Go first Screen"
          onPress={() => this.props.navigation.popToTop()}
        />
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "设置"
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
    title: "文档"
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>ProfileScreen Screen</Text>
      </View>
    );
  }
}

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Home",
    title: "this navigation title"
  }
);
const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  Profile: ProfileScreen
});
const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Settings: SettingsStack
  },
  {
    tabBarOptions: {
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
    initialRouteName: "Home"
  }
);

const styles = StyleSheet.create({
  button: {
    padding: 18,
    marginTop: 8
  }
});

export default createAppContainer(TabNavigator);
