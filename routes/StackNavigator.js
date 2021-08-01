import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen"
import MainScreen from "../screens/MainScreen";
import CongTac from "../screens/CamBienCongTac";
import KhiGas from "../screens/CamBienKhiGas";
import HongNgoai from "../screens/CamBienHongNgoai";

const screens = {
  Login: {
    screen: LoginScreen,
    options: { headerShown: false },
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      title: "Đăng ký"
    },
  },
  Main: {
    screen: MainScreen,
    navigationOptions: {
      title: "Trang chủ",
    },
  },
  CongTac: {
    screen: CongTac,
    navigationOptions: {
      title: "Cảm biến công tắc",
    },
  },
  HongNgoai: {
    screen: HongNgoai,
    navigationOptions: {
      title: "Cảm biến hồng ngoại",
    },
  },
  KhiGas: {
    screen: KhiGas,
    navigationOptions: {
      title: "Cảm biến khí gas",
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
