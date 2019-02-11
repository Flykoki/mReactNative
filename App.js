import React from "react";
import {
  ToastAndroid,
  BackHandler,
  Image,
  Statusbar,
  View,
  Text,
  Button,
  StyleSheet
} from "react-native";
import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  createTabNavigator,
  createStackNavigator,
  StackActions,
  NavigationActions
} from "react-navigation"; // Version can be specified in package.json
// import Ionicons from "react-native-vector-icons/Ionicons";
import { TabNav } from "./src/page/RootPage";
import { FeedScreen } from "./src/DrawerStack/FeedScreen";
import { DetailsScreen } from "./src/home/DetailPage";
import { FriendListScreen } from "./src/DrawerStack/FriendListScreen";
import { HomeStack } from "./src/home/HomeStack";
import { HomeScreen } from "./src/home/HomeScreen";
// import { LoadMoreDemo } from "./src/PullListDemo";
import { BottomNavigatorWithCus } from "./src/bottomNavigator/bottomnavigatorwithcus";
import SwitchNavigatorCus from "./src/switchNavigator/switchNaviagator";
import StatuBarNavigator from "./src/statusbar/StatusBarNavigator";

class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null, //header置空
    title: "设置",
    mode: "modal",
    tabBarIcon: ({ focused }) => {
      // console.warn("home screen focused:" + focused);
      if (focused) {
        return (
          <Image
            style={{ width: 19, height: 19 }}
            source={require("./src/img/car_sel.png")}
          />
        );
      } else {
        return (
          <Image
            style={{ width: 19, height: 19 }}
            source={require("./src/img/car_nor.png")}
          />
        );
      }
    }
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>SettingsScreen Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => {
            this.props.navigation.navigate("Details");
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
  didFocusSubscription;
  willBlurSubscription;

  onBackPress = () => {
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      //最近2秒内按过back键，可以退出应用。
      return false;
    }
    this.lastBackPressed = Date.now();
    ToastAndroid.show("再按一次退出应用", ToastAndroid.SHORT);
    return true;
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.didFocusSubscription = props.navigation.addListener(
      "didFocus",
      payload =>
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress)
    );
  }

  componentDidMount() {
    this.willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      payload =>
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress)
    );
  }

  componentWillUnmount() {
    this.didFocusSubscription && this.didFocusSubscription.remove();
    this.willBlurSubscription && this.willBlurSubscription.remove();
  }

  static navigationOptions = {
    tabBarIcon: ({ focused }) => {
      if (focused) {
        return (
          <Image
            style={{ width: 19, height: 19 }}
            source={require("./src/img/task_sel.png")}
          />
        );
      } else {
        return (
          <Image
            style={{ width: 19, height: 19 }}
            source={require("./src/img/task_nor.png")}
          />
        );
      }
    },
    title: "资讯"
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "grey"
        }}
      >
        {/* <Statusbar backgroundColor="grey" /> */}
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
    Settings: SettingsScreen
  },
  {
    defaultNavigationOptions: {
      headerMode: "none",
      headerBackImage: <HeaderBackImage />,
      headerBackTitle: "headerBackTitle&img",
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === "Settings") {
          if (focused) {
            return (
              <Image
                style={{ width: 19, height: 19 }}
                source={require("./src/img/task_sel.png")}
              />
            );
          } else {
            return (
              <Image
                style={{ width: 19, height: 19 }}
                source={require("./src/img/task_nor.png")}
              />
            );
          }
        }
      }
    }
  }
);

const InfoStack = createStackNavigator({
  Infos: InfoScreen
});

// InfoScreen.navigationOptions=({navigation})=>{
//   console.warn('InfoStack default navigation options'+navigation.state);
// }

//==================================  Bottom tab navigator =============================
const BottomTabNavigator = createBottomTabNavigator(
  {
    // 首页: LoadMoreDemo,
    首页: HomeScreen,
    资讯: InfoScreen,
    设置: SettingsScreen,
    Details: DetailsScreen,
    Profile: ProfileScreen
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
    headerMode: 'screen',
    // backBehavior: "initialRoute",
    initialRouteName: "首页",
    order: ["首页", "资讯", , "设置"] //tab显示顺序
  }
);
//==================================  Bottom tab navigator =============================

//==================================  Switch tab navigator =============================
const DrawerStack = createDrawerNavigator({
  Feed: FeedScreen,
  FriendList: FriendListScreen
});

const SwitchNavigator = createSwitchNavigator({
  Drawer: DrawerStack,
  Setting: SettingsStack
});

//==================================  Switch tab navigator =============================

// ================================= 自定义 tab 的bottom navigator =====================
// class IconWithBadge extends React.Component {
//   render() {
//     const { name, badgeCount, color, size } = this.props;
//     return (
//       <View style={{ width: 24, height: 24, margin: 5 }}>
//         <Ionicons name={name} size={size} color={color} />
//         {badgeCount > 0 && (
//           <View
//             style={{
//               // /If you're using react-native < 0.57 overflow outside of the parent
//               // will not work on Android, see https://git.io/fhLJ8
//               position: "absolute",
//               right: -6,
//               top: -3,
//               backgroundColor: "red",
//               borderRadius: 6,
//               width: 12,
//               height: 12,
//               justifyContent: "center",
//               alignItems: "center"
//             }}
//           >
//             <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
//               {badgeCount}
//             </Text>
//           </View>
//         )}
//       </View>
//     );
//   }
// }

// const HomeIconWithBadge = props => {
//   // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
//   return <IconWithBadge {...props} badgeCount={3} />;
// };
// const CreateBottomTabNavigatorCus = createBottomTabNavigator(
//   {
//     Home: HomeScreen,
//     Settings: SettingsScreen
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ focused, horizontal, tintColor }) => {
//         const { routeName } = navigation.state;
//         let IconComponent = Ionicons;
//         let iconName;
//         if (routeName === "Home") {
//           iconName = `ios-information-circle${focused ? "" : "-outline"}`;
//           // Sometimes we want to add badges to some icons.
//           // You can check the implementation below.
//           IconComponent = HomeIconWithBadge;
//         } else if (routeName === "Settings") {
//           iconName = `ios-options${focused ? "" : "-outline"}`;
//         }

//         // You can return any component that you like here!
//         return <IconComponent name={iconName} size={25} color={tintColor} />;
//       }
//     }),
//     tabBarOptions: {
//       activeTintColor: "tomato",
//       inactiveTintColor: "gray"
//     }
//   }
// );
// ================================= 自定义 tab 的bottom navigator =====================
const styles = StyleSheet.create({
  button: {
    padding: 18,
    marginTop: 8
  }
});

export default createAppContainer(BottomTabNavigator); //普通的bottom navigator
// export default createAppContainer(SwitchNavigator);//侧边栏 navigator
// export default createAppContainer(SwitchNavigatorCus); //侧边栏 navigator
// export default createAppContainer(CreateBottomTabNavigatorCus); //自定义 tab 的bottom navigator
// export default createAppContainer(StatuBarNavigator); //status bar navigator
