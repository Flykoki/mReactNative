import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import {
  createAppContainer,
  createBottomTabNavigator,
  createTabNavigator,
  createStackNavigator,
  StackActions,
  NavigationActions
} from "react-navigation"; // Version can be specified in package.json

export class HomeScreen extends Component {
  static navigationOptions = {
    title: "首页aa",
    headerStyle: {
      backgroundColor: 'green',
    },
    headerTintColor: '#aaa',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
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
