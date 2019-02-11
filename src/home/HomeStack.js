import { HomeScreen } from "./HomeScreen";
import { DetailsScreen } from "./DetailPage";
import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  createTabNavigator,
  createStackNavigator,
  StackActions,
  NavigationActions
} from "react-navigation"; // Version can be specified in package.json
export const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    initialRouteName: "Home",
    title: "this navigation title",
    tabBarIcon: ({ focused }) => {
      console.warn('home stack focused:'+focused);
      if (focused) {
        return (
          <Image
            style={{ width: 19, height: 19 }}
            source={require("../img/home_sel.png")}
          />
        );
      } else {
        return (
          <Image
            style={{ width: 19, height: 19 }}
            source={require("../img/home_nor.png")}
          />
        );
      }
    }
    // defaultNavigationOptions: ({ navigation }) => ({
    //   tabBarIcon: ({ focused, horizontal, tintColor }) => {
    //     const { routeName } = navigation.state;
    //     let iconName;
    //     if (routeName === "Home") {
    //       if (focused) {
    //         return (
    //           <Image
    //             style={{ width: 19, height: 19 }}
    //             source={require("../img/home_sel.png")}
    //           />
    //         );
    //       } else {
    //         return (
    //           <Image
    //             style={{ width: 19, height: 19 }}
    //             source={require("../img/home_nor.png")}
    //           />
    //         );
    //       }
    //     } else if (routeName === "Details") {
    //       if (focused) {
    //         return (
    //           <Image
    //             style={{ width: 19, height: 19 }}
    //             source={require("../img/deal_sel.png")}
    //           />
    //         );
    //       } else {
    //         return (
    //           <Image
    //             style={{ width: 19, height: 19 }}
    //             source={require("../img/deal_nor.png")}
    //           />
    //         );
    //       }
    //     }
    //   }
    // })
  }
);
