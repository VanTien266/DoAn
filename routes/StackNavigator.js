import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import MainScreen from "../screens/MainScreen";

const screens = {
  Login: {
    screen: LoginScreen,
    options: { headerShown: false },
  },
  Main: {
    screen: MainScreen,
    navigationOptions: {
      title: "Trang chủ",
    },
  },
};

const StackScreens = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#F5F5F5",
    headerStyle: {
      backgroundColor: "#017A23",
    },
    headerTitleAlign: "center",
  },
});

export default createAppContainer(StackScreens);
