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

export class DetailsScreen extends React.Component {
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
          title="update title"
          onPress={() =>
            this.props.navigation.setParams({ param1: "update title content" })
          }
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate("Home")}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
        <Button
          title="Go first Screen"
          onPress={() => this.props.navigation.popToTop()}
        />
      </View>
    );
  }
}
