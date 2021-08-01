import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Setting from "../screens/CongTac/Setting";
import Camera from "../screens/CongTac/Camera";
import Notify from "../screens/CongTac/Notification";
import Status from '../screens/CongTac/Status'
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();

const TabsCongTac = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          position: "absolute",
          evaluation: 0,
          backgroundColor: "#017A23",
          height: 60,
          ...styles.shadow,
        },
      }}
    >
        <Tab.Screen name="Status" component={Status}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{ alignItems: "center", justifyContent: "center", top: 5 }}
            >
              <Image
                source={require("../assets/icon/home.png")}
                resizeMode="contain"
                style={{ width: focused ? 50 : 40, height: focused ? 50 : 40 }}
              />
            </View>
          ),
        }}/>
      <Tab.Screen
        name="Setting"
        component={Setting}
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
      <Tab.Screen name="Camera" component={Camera} options={{
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
      <Tab.Screen name="Notification" component={Notify} options={{
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

export default TabsCongTac;
