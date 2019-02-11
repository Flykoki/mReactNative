import { Image, Text, View } from "react-native";
import React, { Component } from "react";

export class FriendListScreen extends React.Component {
  static navigationOptions = {
    drawerIcon: () => (
      <Image
        source={require("../img/swiper_2.jpg")}
        style={[{ width: 24, height: 24 }, {}]}
      />
    ),
    drawerLabel: "列表"
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>FriendListScreen Screen</Text>
      </View>
    );
  }
}
