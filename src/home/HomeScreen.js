import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  Button,
  StyleSheet
} from "react-native";
import { fetchRequest } from "../utils/FetchUtil";
import ToastUtil from "../utils/ToastUtil";
import {
  createAppContainer,
  createBottomTabNavigator,
  createTabNavigator,
  createStackNavigator,
  StackActions,
  NavigationActions
} from "react-navigation"; // Version can be specified in package.json
class HeaderRight extends React.Component {
  onSettingViewClick() {
    console.warn("点击了自定义菜单");
  }

  render() {
    return (
      <TouchableOpacity onPress={() => console.warn("点击了自定义菜单")}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "red",
            shadowRadius: 9
          }}
        >
          <Image
            source={require("../img/swiper_1.jpg")}
            style={{ width: 30, height: 30 }}
          />
          <Text style={{ paddingRight: 9, color: "blue" }}>自定义菜单</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
class HeaderLeft extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={() => console.warn("点击了左侧自定义View")}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            shadowColor: "center",
            shadowRadius: 9
          }}
        >
          <Image
            source={require("../img/swiper_1.jpg")}
            style={{ width: 30, height: 30, marginLeft: 9 }}
          />
          <Text style={{ paddingLeft: 9, color: "yellow", fontSize: 18 }}>
            自定义标题
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export class HomeScreen extends Component {
  static navigationOptions = ({
    navigation,
    screenProps,
    navigationOptions
  }) => ({
    title: "首页"
    // headerTitleStyle: { flex: 1, textAlign: "center" },
    // headerRight: <HeaderRight />,
    // headerLeft: <HeaderLeft />,
    // headerStyle: {
    //   backgroundColor: "green"
    // },
    // headerTintColor: "#aaa",
    // headerTitleStyle: {
    //   fontWeight: "bold"
    // },
    // tabBarIcon: ({ focused }) => {
    //   console.warn('home screen focused:'+focused)
    //   if (focused) {
    //     return (
    //       <Image
    //         style={{ width: 19, height: 19 }}
    //         source={require("../img/task_sel.png")}
    //       />
    //     );
    //   } else {
    //     return (
    //       <Image
    //         style={{ width: 19, height: 19 }}
    //         source={require("../img/task_nor.png")}
    //       />
    //     );
    //   }
    // }
  });

  loginTest = () => {
    url = "/user/login";
    let data = new FormData();
    data.append("username", "lfj123");
    data.append("password", "lfj123");
    console.log("linfj login req:" + JSON.stringify(data));
    // data = {
    //   username: "lfj123",
    //   password: "lfj123"
    // };

    fetchRequest(url, "POST", data)
      .then(res => {
        console.log("linfj login res:" + res);
        console.log(res.data);

        if (res.respCode === 200) {
          ToastUtil.showShort(res.data);
        } else {
          ToastUtil.showShort(res.respMsg);
        }
      })
      .catch(error => {
        console.log(error);
        ToastUtil.showShort(error);
      });
  };
  componentDidMount() {
    console.log("HomeScreen componentDidMount");
    this.loginTest();
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
            this.loginTest();
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
