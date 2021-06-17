import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";

export default class StatusEnable extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            marginTop: 10,
            fontSize:24,
            color:"#017A23"
          }}
        >
          Đang bảo vệ
        </Text>
        <Image
          source={require("../../assets/icon/shield.png")}
          style={{ width: 200, height: null, flex: 1, resizeMode: "contain" }}
        />
        <View style={styles.poly}>
          <Image source={require("../../assets/icon/poly_red.png")} />
          <Text
            style={{
              marginBottom:10,
            }}
          >
            Khóa trái cửa
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
