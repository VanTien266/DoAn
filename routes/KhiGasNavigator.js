import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Setting from "../screens/KhiGas/Setting";
import Notify from "../screens/KhiGas/Notification";
import Status from "../screens/KhiGas/Status";

import { StyleSheet, View, Image } from "react-native";

export default function KhiGasTab() {
    const setTabBarIcon = (focused, imageLink) => {
        return (
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    //top: 5,
                }}
            >
                <Image
                    source={imageLink}
                    resizeMode="contain"
                    style={{
                        width: focused ? 50 : 40,
                        height: focused ? 50 : 40,
                    }}
                />
            </View>
        )
    }
    const Tab = createBottomTabNavigator();
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
            initialRouteName="Status"
        >
            <Tab.Screen
                name="Setting"
                component={Setting}
                options={{
                    tabBarIcon: ({ focused }) => setTabBarIcon(focused, require("../assets/icon/speaker.png"))
                }}
            />
            <Tab.Screen
                name="Status"
                component={Status}
                options={{
                    tabBarIcon: ({ focused }) => setTabBarIcon(focused, require("../assets/KhiGasIcon/status.png"))
                }}
            />
            <Tab.Screen
                name="Notification"
                component={Notify}
                options={{
                    tabBarIcon: ({ focused }) => setTabBarIcon(focused, require("../assets/KhiGasIcon/notification.png"))
                }}
            />
        </Tab.Navigator>
    )
}

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
})