import React, { useState } from "react";

import { StyleSheet, Switch, View, Text } from "react-native";
import Slider from '@react-native-community/slider';

export default function FanSettingItem({ fanName }) {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (

        <View style={styles.container}>
            <View style={styles.firstLine}>
                <Text style={styles.name}>{fanName}</Text>
                <Switch
                    style={styles.switch}
                    trackColor={{ false: "#BD1D1D", true: "#017A23" }}
                    thumbColor={"#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <Slider style={styles.slider}
                maximumValue={1}
                minimumValue={0}
                disabled={isEnabled ? false : true}
                value={isEnabled ? 0.4 : 0} />
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
    },
    firstLine: {
        flexDirection: "row",
    },
    name: {
        flex: 1,
        marginStart: 15,
        fontSize: 20,
    },
    switch: {
        flex: 1,
        marginEnd: 25,
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
    },
    slider: {
        width: 326,
        height: 40,
    },
})
