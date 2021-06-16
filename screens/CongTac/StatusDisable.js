import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";

export default class StatusDisable extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            marginTop: 10,
            fontSize:24,
            color:"#BD1D1D"
          }}
        >
          Đang tắt
        </Text>
        <Image
          source={require("../../assets/icon/crash.png")}
          style={{ width: 200, height: null, flex: 1, resizeMode: "contain" }}
        />
        <View style={styles.poly}>
          <Image source={require("../../assets/icon/poly_green.png")} />
          <Text
            style={{
              marginBottom:10,
            }}
          >
            Bật bảo vệ
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  poly: {
    alignItems: "center",
    margin: 12,
  },
});
