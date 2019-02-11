import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  ActivityIndicator,
  TouchableNativeFeedback,
  RefreshControl,
  Text,
  Button,
  StyleSheet
} from "react-native";
import { fetchRequest } from "../utils/FetchUtil";
import { PullList } from "react-native-pull"; //PullList相当于ListView
import ToastUtil from "../utils/ToastUtil";
import {
  createAppContainer,
  createBottomTabNavigator,
  createTabNavigator,
  createStackNavigator,
  StackActions,
  NavigationActions
} from "react-navigation"; // Version can be specified in package.json
import { FlatList } from "react-native-gesture-handler";
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
let _navigation;
export class HomeScreen extends Component {
  static navigationOptions = ({
    navigation,
    screenProps,
    navigationOptions
  }) => {
    return {
      title: "首页",
      headerTitleStyle: { flex: 1, textAlign: "center" },
      headerRight: <HeaderRight />,
      headerLeft: <HeaderLeft />,
      headerStyle: {
        backgroundColor: "green"
      },
      headerTintColor: "#aaa",
      headerTitleStyle: {
        fontWeight: "bold"
      },
      tabBarIcon: ({ focused }) => {
        // console.warn("home screen focused:" + focused);
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
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      pageCount: 0,
      isLoading: true,
      //网络请求状态
      error: false,
      errorInfo: "",
      dataArray: [],
      showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
      isRefreshing: false //下拉控制
    };
    _navigation = this.props.navigation;
  }

  componentDidMount() {
    console.log("HomeScreen componentDidMount");
    this.fetchData();
  }
  componentWillUnmount() {
    console.log("HomeScreen componentWillUnmount");
  }

  //网络请求——获取数据
  fetchData() {
    url = "article/list/" + this.state.page + "/json";
    fetchRequest(url, "GET")
      .then(responseData => {
        let data = responseData.data; //获取json 数据并存在data数组中
        let dataBlob = []; //这是创建该数组，目的放存在key值的数据，就不会报黄灯了
        dataBlob = data.datas;
        let foot = 0;
        if (this.state.page >= data.pageCount) {
          foot = 1; //listView底部显示没有更多数据了
        }
        this.setState({
          //复制数据源
          //  dataArray:this.state.dataArray.concat( responseData.results),
          dataArray: this.state.dataArray.concat(dataBlob),
          isLoading: false,
          showFoot: foot,
          isRefreshing: false,
          pageCount: data.pageCount
        });
        data = null; //重置为空
        dataBlob = null;
      })
      .catch(error => {
        this.setState({
          error: true,
          errorInfo: error
        });
      })
      .done();
  }

  render() {
    //第一次加载等待的view
    if (this.state.isLoading && !this.state.error) {
      return this.renderLoadingView();
    } else if (this.state.error) {
      //请求失败view
      return this.renderErrorView();
    }
    //加载数据
    return this.renderData();
  }

  //======================= self method =======================
  //显示FlatList
  renderData() {
    return (
      <View style={{ backgroundColor: "white" }}>
        <FlatList
          data={this.state.dataArray}
          renderItem={this._renderItemView}
          ListFooterComponent={this._renderFooter}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={1}
          ItemSeparatorComponent={this._separator}
          keyExtractor={this._keyExtractor}
          //为刷新设置颜色
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.handleRefresh} //因为涉及到this.state
              colors={["#ff0000", "#00ff00", "#0000ff", "#3ad564"]}
              progressBackgroundColor="#ffffff"
            />
          }
        />
      </View>
    );
  }
  //key
  _keyExtractor = (item, index) => index;

  //返回itemView
  _renderItemView = ({ item }) => {
    console.log("linfj renderitemView:", this.props);
    const gotoDetails = () => {
      console.log("onpress");
      const ret = this.props.navigation.navigate("Details");
      console.log("ret", ret);
    }; //跳转并传值
    return (
      // <TouchableNativeFeedback onPress={() => {Actions.news({'url':item.url})}} >////切记不能带（）不能写成gotoDetails()
      <TouchableNativeFeedback
        style={styles.flatListItem}
        onPress={() => this.props.navigation.navigate("Details")}
      >
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.content}>
            作者: {item.author} 时间: {item.niceDate}
          </Text>
          <Text style={styles.content}>
            分类: {item.superChapterName}/{item.chapterName}
          </Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  //滑动到底部
  _onEndReached = () => {
    //如果是正在加载中或没有更多数据了，则返回
    if (this.state.showFoot != 0) {
      return;
    }
    //如果当前页大于或等于总页数，那就是到最后一页了，返回
    if (this.state.page != 0 && this.state.page >= this.state.pageCount) {
      return;
    } else {
      this.state.page++;
    }
    //底部显示正在加载更多数据
    this.setState({ showFoot: 2 });
    //获取数据，在componentDidMount()已经请求过数据了
    if (this.state.page > 0) {
      this.fetchData();
    }
  };

  //返回footer
  _renderFooter = () => {
    if (this.state.showFoot === 1) {
      return (
        <View
          style={{
            height: 30,
            alignItems: "center",
            justifyContent: "flex-start"
          }}
        >
          <Text
            style={{
              color: "#999999",
              fontSize: 14,
              marginTop: 5,
              marginBottom: 5
            }}
          >
            没有更多数据了
          </Text>
        </View>
      );
    } else if (this.state.showFoot === 2) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator />
          <Text>正在加载更多数据...</Text>
        </View>
      );
    } else if (this.state.showFoot === 0) {
      return (
        <View style={styles.footer}>
          <Text />
        </View>
      );
    }
  };
  //分割线
  _separator() {
    return <View style={{ height: 1, backgroundColor: "#999999" }} />;
  }
  //刷新时
  handleRefresh = () => {
    this.setState({
      page: 1,
      isRefreshing: true, //tag,下拉刷新中，加载完全，就设置成flase
      dataArray: []
    });
    this.fetchData();
  };
  //加载等待页
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color="blue" size="large" />
      </View>
    );
  }
  //加载失败view
  renderErrorView() {
    return (
      <View style={styles.container}>
        <Text>{this.state.errorInfo}</Text>
      </View>
    );
  }

  //======================= self method =======================
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  title: {
    marginTop: 18,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 22,
    fontSize: 18,
    color: "black"
    // color: "#ffa700"
  },
  footer: {
    flexDirection: "row",
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  content: {
    marginBottom: 8,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 12,
    color: "black"
  },
  flatListItem: {
    margin: 8,
    padding: 8,
    backgroundColor: "white"
  }
});
