import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Main from '../screens/MainScreen'
import CamBienCongTac from "../screens/Setting";
import CamBienHongNgoai from "../screens/Setting";
import CamBienKhiGas from "../screens/Notification";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          evaluation: 0,
          backgroundColor: "#017A23",
          height: 60,
          ...styles.shadow,
        },
      }}
    >
        <Tab.Screen name="Home" component={Main}/>
      <Tab.Screen
        name="CongTac"
        component={CamBienCongTac}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{ alignItems: "center", justifyContent: "center", top: 5 }}
            >
              <Image
                source={require("../assets/icon/customer-support.png")}
                resizeMode="contain"
                style={{ width: focused ? 50 : 40, height: focused ? 50 : 40 }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen name="HongNgoai" component={CamBienHongNgoai} options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{ alignItems: "center", justifyContent: "center", top: 5 }}
            >
              <Image
                source={require("../assets/icon/cctv-camera.png")}
                resizeMode="contain"
                style={{ width: focused ? 50 : 40, height: focused ? 50 : 40 }}
              />
            </View>
          ),
        }}/>
      <Tab.Screen name="KhiGas" component={CamBienKhiGas} options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{ alignItems: "center", justifyContent: "center", top: 5 }}
            >
              <Image
                source={require("../assets/icon/bell.png")}
                resizeMode="contain"
                style={{ width: focused ? 50 : 40, height: focused ? 50 : 40 }}
              />
            </View>
          ),
        }}/>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 0,
  },
});

export default Tabs;
