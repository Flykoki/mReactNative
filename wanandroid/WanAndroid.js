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
import { DetailsScreen } from "../src/home/DetailPage";
import { HomeScreen } from "../src/home/HomeScreen";

const BottomTabNavigator = createBottomTabNavigator(
  {
    // 首页: LoadMoreDemo,
    首页: HomeScreen,
    详情: DetailsScreen
  },
  {
    initialRouteName: "详情"
  }
);

export default createAppContainer(BottomTabNavigator);
