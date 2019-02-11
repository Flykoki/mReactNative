import { Image, StatusBar, Text, View } from "react-native";
import React, { Component } from "react";

export class FeedScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: "测试",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("../img/swiper_1.jpg")}
        style={[{ width: 24, height: 24 }, {}]}
      />
    )
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "green"
        }}
      >
        <StatusBar backgroundColor = "green"/>
        <Text>FeedScreen Screen</Text>
      </View>
    );
  }
}
