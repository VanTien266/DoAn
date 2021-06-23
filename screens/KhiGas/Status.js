import React, { Component, useState } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import BlinkView from 'react-native-blink-view'

export default function Status() {
  const unactive = require("../../assets/icon/lock_red.png")
  const active = require("../../assets/icon/shield.png")
  const both = { unactive, active }
  const [image, setImage] = useState(unactive)
  const [isActive, setIsActive] = useState(false)
  return (
    <GestureRecognizer
      style={{ flex: 1 }}
      onSwipeUp={() => {
        setImage(active)
        setIsActive(true)
      }}
      onSwipeDown={() => {
        setImage(unactive)
        setIsActive(false)
      }}
    >
      <View style={[styles.container]}>
        {isActive ? null : <Text>Kích hoạt</Text>}
        {isActive ? <Image style={styles.poly} /> : <Image style={styles.poly} source={require("../../assets/icon/poly_green.png")} />}

        <Image source={image} style={{ width: 200, height: 200, resizeMode: "contain" }} />


        {isActive ? <Image style={styles.poly} source={require("../../assets/icon/poly_red.png")} /> : null}
        {isActive ? <Text>Tắt</Text> : null}

      </View>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    // position:'absolute'
    // alignSelf:'center'
  },
  poly: {
    alignItems: "center",
    margin: 10,
  },
});
