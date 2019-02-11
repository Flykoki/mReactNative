import React from "react";
import {
  SafeAreaView,
  StatusBar,
  Image,
  View,
  Text,
  Button,
  StyleSheet
} from "react-native";

import { createStackNavigator } from "react-navigation";

class Screen1 extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "grey"
        }}
      >
        <StatusBar barStyle="light-content" backgroundColor="green" />
        <Text style={[{ color: "#fff" }]}>Light Screen</Text>
        <Button
          title="Next screen"
          onPress={() => this.props.navigation.navigate("Screen2")}
          color={"blue"}
        />
      </View>
    );
  }
}

class Screen2 extends React.Component {
  render() {
    return (
      <View style={[(flex = 1), { backgroundColor: "grey" }]}>
        <StatusBar barStyle="dark-content" backgroundColor="green" />
        <Text>Dark Screen</Text>
        <Button
          title="Next screen"
          onPress={() => this.props.navigation.navigate("Screen1")}
        />
      </View>
    );
  }
}

export default createStackNavigator(
  {
    Screen1: {
      screen: Screen1
    },
    Screen2: {
      screen: Screen2
    }
  },
  {
    headerMode: "none"
  }
);
