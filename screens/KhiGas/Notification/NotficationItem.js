import React, { useState } from "react";

import { StyleSheet, View, Text } from "react-native";

export default function NotificationItem({ noti, time, date }) {


    return (

        <View style={styles.container}>
            <Text style={styles.noti}> {noti}</Text>
            <View style={styles.dateInfo}>
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.date}>{time}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        height: 80,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        flexDirection: "row",
    },
    noti: {
        flex: 3,
        marginStart: 15,
        fontSize: 16,
    },
    dateInfo: {
        flex: 1,
        marginEnd: 25,
        alignItems:"center",
        justifyContent:"center",
    },
    date: {

        //flex:1,
    },
})
